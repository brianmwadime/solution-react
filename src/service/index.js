import Axios from "axios";
import customBrowserHistory from "Util/customBrowserHistory";
const defaultAxios = Axios.create();

defaultAxios.interceptors.request.use(
  async config => {
    if (!config.url.includes('registration') || !config.url.includes('login') || !config.url.includes('onboarding') || !config.url.includes('register')) {
      const access_token = JSON.parse(localStorage.getItem("token"));
      config.headers = {
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
        "Content-Type": "application/json",
      }

    }

    if (config.url.includes('upload')) {
      const access_token = JSON.parse(localStorage.getItem("token"));
      config.headers = {
        'Authorization': `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      }
    }

    return config;
  },
  error => {
    Promise.reject(error)
  }
);

defaultAxios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Response interceptor for API calls
defaultAxios.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if (error.response?.status === 401) {
    customBrowserHistory.push('/login');
    return Promise.resolve();
  }

  if (error.response?.status === 422) {
    return Promise.reject(error.response?.data);
  }

  return Promise.reject(error);
});

export function apiClient(method, url, options = {}) {
  const { data = {}, headers = {}, params = {}, ...rest } = options;
  return defaultAxios({
    url,
    data,
    method,
    params,
    headers,
    ...rest,
  });
}

export const apis = {
  get: (url, args) => apiClient("get", url, args),
  post: (url, args) => apiClient("post", url, args),
  put: (url, args) => apiClient("put", url, args),
  patch: (url, args) => apiClient("patch", url, args),
  delete: (url, args) => apiClient("delete", url, args),
};
