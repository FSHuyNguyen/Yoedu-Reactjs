import type { Student } from '@/features/students/types/student.type';
import type { Status } from '@/shared/types/status.type';
import type { UserRole } from '@/features/users/types/user-role.type';

export type Teacher = {
  bio: string;
};

export type User = {
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: string;
  status: Status;
  student?: Student;
  teacher?: Teacher;
};
