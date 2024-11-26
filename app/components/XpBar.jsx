import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Text } from 'react-native';  

function XpBar(){
    const [xp, setXp] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
    const [signedInUser, setSignedInUser] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        AsyncStorage.getItem("signedInUser").then((signedInUser) => {
            setIsLoading(false)
            setSignedInUser(JSON.parse(signedInUser))
            setXp(JSON.parse(signedInUser).xp)
        }).catch((err) => {
            setIsLoading(false)
            setError("User XP cannot be displayed")
        })
    }, [])
    
    if(isLoading){
        return <Text>Now loading...</Text>; 
    }
    if(error){
        return <Text>{error}</Text>;  
    }

    return (<Text>{xp} XP</Text>);  
}

export default XpBar

