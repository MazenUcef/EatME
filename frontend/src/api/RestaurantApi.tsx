import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
    const getMyRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const res = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);
        if (!res.ok) {
            throw new Error(`Error fetching restaurant`)
        }
        return res.json()
    }

    const { data: restaurant, isLoading } = useQuery("fetchRestaurant", getMyRestaurantByIdRequest, {
        enabled: !!restaurantId,
    })


    return {
        restaurant,
        isLoading,
    }
}

export const useSearchRestaurant = (searchState: SearchState, city?: string) => {
    const createSearchResquest = async (): Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams()
        params.set("searchQuery", searchState.searchQuery)
        params.set("page", searchState.page.toString())
        params.set("selectedCuisines", searchState.selectedCuisines.join(","))
        params.set("sortOption", searchState.sortOption)
        const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`)

        if (!res.ok) {
            throw new Error(`Error fetching restaurant`)
        }

        return res.json()
    }

    const { data: results, isLoading } = useQuery(["searchRestaurant", searchState], createSearchResquest, { enabled: !!city })


    return {
        results,
        isLoading,
    }
}