import { DatePicker, Form } from "antd";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type DatePickerFieldProps = {
  name: string;
  label: string;
  control: unknown;
  rules?: Omit<
    RegisterOptions<FieldValues, never>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  required?: boolean;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  label,
  control,
  rules,
  required = false,
}: DatePickerFieldProps) => {
  return (
    <Form.Item
      label={label}
      required={required}
    >
      <Controller
        name={name as unknown as never}
        control={control as Control<FieldValues> | undefined}
        render={({ field }) => (
          <DatePicker
            {...field}
            style={{ width: "100%" }}
          />
        )}
        rules={rules}
      />
    </Form.Item>
  );
};

export default DatePickerField;
