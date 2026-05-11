export const FormFieldType = {
  Input: 'input',
  InputPassword: 'inputPassword',
  Select: 'select',
  Checkbox: 'checkbox',
  DatePicker: 'datePicker',
  TextArea: 'textArea',
} as const;

export type FormFieldTypeKey = (typeof FormFieldType)[keyof typeof FormFieldType];
