import { axiosClient } from '@/shared/lib/axios';
import type { StudentFilterParams } from '../types/student-filter-params-type';

export const getStudentOptions = async () => {
  const res = await axiosClient.get('/students/options', {});

  return res.data;
};

/* ROLE ADMIN */
export const studentRoleAdminApi = {
  getAll: async (params: StudentFilterParams) => {
    const res = await axiosClient.get('/students', { params });

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/students', payload);

    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await axiosClient.patch(`/students/${id}`, payload);

    return res.data;
  },

  active: async (id: string) => {
    const res = await axiosClient.patch(`/students/${id}/active`);

    return res.data;
  },

  paused: async (id: string) => {
    const res = await axiosClient.patch(`/students/${id}/paused`);

    return res.data;
  },

  remove: async (id: string) => {
    const res = await axiosClient.delete(`/students/${id}`);

    return res.data;
  },
};

/* ROLE STUDENT */
export const studentRoleStudentApi = {
  update: async (payload: any) => {
    const res = await axiosClient.patch('/students/me', payload);

    return res.data;
  },
};
