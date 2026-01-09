import { cn } from '@/utils/cn';
import { Search } from 'lucide-react'
import React from 'react'

type CitySuggestion = {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

type Props = {
  className?: string;
  value: string;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  citySuggestions?: CitySuggestion[];
  showSuggestions?: boolean;
  onSelectCity?: (suggestion: CitySuggestion) => void;
};

export default function SearchBox(props: Props) {
  const [isFocused, setIsFocused] = React.useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = isFocused && props.showSuggestions && props.citySuggestions && props.citySuggestions.length > 0;

  return (
    <div ref={searchRef} className="relative w-full sm:w-auto">
      <form
        onSubmit={props.onSubmit}
        className={cn("flex relative items-center justify-center gap-1 sm:gap-2 px-2 bg-white rounded-md shadow-md border border-gray-600 w-full", props.className)}
      >
        <input
          type="text"
          value={props.value}
          onChange={props.onChange}
          onFocus={() => setIsFocused(true)}
          placeholder='search location'
          className='flex px-2 sm:px-4 py-2 outline-none text-sm sm:text-base w-full min-w-0'
        />

        <button type="submit" className='transition-transform duration-200 hover:scale-125 cursor-pointer flex-shrink-0'>
          <Search className='size-4 sm:size-5' />
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg border border-gray-300 max-h-60 overflow-y-auto z-50">
          {props.citySuggestions!.map((suggestion, index) => (
            <div
              key={`${suggestion.name}-${suggestion.lat}-${suggestion.lon}-${index}`}
              onClick={() => {
                props.onSelectCity?.(suggestion);
                setIsFocused(false);
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-900">{suggestion.name}</div>
              <div className="text-xs text-gray-500">
                {suggestion.state && `${suggestion.state}, `}{suggestion.country}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
