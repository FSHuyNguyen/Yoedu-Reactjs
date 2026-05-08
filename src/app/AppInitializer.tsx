import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { getMeThunk } from '@/features/auth/slices/auth.thunk';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(getMeThunk());
    }
  }, [accessToken, dispatch]);

  return children;
}
