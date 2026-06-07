import { axiosClient } from '@/shared/lib/axios';

/* ROLE ADMIN */
export const userRoleAdminApi = {
  getAll: async (params: any) => {
    const res = await axiosClient.get('/users', { params });

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/users', payload);

    return res.data;
  },

  update: async (userId: string, payload: any) => {
    const res = await axiosClient.patch(`/users/${userId}`, payload);

    return res.data;
  },

  active: async (userId: string) => {
    const res = await axiosClient.patch(`/users/${userId}/active`);

    return res.data;
  },

  inActive: async (userId: string) => {
    const res = await axiosClient.patch(`/users/${userId}/inactive`);

    return res.data;
  },

  remove: async (userId: string) => {
    const res = await axiosClient.delete(`/users/${userId}`);

    return res.data;
  },
};

/* ROLE USER */
export const userRoleUserApi = {
  update: async (payload: any) => {
    const res = await axiosClient.patch('/users/me', payload);

    return res.data;
  },
};
