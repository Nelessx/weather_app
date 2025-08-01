import { CircleGauge, Droplet, Eye, Sunrise, Sunset, Wind } from 'lucide-react';
import React from 'react'

export interface weatherDetailProps {
    visibility: string;
    humidity: string;
    windSpeed: string;
    airPressure: string;
    sunrise: string;
    sunset: string;

}

export default function WeatherDetails(props: weatherDetailProps) {
    return (
        <>
            <SingleWeatherDetailProps
                information="Visibility"
                icon={<Eye />}
                value={props.visibility}
            />
            <SingleWeatherDetailProps
                information="Humidity"
                icon={<Droplet />}
                value={props.humidity}
            />
            <SingleWeatherDetailProps
                information="Wind Speed"
                icon={<Wind />}
                value={props.windSpeed}
            />
            <SingleWeatherDetailProps
                information="Air Pressure"
                icon={<CircleGauge />}
                value={props.airPressure}
            />
            <SingleWeatherDetailProps
                information="Sunrise"
                icon={<Sunrise />}
                value={props.sunrise}
            />
            <SingleWeatherDetailProps
                information="Sunset"
                icon={<Sunset />}
                value={props.sunset}
            />
        </> 
    );
}


export interface SingleWeatherDetailProps {
    // Define the props for WeatherDetails component here
    information: string;
    icon: React.ReactNode;
    value: string | number;
}

function SingleWeatherDetailProps(props: SingleWeatherDetailProps) {
    return (
        <div className=' flex flex-col items-center justify-between gap-2 text-sm text-black/65 font-semibold  '>
            <p className='whitespace-nowrap'>{props.information}</p>
            <div className=''>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    );
}




