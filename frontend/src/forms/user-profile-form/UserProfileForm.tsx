import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { User } from '@/types';
import { useEffect } from 'react';

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "addressLine1 is required"),
    city: z.string().min(1, "city is required"),
    country: z.string().min(1, "country is required"),
})

type userFormData = z.infer<typeof formSchema>

type Props = {
    currentUser: User;
    onSave: (userProfileData: userFormData) => void;
    isLoading: boolean
}

const UserProfileForm = ({ onSave, isLoading, currentUser }: Props) => {
    const form = useForm<userFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(() => {
        form.reset(currentUser)
    }, [currentUser, form])


    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSave)} className='space-y-4 p-10 bg-secondaryy rounded-lg md:p-10'>
                <div>
                    <h2 className='text-2xl text-white font-bold'>User Profile</h2>
                </div>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className='bg-white' />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-white'>Name</FormLabel>
                            <FormControl>
                                <Input autoComplete='false' {...field} className='bg-white' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className='flex flex-col md:flex-row gap-4'>

                    <FormField
                        control={form.control}
                        name='addressLine1'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel className='text-white'>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input autoComplete='false' {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name='city'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel className='text-white'>City</FormLabel>
                                <FormControl>
                                    <Input autoComplete='false' {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='country'
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel className='text-white'>Country</FormLabel>
                                <FormControl>
                                    <Input autoComplete='false' {...field} className='bg-white' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {
                    isLoading ? <LoadingButton /> : <Button type='submit' className='bg-primaryy'>Submit</Button>
                }
            </form>
        </Form>
    )
}

export default UserProfileForm;