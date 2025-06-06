// Implementa função de requisição autorizada genérica
import axios, { AxiosRequestConfig, Method, AxiosResponse } from 'axios';
import { useContext, useCallback } from 'react';
import { AuthContext } from './ProfileContext';

const API_URL = process.env.EXPO_PUBLIC_NIMBUS_API;

/**
 * Hook que retorna função para requisição HTTP genérica com token de autorização.
 * @param method - Método HTTP (GET, POST, PUT, DELETE, etc).
 * @param route - Rota relativa na API (ex: '/previsao/bairro/1').
 * @param token - Token JWT para Bearer auth.
 * @param data - Payload opcional para requisições POST/PUT/PATCH.
 * @param config - Configurações adicionais do Axios.
 * @returns Promessa com o corpo da resposta tipado como T.
 */
export default function AuthorizedCaller() {
  const { token, setToken, setUserId } = useContext(AuthContext);
  return useCallback(
    async <T = any>(
      method: Method,
      route: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      if (!token) {
        setToken(null);
        setUserId(null);
        return Promise.reject(new Error('Sem token, faça login novamente'));
      }
      const url = `${API_URL}${route}`;
      const headers: Record<string, string> = {
        Authorization: `Bearer ${token}`,
      };
      try {
        const response: AxiosResponse<T> = await axios.request<T>({
          url,
          method,
          headers,
          data,
          ...config,
        });
        return response.data;
      } catch (error: any) {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          setToken(null);
          setUserId(null);
        }
        console.error(`Erro na requisição ${method} ${url}:`, error);
        throw error;
      }
    },
    [token, setToken, setUserId]
  );
}