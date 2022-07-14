import { useMatchesData } from './useMatchesData';
import { UserInfoMin } from '@twitter-clone/shared';

export function useOptionalUser(): UserInfoMin | undefined {
  return useMatchesData('root');
}
