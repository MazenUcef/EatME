import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
    restaurant: Restaurant
}

const SearchResultsCard = ({ restaurant }: Props) => {
    return (
        <Link to={`/detail/${restaurant._id}`} className="grid lg:grid-cols-[2fr_3fr] gap-5 group">
            <AspectRatio ratio={16/6}>
                <img src={restaurant.imageUrl} className="rounded-md w-full h-full object-cover" />
            </AspectRatio>
            <div>
                <h3 className="text-2xl text-primaryy font-bold tracking-tight mb-2 group-hover:underline">{restaurant.restaurantName}</h3>
                <div id="card-conetnt" className="gap-2 grid md:grid-cols-2">
                    <div className="flex flex-wrap flex-row">
                        {restaurant.cuisines.map((item, index) => (
                            <span key={index} className="flex text-secondaryy">
                                <span>{item}</span>
                                {index < restaurant.cuisines.length - 1 && <Dot />}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2 flex-col">
                        <div className="flex items-center gap-1 text-secondaryy">
                            <Clock className="text-secondaryy" />
                            {restaurant.estimatedDeliveryTime} mins
                        </div>
                        <div className="flex text-secondaryy items-center gap-1">
                            <Banknote />
                            Delivery From ${(restaurant.deliveryPrice / 100).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default SearchResultsCard;