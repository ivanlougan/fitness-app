import axios from "axios";

const api = axios.create({
    baseURL: 'https://be-fitness-app.onrender.com/api',
});


const getUsers = () => {
    return api.get('/users')
        .then(({ data }) => data.users)
        .catch((error) => {
            throw error;
        });
};

function patchUser(userId, options){
    return api.patch(`/users/${userId}`, options).then(({data}) => {
        return data.user
    })
}

const getLevelExercises = (level) => {
    return api.get(`/workouts/${level}`)
        .then(({ data }) => data.workout.exercises)
        .catch((error) => {
            throw new Error(`Error fetching workouts for level ${level}: ${error.message}`);
        });
};


const addGoal = (userId, goal) => {
    return api.post(`/users/${userId}/goals`, { goal_to_add: goal })
        .then(({ data }) => data.goals)
        .catch((error) => {
            throw new Error(`Error adding goal: ${error.message}`);
        });
};


const deleteGoal = (userId, goal) => {
    return api.delete(`/users/${userId}/goals`, { data: { goal_to_remove: goal } })
        .then(() => {})
        .catch((error) => {
            throw new Error(`Error removing goal: ${error.message}`);
        });
};

const getWorkouts = () => {
    return api.get('/workouts')
        .then(({ data }) => data.workouts)
        .catch(() => {
            throw new Error("Error fetching workouts. Please try again later.");
        });
};

export { getUsers, getLevelExercises, addGoal, deleteGoal, getWorkouts, patchUser };
