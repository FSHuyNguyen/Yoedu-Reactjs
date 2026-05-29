import { FormFieldType } from '@/shared/types/form-field-type';
import type { FormField } from '@/shared/components/modal/ModalFormCustom';
import type { Course } from '../types/course-type';
import { courseLevelOptions } from './course-level-options';
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
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập tên khóa học',
      },
    ],
  },
  {
    name: 'price',
    label: 'Giá khóa học',
    type: FormFieldType.InputNumber,
    placeholder: 'Nhập giá khóa học',
    props: {
      isCurrency: true,
    },
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập giá khóa học',
      },
    ],
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
    rules: [
      {
        required: true,
        message: 'Vui lòng nhập tổng số buổi học',
      },
    ],
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
    rules: [
      {
        required: true,
        message: 'Vui lòng chọn ngày bắt đầu',
      },
    ],
  },
  {
    name: 'endDate',
    label: 'Ngày kết thúc',
    type: FormFieldType.DatePicker,
    placeholder: 'Chọn ngày kết thúc',
    rules: [
      {
        required: true,
        message: 'Vui lòng chọn ngày kết thúc',
      },
    ],
  },
  {
    name: 'startTime',
    label: 'Thời gian bắt đầu',
    type: FormFieldType.TimePicker,
    placeholder: 'Chọn thời gian bắt đầu',
    rules: [
      {
        required: true,
        message: 'Vui lòng chọn thời gian bắt đầu',
      },
    ],
  },
  {
    name: 'endTime',
    label: 'Thời gian kết thúc',
    type: FormFieldType.TimePicker,
    placeholder: 'Chọn thời gian kết thúc',
    rules: [
      {
        required: true,
        message: 'Vui lòng chọn thời gian kết thúc',
      },
    ],
  },
  {
    name: 'level',
    label: 'Cấp độ',
    type: FormFieldType.Select,
    options: courseLevelOptions,
    placeholder: 'Chọn cấp độ',
  },
  {
    name: 'description',
    label: 'Mô tả khóa học',
    type: FormFieldType.TextArea,
    placeholder: 'Nhập mô tả khóa học',
  },
];
