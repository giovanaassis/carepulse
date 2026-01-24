/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query, ID } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_TABLE_ID,
  PROJECT_ID,
  storage,
  tables,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create({
      userId: ID.unique(),
      email: user.email,
      phone: user.phone,
      password: undefined,
      name: user.name,
    });
    console.log(newUser);

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list({
        queries: [Query.equal("email", user.email)],
      });

      return documents.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get({ userId });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get("blobFile") as Blob,
        identificationDocument.get("fileName") as string
      );

      file = await storage.createFile({
        bucketId: BUCKET_ID!,
        fileId: ID.unique(),
        file: inputFile,
      });
    }

    const newPatient = await tables.createRow({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_TABLE_ID!,
      rowId: ID.unique(),
      data: {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      },
    });

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await tables.listRows({
      databaseId: DATABASE_ID!,
      tableId: PATIENT_TABLE_ID!,
      queries: [Query.equal("userId", userId)],
    });

    return parseStringify(patients.rows[0]);
  } catch (error) {
    console.log(error);
  }
};
