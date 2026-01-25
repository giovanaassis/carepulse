"use server";

import { ID } from "node-appwrite";
import { APPOINTMENT_TABLE_ID, DATABASE_ID, tables } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await tables.createRow({
      databaseId: DATABASE_ID!,
      tableId: APPOINTMENT_TABLE_ID!,
      rowId: ID.unique(),
      data: appointment,
    });

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
