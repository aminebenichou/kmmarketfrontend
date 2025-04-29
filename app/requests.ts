'use server'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export const fetchData = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await axios.get<T>(`http://127.0.0.1:8000/${url}`, config);
    return response.data;
  } catch (error) {
    console.error('GET request error:', error);
    throw error;
  }
};

export async function login<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
  const cookieStore = await cookies()
  
  try {
    const response: AxiosResponse<any> = await axios.post(`http://127.0.0.1:8000/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    console.log(response.data)
    
      cookieStore.set({
        name:'Token',
        value:response.data.token
      })

    
    return response.data;
  } catch (error: any) {
    console.error('POST request failed:', error.response?.data || error.message);
    throw error;
  }
}
export async function signup<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
  
  try {
    const response: AxiosResponse<any> = await axios.post(`http://127.0.0.1:8000/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      
    });
    console.log(response.data)
    
    return response.data;
  } catch (error: any) {
    console.error('POST request failed:', error.response?.data || error.message);
    throw error;
  }
}

export async function postData<TRequest, TResponse>(url: string, data: TRequest): Promise<TResponse> {
  const cookieStore = await cookies()
  const token = cookieStore.get("Token")
  try {
    const response: AxiosResponse<TResponse> = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token ${token}`
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('POST request failed:', error.response?.data || error.message);
    throw error;
  }
}