import { axiosClient } from '@/shared/lib/axios';

export interface GetStudentsParams {
  page?: number;

  limit?: number;

  keySearch?: string;
}

/* ROLE ADMIN */
export const studentRoleAdminApi = {
  getAll: async (params: GetStudentsParams) => {
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
};

/* ROLE STUDENT */
export const studentRoleStudentApi = {
  update: async (payload: any) => {
    const res = await axiosClient.patch('/students/me', payload);

    return res.data;
  },
};
