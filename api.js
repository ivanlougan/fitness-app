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
      throw error;
    });
};

const updateUserGoals = (userId, newGoal) => {
    return api
        .patch(`/users/${userId}`, { goal: newGoal })
        .then(({ data }) => data.user) 
        .catch((error) => {
            throw error;
        });
};

const getWorkouts = () => {
  return api.get('/workouts')
      .then(({ data }) => data.workouts)
      .catch(() => {
          throw new Error("Error fetching workouts. Please try again later.");
      });
};

const getWorkoutLevels = (level) => {
  return api.get(`/workouts/${level}`)
      .then(({ data }) => {
          console.log('Fetched workout:', data);  
          if (!data.workout) {
              throw new Error(`No workout found for level ${level}`);
          }
          return data.workout;
      })
      .catch((error) => {
          console.error(`Error fetching workout for level ${level}:`, error); 
          throw new Error(`Error fetching workout for level ${level}. Please try again later.`);
      });
};

export {getUsers, updateUserGoals, getWorkouts, getWorkoutLevels}