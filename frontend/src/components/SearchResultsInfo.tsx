import { Link } from "react-router-dom";

type Props = {
    total: number;
    city: string
}

const SearchResultsInfo = ({ total, city }: Props) => {
    return (
        <div className="text-xl text-secondaryy font-bold flex flex-col gap-3 justify-between lg:flex-row lg:items-center">
            <span className="text-secondaryy">
                {total} Total Restaurant In {city}
                <Link className="font-semibold ml-1 underline cursor-pointer text-primaryy" to={"/"}>Go Home Page</Link>
            </span>
            Sort Dropdown Here
        </div>
    )
}

export default SearchResultsInfo;