import { cn } from '@/utils/cn'
import Image from 'next/image'
import React from 'react'

export default function Weathericon(props: React.HTMLProps<HTMLDivElement> & { iconName: string }) {
  return (
    <div {...props} className={cn("relative h-20 w-20")}>
      <Image src={`https://openweathermap.org/img/wn/${props.iconName}@2x.png`}
        className='absolute h-full w-full '
        alt="Weather Icon" width={100} height={100} />
    </div>
  )
}
