import { useSearchRestaurant } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams()
    const { results } = useSearchRestaurant(city)

    return (
        <span>User searched for {city} <span> {results?.data.map((restaurant , index) => <span key={index}>
            found - {restaurant.restaurantName} , {restaurant.city}
        </span>)}</span></span>
    )
}

export default SearchPage;