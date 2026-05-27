import { axiosClient } from '@/shared/lib/axios';
import type { EnrollmentFilterParams } from '../types/enrollment-filter-params-type';

export const enrollmentRoleAdminApi = {
  getAll: async (params: EnrollmentFilterParams) => {
    const res = await axiosClient.get('/enrollments', { params });

    return res.data;
  },

  getDetail: async (id: string) => {
    const res = await axiosClient.get(`/enrollments/${id}`);

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/enrollments', payload);

    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await axiosClient.patch(`/enrollments/${id}`, payload);

    return res.data;
  },

  remove: async (id: string) => {
    const res = await axiosClient.delete(`/enrollments/${id}`);

    return res.data;
  },
};
