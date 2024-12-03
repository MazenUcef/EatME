import { cuisineList } from "@/config/restaurant-options-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    onChange: (cuisines: string[]) => void;
    selectedCuisines: string[];
    isExpanded: boolean;
    onExpandedClick: () => void
}

const CuisineFilter = ({ isExpanded, onChange, onExpandedClick, selectedCuisines }: Props) => {
    const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickedCuisines = event.target.value;
        const isChecked = event.target.checked;
        const newCusinesList = isChecked ? [...selectedCuisines, clickedCuisines] : selectedCuisines.filter((cuisine) => cuisine !== clickedCuisines);
        onChange(newCusinesList)
    }
    const handleCuisinesReset = () => onChange([])
    return (
        <>
            <div className="flex justify-between items-center px-2">
                <div className="text-md font-semibold mb-2">
                    Filter by Cuisine
                </div>
                <div onClick={handleCuisinesReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-secondaryy">
                    Clear Filters
                </div>
            </div>
            <div className="space-y-2 flex flex-col">
                {cuisineList.slice(0, isExpanded ? cuisineList.length : 7).map((cuisine, index) => {
                    const isSelected = selectedCuisines.includes(cuisine)
                    return (
                        <div className="flex" key={index}>
                            <input
                                id={`cuisine_${cuisine}`}
                                type="checkbox"
                                className="hidden"
                                value={cuisine}
                                checked={isSelected}
                                onChange={handleCuisinesChange}
                            />
                            <Label htmlFor={`cuisine_${cuisine}`} className={`flex text-secondaryy flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${isSelected ? "border border-primaryy text-primaryy" : "border border-secondaryy"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cuisine}
                            </Label>
                        </div>
                    )
                })}
                <Button onClick={onExpandedClick} variant={"link"} className="mt-4 flex-1">
                    {isExpanded ?
                        (
                            <span className="flex text-secondaryy flex-row items-center">
                                View Less <ChevronUp />
                            </span>
                        )
                        :
                        (
                            <span className="flex text-secondaryy flex-row items-center">
                                Vew More <ChevronDown />
                            </span>
                        )
                    }
                </Button>
            </div>
        </>
    )
}

export default CuisineFilter;