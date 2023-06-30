import axios from "axios";

 export const api=axios.create({
    baseURL: 'employment-server-production.up.railway.app',
    withCredentials: true
  });
//http://localhost:4000