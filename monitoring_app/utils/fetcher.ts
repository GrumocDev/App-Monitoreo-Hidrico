import axios from 'axios'
import { AxiosHeaders } from 'axios';

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120000,
})

customAxios.interceptors.request.use(
  async function (config) {

    try {
      const dataUser = localStorage?.getItem("user-data-persist") ?? ""; 
      const user = JSON.parse(dataUser)?.informationUserState;
      
      if (user?.is_authenticated) {
        (config.headers as AxiosHeaders).set('Authorization', `Token ${user.token}`)
      }
    } catch (e) {}

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
)

const fetcher = (url:string) => customAxios.get(url).then((res)=>res.data)

export { fetcher }
