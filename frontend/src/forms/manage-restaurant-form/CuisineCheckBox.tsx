import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
    cuisineItem: string;
    field: ControllerRenderProps<FieldValues, "cuisines">;
}

const CuisineCheckBox = ({ cuisineItem, field }: Props) => {
    return (
        <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
            <FormControl>
                <Checkbox
                    className="bg-white"
                    checked={field.value.includes(cuisineItem)}
                    onCheckedChange={(checked) => {
                        if (checked) {
                            field.onChange([...field.value, cuisineItem]);
                        } else {
                            field.onChange(
                                field.value.filter((value: string) => value !== cuisineItem)
                            );
                        }
                    }}
                />
            </FormControl>
            <FormLabel className="text-sm text-white font-normal">
                {cuisineItem}
            </FormLabel>
        </FormItem>
    );
}

export default CuisineCheckBox;