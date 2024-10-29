import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate()
    const { createUser } = useCreateMyUser()
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clinetId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    if (!domain || !clinetId || !redirectUri) {
        throw new Error("Unable to initialize auth")
    }

    const onRedirectCallback = (appState?: AppState, user?: User) => {
        // console.log("User", user);
        navigate("/auth-callback")
    }
    return (
        <Auth0Provider
            domain={domain}
            clientId={clinetId}
            authorizationParams={{
                redirect_uri: redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}

