/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query, ID } from "node-appwrite";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";

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
