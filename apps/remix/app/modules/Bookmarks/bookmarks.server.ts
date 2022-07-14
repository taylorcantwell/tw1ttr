import { composeRequestInit, apiEndpoints } from '~/helpers';

export async function bookmarkTweetsQuery(cookie: string) {
  return await fetch(apiEndpoints.saves.getBookmarks, composeRequestInit({ cookie }));
}
