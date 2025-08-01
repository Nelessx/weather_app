import { LocateFixed, LocationEdit, MapPin, Menu, SunDim } from 'lucide-react'
import React from 'react'
import SearchBox from './serchBox'

export default function Navbar() {
    return (
        <div className='w-12/12 h-20 bg-white/80 backdrop-blur-md sticky top-0 left-0 z-50 px-10'>
            <div className='flex justify-between items-center h-full px-4'>
                <div className='flex items-center gap-2'>
                    <p className=' text-3xl  text-gray-900/70 '>Weather</p>
                    <SunDim className='size-7 text-yellow-500' />
                </div>
                <div className='flex items-center gap-4'>
                    {/* <LocateFixed className='text-gray-600 transition-transform duration-200 hover:scale-125 cursor-pointer' /> */}
                    <MapPin />
                    <p>Kathmandu</p>
                    {/* <SearchBox/> */}

                </div>
            </div>
        </div>
    )
}

