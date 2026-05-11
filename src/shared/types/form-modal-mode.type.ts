export const FormModalMode = {
  CREATE: 'create',
  VIEW: 'view',
  EDIT: 'edit',
} as const;

export type FormModalMode = (typeof FormModalMode)[keyof typeof FormModalMode];
