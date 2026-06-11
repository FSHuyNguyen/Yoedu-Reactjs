import dayjs, { Dayjs } from 'dayjs';
import { FormFieldType } from '@/shared/types/form-field-type';
import { FORMAT_TIME } from '../constants/format-date';
import { formatDateToISO, formatDateToPicker, formatTimeToPicker } from './date';
import type { SectionForm } from '../components/modal/ModalFormCustom';

export const formatFormValues = <T>(values: T, sections: SectionForm<T>[]): T => {
  const formattedValues: Record<string, unknown> = {
    ...(values as Record<string, unknown>),
  };

  sections.forEach((section) => {
    section.fields.forEach((field) => {
      const value = formattedValues[field.name as string];

      if (!value) return;

      switch (field.type) {
        case FormFieldType.DatePicker:
        case FormFieldType.DateTimePicker:
          formattedValues[field.name as string] = dayjs.isDayjs(value)
            ? formatDateToISO(value as Dayjs)
            : formatDateToPicker(value as string);
          break;
        case FormFieldType.TimePicker:
          formattedValues[field.name as string] = dayjs.isDayjs(value)
            ? value.format(FORMAT_TIME)
            : formatTimeToPicker(value as string);
          break;
        default:
          break;
      }
    });
  });

  return formattedValues as T;
};
