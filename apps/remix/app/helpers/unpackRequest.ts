export const unpackRequest = async (request: any) => {
  const body = await request.formData();
  const cookie = request.headers.get('Cookie');

  return {
    ...(cookie && { cookie: request.headers.get('Cookie') }),
    ...Object.fromEntries(body),
  };
};

export const getCookie = (request: any) => {
  return request.headers.get('Cookie');
};
