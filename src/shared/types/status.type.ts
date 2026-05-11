export const STATUS = {
  ACTIVE: 'ACTIVE',

  INACTIVE: 'INACTIVE',

  DELETED: 'DELETED',
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];
