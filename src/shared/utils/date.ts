import dayjs, { Dayjs } from 'dayjs';
import { FORMAT_DATE } from '../constants/format-date';

/**
 * Convert ISO string -> dayjs object
 * dùng cho DatePicker setFieldsValue
 */
export const formatDateToPicker = (value?: string | Date | null): Dayjs | null => {
  if (!value) return null;

  return dayjs(value);
};

/**
 * Convert dayjs -> ISO string
 * dùng khi submit form lên BE
 */
export const formatDateToISOString = (value?: Dayjs | null): string | null => {
  if (!value) return null;

  return value.toISOString();
};

/**
 * Format hiển thị UI
 * vd: 12/05/2026
 */
export const formatDate = (value?: string | Date | null, format = FORMAT_DATE): string => {
  if (!value) return '';

  return dayjs(value).format(format);
};
