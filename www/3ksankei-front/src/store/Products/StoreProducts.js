import { defineStore } from "pinia";
import Cookies from 'js-cookie';
import axios from 'axios';

export const StoreProducts = defineStore("StoreProducts", () => {
  const path_api = import.meta.env.VITE_API_URL

  async function getDataStore(accessToken) {
    try {
        const url = `${path_api}/api/produto`;
    
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.status === 403) {
          return response.status;
      }

      if (!response.ok) {
        console.log('response',response)
      }

      return response.data;
    } catch (error) {
        throw error;
    }
  }

  return {
    getDataStore
  };
});
