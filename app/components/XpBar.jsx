import { getUserById } from "@/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"

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
        return <p>Now loading...</p>
    }
    if(error){
        return <p>{error}</p>
    }

    return (<p>{xp} XP</p>)
}

export default XpBar