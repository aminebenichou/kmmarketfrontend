'use server';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers';


// const mainUrl = "https://aminebenichou.pythonanywhere.com/"
const mainUrl = "http://127.0.0.1:8000/"

// ✅ Helper to get token from cookies
const getToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("Token")?.value;
};

// ✅ Utility function for consistent error logging
function isAxiosError(error: any): error is { response?: { data?: any }; message: string } {
  return typeof error === 'object' && error !== null && 'message' in error;
}

// ✅ Generic GET fetch function with known response type
export const fetchData = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(`${mainUrl}${url}`, config);
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('GET request error:', error.response?.data ?? error.message);
    }
    throw error;
  }
};

// ✅ Generic GET with auth token
export const fetchDataWithToken = async <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const token = await getToken();
    const response: AxiosResponse<T> = await axios.get(`${mainUrl}${url}`, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('GET with token error:', error.response?.data ?? error.message);
    }
    throw error;
  }
};

// ✅ POST login with token set in cookies
export async function login<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  const cookieStore = await cookies();

  try {
    const response: AxiosResponse<TResponse & { token: string }> = await axios.post(
      `${mainUrl}${url}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    cookieStore.set({
      name: 'Token',
      value: response.data.token,
    });

    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('Login error:', error.response?.data ?? error.message);
    }
    throw error;
  }
}

// ✅ POST signup without token
export async function signup<TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> {
  try {
    const response: AxiosResponse<TResponse> = await axios.post(
      `${mainUrl}${url}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('Signup error:', error.response?.data ?? error.message);
    }
    throw error;
  }
}

// ✅ POST with token
export async function postData<TRequest, TResponse>(
  url: string,
  data: TRequest,
  contentType: string = 'application/json'
): Promise<TResponse> {
  const token = await getToken();

  try {
    const response: AxiosResponse<TResponse> = await axios.post(
      `${mainUrl}${url}`,
      data,
      {
        headers: {
          'Content-Type': contentType,
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('POST with token error:', error.response?.data ?? error.message);
    }
    throw error;
  }
}

// ✅ PATCH with token
export const patchRequest = async <TRequest, TResponse>(
  url: string,
  data: TRequest
): Promise<TResponse> => {
  const token = await getToken();

  try {
    const response: AxiosResponse<TResponse> = await axios.patch(
      `${mainUrl}${url}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    if (isAxiosError(error)) {
      console.error('PATCH request error:', error.response?.data ?? error.message);
    }
    throw error;
  }
};
