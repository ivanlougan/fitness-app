import axios from "axios"

const api = axios.create({
    baseURL: 'https://be-fitness-app.onrender.com/api/'
})

const getUsers = () => {
  return api.get('/users') 
    .then(({ data }) => {
      return data.users; 
    })
    .catch((error) => {
      console.error("Failed to fetch users:", error);
      throw error;
    });
};

export {getUsers}