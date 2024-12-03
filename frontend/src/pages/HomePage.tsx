import chees from '../assets/oh.gif'
import menu from '../assets/menu.jpg'
import SearchBar, { SearchForm } from '@/components/SearchBar'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {
    const navigate = useNavigate()

    const handleSearchSubmit = (searchFormValues: SearchForm) => {
        navigate({
            pathname: `/search/${searchFormValues.searchQuery}`,
        })
    }
    return (
        <div className="flex flex-col gap-12">
            <div className="bg-secondaryy rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
                <h1 className="text-5xl font-bold text-primaryy">
                    Wanna Feed More !!
                </h1>
                <span className="text-xl text-white">Let's explore what do you like to Eat!!</span>
                <SearchBar
                    placeHolder='Search by City or Town'
                    onSubmit={handleSearchSubmit}
                />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
                <img src={menu} className='rounded-lg h-[44rem]' alt='menu' />

                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <span className='font-bold text-secondaryy text-3xl'>
                        Order Takeaway Now Faster !
                    </span>
                    <span className='font-semibold text-secondaryy'>
                        Order now and enjoy your meal at your doorstep.
                    </span>
                    <img src={chees} className='rounded-lg' alt='burger' />
                </div>
            </div>
        </div>
    )
}
