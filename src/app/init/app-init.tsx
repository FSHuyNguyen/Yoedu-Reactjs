import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMeThunk } from '@/features/auth/store/auth.thunk';

export default function AppInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken) {
      dispatch(getMeThunk());
    }
  }, [accessToken, dispatch]);

  if (!user) return null;

  return children;
}
