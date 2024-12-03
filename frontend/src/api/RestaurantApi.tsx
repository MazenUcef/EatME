import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurant = (city?: string) => {
    const createSearchResquest = async (): Promise<RestaurantSearchResponse> => {
        const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}`)

        if (!res.ok) {
            throw new Error(`Error fetching restaurant`)
        }

        return res.json()
    }

    const { data: results, isLoading } = useQuery(["searchRestaurant"], createSearchResquest, { enabled: !!city })


    return {
        results,
        isLoading,
    }
}