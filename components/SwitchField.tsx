import { Form, Switch } from "antd";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type SwitchFieldProps = {
  name: string;
  label: string;
  control: unknown;
  rules?: Omit<
    RegisterOptions<FieldValues, never>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  required?: boolean;
};

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  control,
  rules,
  required = false,
}: SwitchFieldProps) => {
  return (
    <Form.Item
      label={label}
      required={required}
    >
      <Controller
        name={name as unknown as never}
        control={control as Control<FieldValues> | undefined}
        render={({ field: { value, onChange } }) => (
          <Switch
            checked={value} // Sử dụng giá trị boolean
            onChange={onChange}
          />
        )}
        rules={rules}
      />
    </Form.Item>
  );
};

export default SwitchField;
