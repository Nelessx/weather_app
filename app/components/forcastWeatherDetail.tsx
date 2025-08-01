import React from 'react'
import Container from './container'
import Weathericon from './weatherIcon'
import WeatherDetails, { weatherDetailProps } from './weatherDetail';
import ConvertKelvinToCelsius from '@/utils/convertKelvinToCelsius';

export interface ForcastWeatherDetailProps extends weatherDetailProps {
    weatherIcon: string;
    date: string;
    day: string;
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    description: string;
}

export default function ForcastWeatherDetail(props: ForcastWeatherDetailProps) {
    return (
        <Container className=' gap-4 bg-white/60'>
            <section className='flex gap-4 items-center text-center px-4'>
                <div>
                    <Weathericon iconName={props.weatherIcon} />
                    <p>{props.date}</p>
                    <p className=' text-xs'>{props.day}</p>
                </div>

                <div className=' flex flex-col px-4'>
                    <span className='text-5xl text-black/80'> {ConvertKelvinToCelsius(props.temp ?? 0)}°</span>
                    <p className='text-xs space-x-1 whitespace-nowrap'>
                        <span> Feels Like</span>
                        <span>{ConvertKelvinToCelsius(props.feels_like ?? 0)}°</span>
                    </p>
                    <p className='capitalize text-black/85 text-md text-left'>{props.description}</p>
                </div>
            </section>

            <section className=" overflow-x-auto flex justify-between gap-4 px-4  w-full pr-10">
                <WeatherDetails {...props} />
            </section>
        </Container>
    ) 
}
