import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateUserRequest {
    auth0Id: string;
    email: string;
}
interface UpdateMyUserRequest {
    name: string;
    addressLine1: string;
    city: string;
    country: string;
}

export const useGetMyUser = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyUserRequest = async (): Promise<User> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }

        return response.json();
    };

    const {
        data: currentUser,
        isLoading,
        error,
    } = useQuery("fetchCurrentUser", getMyUserRequest);

    if (error) {
        toast.error(error.toString());
    }

    return { currentUser, isLoading };
};




export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const accessToken = await getAccessTokenSilently();
        const res = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
        if (!res.ok) {
            throw new Error("Couldn't create user")
        }
    }
    const { mutate: createUser, isLoading, isError, isSuccess } = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess,
    }
}




export const useUpdateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()


    const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
        const accessToken = await getAccessTokenSilently()
        const res = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if (!res.ok) {
            throw new Error('Faild To Update user')
        }
        return res.json()
    }

    const {
        mutateAsync: updateUser,
        isLoading,
        isSuccess,
        error,
        reset
    } = useMutation(updateMyUserRequest);

    if (isSuccess) {
        toast.success("User updated successfully")
        reset()
    }

    if (error) {
        toast.error("Failed to update user")
        reset()
    }

    return { updateUser, isLoading }
}