import { axiosClient } from '@/shared/lib/axios';

export const updateGeneralInfo = async (payload: any) => {
  const res = await axiosClient.patch('/users/profile', payload);

  return res.data;
};

export const updateStudentInfo = async (payload: any) => {
  const res = await axiosClient.patch('/students/profile', payload);

  return res.data;
};
