import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cuisineList } from "@/config/restaurant-options-config"
import { useFormContext } from "react-hook-form"
import CuisineCheckBox from "./CuisineCheckBox"


const CuisinesSection = () => {
    const { control } = useFormContext()
    return (
        <div className='space-y-2'>
            <div>
                <h2 className='text-3xl text-white font-bold'>Cuisines</h2>
                <FormDescription className='mt-3 text-white'>
                    Please provide your cuisines that your restaurant serves.
                </FormDescription>
            </div>
            <FormField
                control={control}
                name='cuisines'
                render={({ field }) => (
                    <FormItem>
                        <div className="grid md:grid-cols-5 gap-1">
                            {cuisineList.map((cuisineItem,index) => <CuisineCheckBox key={index} field={field} cuisineItem={cuisineItem} />)}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default CuisinesSection