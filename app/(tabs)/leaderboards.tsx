import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getUsers } from "../../api.js"

export default function LeaderboardsPage(){
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        setIsLoading(true)
        getUsers().then((users) => {
            setIsLoading(false)
            setUsers(users)
        }).catch((err) => {
            setIsLoading(false)
            setError("Error fetching users. Please try again later.")
        })
    }, [])

    if(isLoading){
        return <Text>Now loading...</Text>
    }
    if(error){
        return <Text>{error}</Text>
    }
    return (<View>
        {users.map((user, index) => {
            return (<View key={`user-${user._id}-container`}>
            <Text key={`user-${user._id}-${index+1}`}>{index+1}.</Text>
            <Text key={`user-${user._id}-name`}>Name: {user.name}</Text>
            <Text key={`user-${user._id}-level`}>Level: {user.level}</Text>
            <Text key={`user-${user._id}-xp`}>XP: {user.xp}</Text>
            </View>)
        })}
    </View>)
}