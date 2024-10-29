import { useCreateMyUser } from "@/api/MyUserApi"
import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


export const AuthCallBackPage = () => {
    const naviagte = useNavigate()
    const { user } = useAuth0();
    const { createUser } = useCreateMyUser();
    const hasCreatedUser = useRef(false)

    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email
            })
            hasCreatedUser.current = true;
        }
        naviagte("/")
    }, [createUser, naviagte, user])
    return (
        <>Loading...</>
    )
}

