import { axiosClient } from '@/shared/lib/axios';

export interface GetTeacherParams {
  page?: number;

  limit?: number;

  keySearch?: string;
}

/* ROLE ADMIN */
export const teacherRoleAdminApi = {
  getAll: async (params: GetTeacherParams) => {
    const res = await axiosClient.get('/teachers', { params });

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/teachers', payload);

    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await axiosClient.patch(`/teachers/${id}`, payload);

    return res.data;
  },
};

/* ROLE TEACHER */
export const teacherRoleTeacherApi = {
  update: async (payload: any) => {
    const res = await axiosClient.patch('/teachers/me', payload);

    return res.data;
  },
};
