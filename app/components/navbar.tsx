import { MapPin, SunDim } from 'lucide-react'
import React from 'react'
import SearchBox from './serchBox'

type CitySuggestion = {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
};

interface NavbarProps {
    city: string;
    searchValue: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    citySuggestions: CitySuggestion[];
    showSuggestions: boolean;
    onSelectCity: (suggestion: CitySuggestion) => void;
}

export default function Navbar({
    city,
    searchValue,
    onSearchChange,
    onSearchSubmit,
    citySuggestions,
    showSuggestions,
    onSelectCity
}: NavbarProps) {
    return (
        <div className='w-full min-h-20 bg-white/90 backdrop-blur-md sticky top-0 left-0 z-50 px-3 sm:px-6 md:px-10'>
            <div className='flex flex-col sm:flex-row justify-between items-center min-h-20 py-3 sm:py-4 gap-3 sm:gap-0'>
                <div className='flex items-center gap-2'>
                    <p className='text-2xl sm:text-3xl text-gray-900/70'>Weather</p>
                    <SunDim className='size-6 sm:size-7 text-yellow-500' />
                </div>
                <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto'>
                    <div className='flex items-center gap-2'>
                        <MapPin className='size-4 sm:size-5' />
                        <p className='capitalize text-sm sm:text-base'>{city}</p>
                    </div>
                    <SearchBox
                        value={searchValue}
                        onChange={onSearchChange}
                        onSubmit={onSearchSubmit}
                        citySuggestions={citySuggestions}
                        showSuggestions={showSuggestions}
                        onSelectCity={onSelectCity}
                    />
                </div>
            </div>
        </div>
    )
}

