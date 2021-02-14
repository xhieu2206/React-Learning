import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use(request => { // nếu không có lỗi thì set lại giá trị của error = null
    setError(null);
    return request;
  });

  const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
    setError(err);
  });

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    }
  }, [reqInterceptor, resInterceptor]);

  const errorConfirmedHandler = () => {
    setError(null);
  }

  return [error, errorConfirmedHandler];
}
