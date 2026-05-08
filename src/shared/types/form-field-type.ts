export const FormFieldType = {
  Input: 'input',
  InputPassword: 'inputPassword',
  Select: 'select',
  Checkbox: 'checkbox',
  DatePicker: 'datePicker',
  Text: 'text',
  File: 'file',
} as const;

export type FormFieldTypeKey = (typeof FormFieldType)[keyof typeof FormFieldType];
