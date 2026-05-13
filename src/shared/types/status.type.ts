export const STATUS = {
  ACTIVE: 'ACTIVE',

  INACTIVE: 'INACTIVE',

  DELETED: 'DELETED',
} as const;

export type StatusType = (typeof STATUS)[keyof typeof STATUS];
