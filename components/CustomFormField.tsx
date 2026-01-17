/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Control, Controller } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "./ui/input";
import { FormFieldType } from "./forms/PatientForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput, { type Value } from "react-phone-number-input";

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "Icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <Input
            {...field}
            placeholder={placeholder}
            className="shad-input border-0"
          />
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <PhoneInput
          placeholder={placeholder}
          defaultCountry="BR"
          international
          withCountryCallingCode
          value={field.value as Value | undefined}
          onChange={field.onChange}
          className="input-phone!"
        />
      );
    default:
      break;
  }
};

function CustomFormField(props: CustomFormFieldProps) {
  const { control, fieldType, name, label } =
    props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FieldLabel htmlFor={name}>{label}</FieldLabel>
          )}

          <RenderField field={field} props={props} />

          {fieldState.invalid && (
            <FieldError errors={[fieldState.error]} className="shad-error" />
          )}
        </Field>
      )}
    />
  );
}

export default CustomFormField;
