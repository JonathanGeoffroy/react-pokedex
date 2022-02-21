import { useLocation } from 'react-router-dom';

export default function useRouterPartialCache<T>(
  data?: T
): Partial<T> | undefined {
  const location = useLocation();
  return data || (location?.state as T);
}
