import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi"
import { Skeleton } from "@/components/ui/skeleton"
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm"

export const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser() || {}
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()
    if (isGetLoading) {
        return (
            <div className="flex flex-col justify-center items-center space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[40rem]" />
                    <Skeleton className="h-4 w-[30rem]" />
                </div>
            </div>
        )
    }

    if (!currentUser) {
        return <p>User not found</p>
    }
    return <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />

}
