export const BASE_AUTH_URL = process.env["REACT_APP_BASE_AUTH_URL"];
export const BASE_IMAGES_URL = process.env["REACT_APP_BASE_IMAGES_URL"];

export const LOGIN_URL = BASE_AUTH_URL + "auth/login/";
export const FETCH_USER_URL = BASE_AUTH_URL + "auth/user/";

export const START_IMAGE_UPLOAD_URL = BASE_IMAGES_URL + "images/startUpload/";
export const SAVE_IMAGE_URL = BASE_IMAGES_URL + "images/";
export const FETCH_IMAGES_URL = BASE_IMAGES_URL + "images/";

export const CREATE_ALBUM_URL = BASE_IMAGES_URL + "albums/create/";
export const FETCH_ALBUMS_URL = BASE_IMAGES_URL + "albums/";
export const FETCH_SHARED_ALBUMS_URL = BASE_IMAGES_URL + "albums/shared/";
export const FETCH_ALBUM_URL = (id) => BASE_IMAGES_URL + `albums/${id}`;
export const FETCH_ALBUM_DELETE_URL = (id) => BASE_IMAGES_URL + `albums/${id}`;
export const SHARE_ALBUM_URL = (id) => BASE_IMAGES_URL + `albums/${id}/share/`;

export const MAKE_SEARCH_URL = (value) => BASE_IMAGES_URL + `search/${value}`;
