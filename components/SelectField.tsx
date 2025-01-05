import { Form, Select } from "antd";
import React from "react";
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  name: string;
  label: string;
  control: unknown;
  rules?: Omit<
    RegisterOptions<FieldValues, never>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  options: SelectOption[];
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  control,
  rules,
  options,
}: SelectFieldProps) => {
  return (
    <Form.Item
      label={label}
      required
    >
      <Controller
        name={name as unknown as never}
        control={control as Control<FieldValues> | undefined}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={`Chọn ${label.toLowerCase()}`}
          >
            {options.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        )}
        rules={rules}
      />
    </Form.Item>
  );
};

export default SelectField;
