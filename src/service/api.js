import { apis } from "Service";

const URL = "https://ssolution.azurewebsites.net";

const ASSETS_URL = "https://ssolution.azurewebsites.net/asets/";

const API_URLS = {
  CATEGORY_LIST: `${URL}/client/api/v1/category/list`,
  POST_REGISTER: `${URL}/client/auth/register`,
  POST_LOGIN: `${URL}/client/auth/login`,
  UPDATE_PASSWORD: `${URL}/client/api/v1/user/change-password`,
  GET_PROFILE: `${URL}/client/api/v1/user/me`,
  POST_PROFILE: `${URL}/client/api/v1/user/update-profile`,
  POST_LOGOUT: `${URL}/client/auth/logout`,
  SONG_LIST: `${URL}/client/api/v1/song/list`,
  SONG_CREATE: `${URL}/client/api/v1/song/create`,
  SONG_CREATE_BULK: `${URL}/client/api/v1/song/addBulk`,
  SONG_UPDATE: `${URL}/client/api/v1/song/update/`,
  SONG_DELETE: `${URL}/client/api/v1/song/delete/`,
  ALBUM_LIST: `${URL}/client/api/v1/album/list`,
  ALBUM_CREATE: `${URL}/client/api/v1/album/create`,
  NEW_RELEASE_CREATE: `${URL}/client/api/v1/release/create`,
  ALBUM_UPDATE: `${URL}/client/api/v1/album/update/`,
  ALBUM_DELETE: `${URL}/client/api/v1/album/delete/`,
  FILE_UPLOAD: `${URL}/client/api/v1/upload`,
};

export { URL };

export const fetchProfile = (payload) =>
  apis.get(API_URLS.GET_PROFILE, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const updateProfile = (payload) =>
  apis.put(API_URLS.POST_PROFILE, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });


export const updatePassword = (payload) =>
  apis.put(API_URLS.UPDATE_PASSWORD, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const postList = (payload) =>
  apis.post(API_URLS.CATEGORY_LIST, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const fetchCategory = (payload) =>
  apis.post(API_URLS.CATEGORY_LIST, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const postRegister = (payload) =>
  apis.post(API_URLS.POST_REGISTER, {
    ...payload,
    headers: {
      ...payload?.headers
    },
  });

export const postLogin = (payload) =>
  apis.post(API_URLS.POST_LOGIN, {
    ...payload,
    headers: {
      ...payload?.headers
    },
  });

export const postLogout = (payload) =>
  apis.post(API_URLS.POST_LOGOUT, {
    ...payload,
  });

export const fetchSongs = (payload) =>
  apis.post(API_URLS.SONG_LIST, {
    ...payload,
    headers: {
      ...payload?.headers
    },
  });

export const fetchAlbums = (payload) =>
  apis.post(API_URLS.ALBUM_LIST, {
    ...payload,
    headers: {
      ...payload?.headers
    },
  });

export const createSong = (payload) =>
  apis.post(API_URLS.SONG_CREATE, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const createSongs = (payload) =>
  apis.post(API_URLS.SONG_CREATE_BULK, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const updateSong = (id, payload) =>
  apis.put(`${API_URLS.SONG_UPDATE}${id}`, {
    ...payload,
  });

export const updateAlbum = (id, payload) =>
  apis.put(`${API_URLS.ALBUM_UPDATE}${id}`, {
    ...payload,
  });

export const createAlbum = (payload) =>
  apis.post(API_URLS.ALBUM_CREATE, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const addNewRelease = (payload) =>
  apis.post(API_URLS.NEW_RELEASE_CREATE, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
  });

export const deleteAlbum = (id, payload) =>
  apis.delete(`${API_URLS.ALBUM_DELETE}${id}`, {
    ...payload,
  });

export const deleteSong = (id, payload) =>
  apis.delete(`${API_URLS.SONG_DELETE}${id}`, {
    ...payload,
  });

export const uploadFile = (payload, onUploadProgress) =>
  apis.post(API_URLS.FILE_UPLOAD, {
    ...payload,
    headers: {
      ...payload?.headers,
    },
    onUploadProgress
  });
