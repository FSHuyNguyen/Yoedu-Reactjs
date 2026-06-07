import { axiosClient } from '@/shared/lib/axios';
import type { ParentFilterParams } from '../types/parent-filter-params-type';

export const getParentOptions = async () => {
  const res = await axiosClient.get('/parents/options', {});

  return res.data;
};

/* ROLE ADMIN */
export const parentRoleAdminApi = {
  getAll: async (params: ParentFilterParams) => {
    const res = await axiosClient.get('/parents', { params });

    return res.data;
  },

  create: async (payload: any) => {
    const res = await axiosClient.post('/parents', payload);

    return res.data;
  },

  update: async (id: string, payload: any) => {
    const res = await axiosClient.patch(`/parents/${id}`, payload);

    return res.data;
  },
};

/* ROLE PARENT */
export const parentRoleParentApi = {
  update: async (payload: any) => {
    const res = await axiosClient.patch('/parents/me', payload);

    return res.data;
  },
};
