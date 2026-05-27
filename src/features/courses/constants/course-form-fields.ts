import { FormFieldType } from '@/shared/types/form-field.type';
import type { FormField } from '@/shared/components/modal/ModalFormCustom';
import type { Course } from '../types/course-type';
import { optionsCourseLevel } from './options-course-level';
import { getTeachersOptions } from '@/features/teachers/api/teacher-api';

export const courseFormFields: FormField<Course>[] = [
  {
    name: 'thumbnailUrl',
    label: 'Banner khóa học',
    type: FormFieldType.ImageUpload,
    placeholder: '',
    col: 24,
    props: {
      type: 'banner',
    },
  },
  {
    name: 'courseCode',
    label: 'Mã khóa học',
    type: FormFieldType.Input,
    placeholder: 'Mã khóa học',
    disabled: true,
  },

  {
    name: 'name',
    label: 'Tên khóa học',
    type: FormFieldType.Input,
    placeholder: 'Nhập tên khóa học',
  },

  {
    name: 'price',
    label: 'Giá khóa học',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập giá khóa học',
    props: {
      isCurrency: true,
    },
  },

  {
    name: 'teacherId',
    label: 'Giáo viên',
    type: FormFieldType.SelectFetch,
    fetchOptions: getTeachersOptions,
    placeholder: 'Chọn giáo viên',
  },

  {
    name: 'totalSessions',
    label: 'Tổng số buổi học',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập tổng số buổi học',
  },

  {
    name: 'maxStudents',
    label: 'Số học viên tối đa',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập số học viên tối đa',
  },

  {
    name: 'startDate',
    label: 'Ngày bắt đầu',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày bắt đầu',
  },

  {
    name: 'endDate',
    label: 'Ngày kết thúc',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày kết thúc',
  },

  {
    name: 'level',
    label: 'Cấp độ',
    type: FormFieldType.Select,
    options: optionsCourseLevel,
    placeholder: 'Chọn cấp độ',
  },

  {
    name: 'description',
    label: 'Mô tả khóa học',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập mô tả khóa học',
  },
];
