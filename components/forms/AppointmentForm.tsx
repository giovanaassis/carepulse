"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Field, FieldGroup, FieldSet } from "@/components/ui/field";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import Image from "next/image";
import { SelectItem } from "../ui/select";

interface AppointmentFormProps {
  type: "create" | "cancel" | "schedule";
  userId: string;
  patientId: string;
}

function AppointmentForm({ type, userId, patientId }: AppointmentFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds.
          </p>
        </section>
        <FieldSet>
          <FieldGroup>
            {type !== "cancel" && (
              <>
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.SELECT}
                  name="primaryPhysician"
                  label="Doctor"
                  placeholder="Select a doctor"
                >
                  {Doctors.map((doctor) => (
                    <SelectItem key={doctor.name} value={doctor.name}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={doctor.image}
                          alt={doctor.name}
                          width={32}
                          height={32}
                          className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="schedule"
                  label="Expected appointment date"
                  showTimeSelect
                  dateFormat="MM/dd/yyyy - h:mm aa"
                />

                <div className="flex gap-6">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="reason"
                    label="Reason for appointment"
                    placeholder="Enter reason for appointment"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="notes"
                    label="Notes"
                    placeholder="Enter notes"
                  />
                </div>
              </>
            )}

            {type === "cancel" && (
              <>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="cancellationReason"
                  label="Reason for cancellation"
                  placeholder="Enter reason for cancellation"
                />
              </>
            )}
          </FieldGroup>
          <Field orientation="horizontal">
            <SubmitButton
              isLoading={isLoading}
              classname={`${
                type === "cancel" ? "shad-danger-btn!" : "shad-primary-btn!"
              } w-full`}
            >
              {buttonLabel}
            </SubmitButton>
          </Field>
        </FieldSet>
      </form>
    </div>
  );
}

export default AppointmentForm;
