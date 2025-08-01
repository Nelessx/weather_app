import { cn } from '@/utils/cn';
import { Search } from 'lucide-react'
import React from 'react'

type Props = {
    className?: string;
    value: string;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
    onChange:React.ChangeEventHandler<HTMLInputElement> | undefined;
};

export default function SearchBox(props: Props) {
  return (
    <form 
    onSubmit = {props.onSubmit}
    className={cn("flex relative items-center justify-center gap-2 px-2 bg-white rounded-md shadow-md  border border-gray-600", props.className)}>
        
        <input type="text" 
        value={props.value}
        onChange={props.onChange}
        placeholder='search location' className=' flex px-4 py-2 outline-none' />

        <button className='transition-transform duration-200 hover:scale-125 cursor-pointer'>
            <Search/>
        </button>

    </form>
  )
}
