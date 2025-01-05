import { Form, Input } from "antd";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type InputProps = {
  name: string;
  label: string;
  control: unknown;
  rules?: Omit<
    RegisterOptions<FieldValues, never>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
};

const InputField: React.FC<InputProps> = ({
  name,
  label,
  control,
  rules,
  placeholder,
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <Form.Item
      label={label}
      required={required}
    >
      <Controller
        name={name as unknown as never}
        control={control as Control<FieldValues> | undefined}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        rules={rules}
      />
    </Form.Item>
  );
};

export default InputField;
