import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';

const results = [
{ value: 'אימון נשק ארוך', label: 'אימון נשק ארוך' },
{ value: 'אימון אקדח', label: 'אימון אקדח' },
{ value: 'תרגילים יבשים', label: 'תרגילים יבשים' },
{ value: 'תוכן מקצועי', label: 'תוכן מקצועי' },
{ value: 'עזרה ראשונה', label: 'עזרה ראשונה' },
{ value: 'מטרות', label: 'מטרות' },
];

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const filteredResults = results.filter((result) =>
        result.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFocus = () => {
        setIsOpen(true); // Opens the dropdown when the input field is focused.
        setTimeout(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        }, 0);
    };

    // Closes the dropdown if the input is blurred and there's no search term
    const handleBlur = () => {
        if (!searchTerm) setIsOpen(false);
    };

    const handleItemSelect = (value: string) => {
        setSearchTerm('');
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node) && inputRef.current && !inputRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            setSearchTerm('');
        }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative z-10">
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0"
                    onClick={() => {
                        setIsOpen(false);
                        setSearchTerm('');
                    }}
                />
            )}

            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center bg-gray-700 rounded-full px-4 py-2 cursor-pointer relative z-20">
                        <Search className="text-white w-5 h-5" />
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="חיפוש..."
                            dir="rtl"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="px-4 py-2 bg-gray-700 text-white rounded-full w-60 focus:outline-none"
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent ref={popoverRef} className="w-[500px] p-0">
                    <Command>
                        <CommandEmpty>
                            {searchTerm && filteredResults.length === 0
                                ? 'אין תוצאות חיפוש'// Displays a message when no results match the search term
                                : ''}
                        </CommandEmpty>

                        <CommandList>
                            {filteredResults.map((result) => (
                                <CommandItem
                                    key={result.value}
                                    value={result.value}
                                    onSelect={() => handleItemSelect(result.value)} // Selects an item when clicked
                                >
                                    {result.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};    

export default SearchBar;