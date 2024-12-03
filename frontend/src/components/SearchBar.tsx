import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { useEffect } from "react";


const formSchema = z.object({
    searchQuery: z.string({
        required_error: "Restaurant name is required",
    })
});

export type SearchForm = z.infer<typeof formSchema>
type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder?: string;
    onReste?: () => void;
    searchQuery?: string;
};


const SearchBar = ({ onSubmit, onReste, placeHolder, searchQuery }: Props) => {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery,
        },
    });

    useEffect(() => {
        form.reset({ searchQuery })
    }, [form, searchQuery])

    const handelReset = () => {
        form.reset({
            searchQuery: "",
        })

        if (onReste) {
            onReste()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex bg-white items-center flex-1 gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 ${form.formState.errors.searchQuery && "border-primaryy"}`}>
                <Search
                    strokeWidth={2.5}
                    size={30}
                    className="ml-1 hidden md:block text-primaryy"
                />
                <FormField
                    control={form.control}
                    name="searchQuery"
                    render={({ field }) => (
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input
                                    className="border-none bg-white shadow-none text-xl focus-visible:ring-0"
                                    placeholder={placeHolder}
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    onClick={handelReset}
                    type="button"
                    variant="outline"
                    className="rounded-full"
                >
                    Reset
                </Button>
                <Button
                    type="submit"
                    className="rounded-full bg-primaryy"
                >
                    Search
                </Button>
            </form>
        </Form>
    )
}

export default SearchBar;