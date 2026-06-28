import axios from "axios";

import {
  API_BASE_URL,
  API_ERROR_MESSAGES,
} from "../utils/constants";

/*
|--------------------------------------------------------------------------
| Axios Instance
|--------------------------------------------------------------------------
|
| All API requests use this instance.
| Future enhancements such as authentication,
| interceptors and headers can be added here.
|
*/

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

const getErrorMessage = (
  error,
  fallbackMessage
) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.message) {
      return error.message;
    }
  }

  return fallbackMessage;
};

/*
|--------------------------------------------------------------------------
| GET Users
|--------------------------------------------------------------------------
*/

export const fetchUsers = async () => {
  try {
    const response = await apiClient.get("/");

    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        API_ERROR_MESSAGES.FETCH_USERS
      )
    );
  }
};

/*
|--------------------------------------------------------------------------
| POST User
|--------------------------------------------------------------------------
*/

export const createUser = async (user) => {
  try {
    const response = await apiClient.post(
      "/",
      user
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        API_ERROR_MESSAGES.CREATE_USER
      )
    );
  }
};

/*
|--------------------------------------------------------------------------
| PUT User
|--------------------------------------------------------------------------
*/

export const updateUser = async (
  userId,
  user
) => {
  try {
    const response = await apiClient.put(
      `/${userId}`,
      user
    );

    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        API_ERROR_MESSAGES.UPDATE_USER
      )
    );
  }
};

/*
|--------------------------------------------------------------------------
| DELETE User
|--------------------------------------------------------------------------
*/

export const deleteUser = async (
  userId
) => {
  try {
    await apiClient.delete(`/${userId}`);

    return true;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        API_ERROR_MESSAGES.DELETE_USER
      )
    );
  }
};

/*
|--------------------------------------------------------------------------
| Export Axios Instance
|--------------------------------------------------------------------------
|
| Exported for future testing,
| interceptors and authentication.
|
*/

export { apiClient };