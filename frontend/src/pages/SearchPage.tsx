import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchResultsCard from "@/components/SearchResultsCard";
import SearchResultsInfo from "@/components/SearchResultsInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";

const SearchPage = () => {
    const { city } = useParams()
    const { results, isLoading } = useSearchRestaurant(city)



    if (isLoading) {
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
    if (!results?.data || !city) {
        return <span>No Results Found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="text-secondaryy font-semibold" id="cuisines-list">
                Add Your Cuisines Here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultsInfo total={results.pagination.total} city={city} />
                {results.data.map((restaurant, index) => (
                    <SearchResultsCard key={index} restaurant={restaurant} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage;