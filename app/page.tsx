'use client';

import Image from "next/image";
import Navbar from "./components/navbar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./components/container";
import ConvertKelvinToCelsius from "@/utils/convertKelvinToCelsius";
import { ArrowDown, ArrowUp } from "lucide-react";
import Weathericon from "./components/weatherIcon";
import getDayOrNightIcon from "@/utils/getDayOrNightIcon";
import WeatherDetails from "./components/weatherDetail";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForcastWeatherDetail from "./components/forcastWeatherDetail";

// const url = `https://api.openweathermap.org/data/2.5/weather?q=kathmandu&appid=18dd0608d519de38c2415a5b4ea8fa97`

export type WeatherData = {
    cod: string;
    message: number;
    cnt: number;
    list: ForecastEntry[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
};

export type ForecastEntry = {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        sea_level: number;
        grnd_level: number;
        humidity: number;
        temp_kf: number;
    };
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    }[];
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
        gust: number;
    };
    visibility: number;
    pop: number;
    rain?: {
        '3h': number;
    };
    sys: {
        pod: string;
    };
    dt_txt: string;
};



export default function Home() {
    const { isPending, error, data } = useQuery<WeatherData>({
        queryKey: ['repoData'],
        queryFn: async () => {

            const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=kathmandu&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&cnt=56`);
            return data;

        }
    });




    const firstData = data?.list[0];


    console.log("data", data);


    const uniqueDates = [
        ...new Set(
            data?.list.map(
                (entry) => new Date(entry.dt * 1000).toISOString().split("T")[0]
            )
        )
    ];

    // Filtering data to get the first entry after 6 AM for each unique date
    const firstDataForEachDate = uniqueDates.map((date) => {
        return data?.list.find((entry) => {
            const entryDate = new Date(entry.dt * 1000).toISOString().split("T")[0];
            const entryTime = new Date(entry.dt * 1000).getHours();
            return entryDate === date && entryTime >= 6;
        });
    });

    if (isPending) return (
        <div className="flex items-center justify-center h-screen">
            <p className="animate-bounce">Loading...</p>
        </div>
    );

    if (error) return 'An error has occurred: ' + error.message



    return (
        <div className="w-full flex flex-col items-center gap-8">
            <Navbar />

            <main className=" w-11/12 mx-auto flex flex-col gap-8 pb-10 pt-2">

                {/* today's weather */}
                <section className=" space-y-4      ">
                    <div className=" space-y-4">
                        <h2 className="flex items-center gap-1 text-2xl  text-gray-900/90">
                            <p>{format(parseISO(firstData?.dt_txt ?? ""), "EEEE")}</p>
                            <p className="text-lg">({format(parseISO(firstData?.dt_txt ?? ""), "dd/MM/yyyy")})</p>
                        </h2>
                        <Container className=" gap-10 px-6 items-center"  >
                            {/* temperature */}
                            <div className="flex items-center justify-around">
                                <div className="flex flex-col px-8 items-center ">
                                    <span className="text-5xl text-gray-800">
                                        {ConvertKelvinToCelsius(firstData?.main.temp ?? 0)}°
                                    </span>
                                    <p className=" text-xs space-x-1 whitespace-nowrap">
                                        <span>Feels like</span>
                                        <span>
                                            {ConvertKelvinToCelsius(firstData?.main.feels_like ?? 0)}°C
                                        </span>

                                    </p>
                                    <p className="text-xs flex items-center space-x-2">
                                        <span className="flex items-center ">
                                            {ConvertKelvinToCelsius(firstData?.main.temp_min ?? 0)}°<ArrowDown className="w-4 h-4" />{" "}
                                        </span>
                                        <span className="flex items-center">
                                            {ConvertKelvinToCelsius(firstData?.main.temp_max ?? 0)}°<ArrowUp className="w-4 h-4" />{" "}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            {/* time and weather condition */}
                            <div className="flex gap-10 items-center justify-between overflow-x-auto mr-4">
                                {data?.list.map((d, i) => (
                                    <div key={i} className=" flex flex-col items-center gap-2 justify-between text-sm ">
                                        <p className="whitespace-nowrap">{format(parseISO(d.dt_txt), "h:mm a")}</p>
                                        {/* <Weathericon iconName={d.weather[0].icon} /> */}
                                        <Weathericon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />

                                        <p>{ConvertKelvinToCelsius(d?.main.temp ?? 0)}°C</p>
                                    </div>
                                ))}
                            </div>
                        </Container>
                    </div>
                    {/* more info */}
                    <div className="flex  gap-4">
                        {/* left */}
                        <Container className="w-fit  justify-center flex flex-col px-8 items-center ">
                            <p className=" text-center capitalize text-gray-900">
                                {firstData?.weather[0].description}{" "}
                            </p>
                            <Weathericon
                                iconName={getDayOrNightIcon(
                                    firstData?.weather[0].icon ?? "",
                                    firstData?.dt_txt ?? ""
                                )}
                            />
                        </Container>

                        {/* Right */}
                        <Container className="w-full bg-red-200/60 flex gap-4 justify-between px-8 overflow-x-auto">
                            <WeatherDetails
                                visibility={metersToKilometers(firstData?.visibility ?? 0)}
                                airPressure={`${firstData?.main.pressure} hPa`}
                                humidity={`${firstData?.main.humidity}%`}
                                windSpeed={`${convertWindSpeed(firstData?.wind.speed ?? 0)}`}
                                sunrise={format(
                                    parseISO(new Date(data?.city.sunrise * 1000).toISOString()),
                                    "h:mm a"
                                )}
                                sunset={format(
                                    parseISO(new Date(data?.city.sunset * 1000).toISOString()),
                                    "h:mm a"
                                )}
                            />
                        </Container>
                    </div>
                </section>

                {/* 7 days forecast */}
                <section className="flex w-full flex-col gap-6  ">
                    <p className="text-2xl">Forcast (7 days)</p>
                    {firstDataForEachDate.map((d, i) => (
                        <ForcastWeatherDetail 
                            key={i}
                            description={d?.weather[0].description ?? ""}
                            weatherIcon={d?.weather[0].icon ?? "01d"}
                            date={d ? format(parseISO(d.dt_txt), "dd/MM") : ""}
                            day={d ? format(parseISO(d.dt_txt), "EEEE") : ""}
                            feels_like={d?.main.feels_like ?? 0}
                            temp={d?.main.temp ?? 0}
                            temp_max={d?.main.temp_max ?? 0}
                            temp_min={d?.main.temp_min ?? 0}
                            airPressure={`${d?.main.pressure} hPa `}
                            humidity={`${d?.main.humidity}% `}
                            sunrise={format(
                                fromUnixTime(data?.city.sunrise ?? 1702517657),
                                "H:mm"
                            )}
                            sunset={format(
                                fromUnixTime(data?.city.sunset ?? 1702517657),
                                "H:mm"
                            )}
                            visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
                            windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}
