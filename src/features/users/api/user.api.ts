import { axiosClient } from '@/shared/lib/axios';

/* ROLE ADMIN */
export const userRoleAdminApi = {
  changeStatus: async (userId: string) => {
    const res = await axiosClient.patch(`/users/${userId}/change-status`);

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
