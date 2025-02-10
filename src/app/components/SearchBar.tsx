    import { useState, useRef, useEffect, useMemo } from 'react';
    import { useRouter } from 'next/navigation';
    import { Search } from 'lucide-react';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';

    const SearchBar = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [isOpen, setIsOpen] = useState(false);
        const [isExpanded, setIsExpanded]= useState(false);
        const [drills, setDrills] = useState<{ id: string; training_name: string }[]>([]);
        const [loading, setLoading] = useState(false);
        
        const router = useRouter();
        const inputRef = useRef<HTMLInputElement | null>(null);
        const popoverRef = useRef<HTMLDivElement | null>(null);
        
        // Preloading all exercises
        useEffect(() => {
            const fetchDrills = async () => {
                setLoading(true);
                try {
                    const response = await fetch('/api/search');
                    const data: { id: string; training_name: string }[] = await response.json();

                    // Removing duplicates by exercise name
                    const uniqueDrills = Array.from(
                        new Map(data.map(item => [item.training_name, item])).values());
                    setDrills(uniqueDrills);
                } catch (error) {
                    console.error("Error fetching drills:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchDrills();
        }, []);

        // Local search on the data already loaded
        const filteredResults = useMemo(() => {
            if (!searchTerm.trim()) return [];
            return drills.filter((drill: { training_name: string }) =>
                drill.training_name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }, [searchTerm, drills]);

        const handleFocus = () => {
            setIsExpanded(true);
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0);
        };

        const handleItemSelect = (drill: { id: string }) => {
            setSearchTerm('');
            setIsExpanded(false);
            setIsOpen(false);
            router.push(`/drill-card/${drill.id}`);
        };

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (
                    popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
                    inputRef.current && !inputRef.current.contains(event.target as Node)
                ) {
                    setIsExpanded(false);
                    setIsOpen(false);
                    setSearchTerm('');
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="relative z-10">
                {isExpanded && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-0"
                        onClick={() => {
                            setIsExpanded(false);
                            setIsOpen(false);
                            setSearchTerm('');
                        }}
                    />
                )}

                <Popover open={isOpen}>
                    <PopoverTrigger asChild>
                        <div 
                            className={`flex items-center bg-gray-700 rounded-full 
                                        px-4 py-2 cursor-pointer relative z-20 
                                        transition-all duration-300 
                                        ${isExpanded ? 'w-60' : 'w-12 justify-center'}`}
                            onClick={handleFocus}
                        >
                            <Search className="text-white w-5 h-5" />
                            {isExpanded && (
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="חיפוש..."
                                    dir="rtl"
                                    className="px-4 py-2 bg-gray-700 text-white rounded-full w-full focus:outline-none"
                                />
                            )}
                        </div>
                    </PopoverTrigger>

                    <PopoverContent ref={popoverRef} className="w-[500px] p-0">
                        <Command>
                            <CommandEmpty>
                                {loading 
                                    ? "טוען תוצאות..." 
                                    : searchTerm.trim().length > 0 && filteredResults.length === 0 
                                    ? "אין תוצאות חיפוש" 
                                    : ""}
                            </CommandEmpty>

                            <CommandList>
                                {filteredResults.map((drill: { id: string, training_name: string }) => (
                                    <CommandItem
                                    key={drill.id}
                                    value={drill.training_name}
                                    onSelect={() => handleItemSelect(drill)}
                                    >
                                        {drill.training_name}
                                    </CommandItem>
                                ))
                                }
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    export default SearchBar;