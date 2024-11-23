import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

const DetailsSection = () => {
    const { control } = useFormContext()
    return (
        <div className='space-y-2'>
            <div>
                <h2 className='text-3xl text-white font-bold'>Restaurant Details</h2>
                <FormDescription className='mt-3 text-white'>
                    Please provide your details to complete your restaurant creation.
                </FormDescription>
            </div>
            <FormField
                control={control}
                name='restaurantName'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-white'>Name</FormLabel>
                        <FormControl>
                            <Input
                                autoComplete='off'
                                {...field}
                                className='bg-white'
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className='flex flex-col md:flex-row gap-4'>
                <FormField
                    control={control}
                    name='city'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel className='text-white'>City</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete='off'
                                    {...field}
                                    className='bg-white'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name='country'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel className='text-white'>Country</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete='off'
                                    {...field}
                                    className='bg-white'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className='flex flex-col md:flex-row gap-4'>
                <FormField
                    control={control}
                    name='deliveryPrice'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel className='text-white'>Delivery price($)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='bg-white'
                                    placeholder='1.50'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name='estimatedDeliveryTime'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormLabel className='text-white'>Estimated Delivery Time (minutes)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className='bg-white'
                                    placeholder='30'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

        </div>
    )
}

export default DetailsSection