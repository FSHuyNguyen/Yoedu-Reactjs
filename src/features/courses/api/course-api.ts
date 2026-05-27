import { axiosClient } from '@/shared/lib/axios';
import type { CourseFilterParams } from '../types/course-filter-params-type';

export const getCourseOptions = async () => {
  const res = await axiosClient.get('/courses/options', {});

  return res.data;
};

export const courseRoleAdminApi = {
  getAll: async (params: CourseFilterParams) => {
    const res = await axiosClient.get('/courses', { params });

    return res.data;
  },

  getDetail: async (id: string) => {
    const res = await axiosClient.get(`/courses/${id}`);

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/courses', payload);

    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await axiosClient.patch(`/courses/${id}`, payload);

    return res.data;
  },

  changeStatus: async (id: string) => {
    const res = await axiosClient.patch(`/courses/${id}/change-status`);

    return res.data;
  },

  remove: async (id: string) => {
    const res = await axiosClient.delete(`/courses/${id}`);

    return res.data;
  },
};
