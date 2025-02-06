import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const inputRef = useRef<HTMLInputElement | null>(null);
    const popoverRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            return;
        }

        setLoading(true);
        const timeoutId = setTimeout(async () => {
            try {
                const response = await fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setLoading(false);
            }
        }, 300); // Debounce of 300ms

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const handleFocus = () => {
        setIsOpen(true);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 0);
    };

    const handleBlur = () => {
        if (!searchTerm) setIsOpen(false);
    };

    const handleItemSelect = () => {
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
        return () => document.removeEventListener('mousedown', handleClickOutside);
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
                            {loading ? "טוען תוצאות..." : searchTerm && results.length === 0 ? 'אין תוצאות חיפוש' : ''}
                        </CommandEmpty>

                        <CommandList>
                            {results.map((result: { id: string, name: string }) => (
                                <CommandItem
                                    key={result.id}
                                    value={result.name}
                                    onSelect={() => handleItemSelect(result.name)}
                                >
                                    {result.name}
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
