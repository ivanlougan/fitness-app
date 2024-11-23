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



const getLevelExercises = (level) => {
  return api.get(`/workouts/${level}`)
    .then(({ data }) => {
      return data.workout.exercises;  
    })
    .catch(() => {
      throw new Error(`Error fetching workouts for level ${level}. Please try again later`);
    });
};



export {getUsers, updateUserGoals, getWorkouts, getLevelExercises }