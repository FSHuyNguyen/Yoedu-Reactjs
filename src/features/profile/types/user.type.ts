export type UserRole = 'STUDENT' | 'TEACHER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

export type Student = {
  studentCode: string;
  parentName: string;
  parentPhone: string;
  entryAcademicLevel: string;
  latestTestScore: number;
};

export type Teacher = {
  bio: string;
};

export type User = {
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  student?: Student;
  teacher?: Teacher;
};
