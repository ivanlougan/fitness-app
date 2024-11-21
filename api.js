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

const updateUserGoals = (userId, newGoal) => {
    return api
        .patch(`/users/${userId}`, { goal: newGoal })
        .then(({ data }) => data.user) 
        .catch((error) => {
            console.error('Failed to update goals:', error);
            throw error;
        });
};

const getWorkouts = () => {
  return api.get('/workouts')
    .then(({ data }) => {
      return data.workouts; 
    })
    .catch((error) => {
      throw error;
    });
};

export {getUsers, updateUserGoals, getWorkouts}