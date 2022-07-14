export const composeRequestInit = <T>({
  cookie,
  body,
  method = 'GET',
  signal,
}: {
  method?: RequestInit['method'];
  cookie?: string;
  body?: T;
  signal?: AbortSignal;
}): RequestInit => {
  return {
    method,
    signal,
    headers: {
      ...(cookie && { Cookie: cookie }),
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    ...(body && { body: JSON.stringify(body) }),
  };
};

type RequestInitOptions = Parameters<typeof composeRequestInit>[0];

export const fetchRequest = async <T>(url: string, requestInitOptions: RequestInitOptions) => {
  const requestInit = composeRequestInit(requestInitOptions);
  const response = await fetch(url, requestInit);
  return (await response.json()) as T;
};
