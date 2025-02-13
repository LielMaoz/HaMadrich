    import { useState, useRef, useEffect, useMemo } from 'react';
    import { useRouter } from 'next/navigation';
    import { Search } from 'lucide-react';
    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
    import { Command, CommandList, CommandItem, CommandEmpty } from '@/components/ui/command';

    interface SearchItem {
        id: string;
        name: string;
        category: 'drills' | 'firstAid' | 'professionalContent';
    }

    const categoryLinks: Record<string, string> = {
        drills: '/drill-card/',
        firstAid: '/first-aid-card/',
        professionalContent: '/prof-cont-card/',
    };

    const SearchBar = ({ isLoggedIn }) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [isOpen, setIsOpen] = useState(false);
        const [isExpanded, setIsExpanded] = useState(false);
        const [searchData, setSearchData] = useState<SearchItem[]>([]);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState<string | null>(null);

        const router = useRouter();
        const inputRef = useRef<HTMLInputElement | null>(null);
        const popoverRef = useRef<HTMLDivElement | null>(null);
        const errorRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const fetchData = async () => { 
                setLoading(true);
                try {
                    const response = await fetch('/api/search');
                    const data = await response.json();

                    console.log("Fetched Data:", data);

                    // Saving unique results by ID
                    const uniqueResults = new Map<string, SearchItem>();

                    const formattedData: SearchItem[] = [
                        ...data.drills.map((item: { id: string; training_name: string; weapon_type: string; drill_type: string }) => ({
                        id: item.id,
                        name: `${item.training_name} (${item.drill_type === 'חי' ? 'חי' : 'יבש'}, ${item.weapon_type === 'נשק ארוך' ? 'נשק ארוך' : 'אקדח'})`,
                        category: 'drills'
                        })),
                        ...data.firstAid.map((item: { id: string; name: string }) => ({
                        id: item.id,
                        name: item.name,
                        category: 'firstAid'
                        })),
                        ...data.professionalContent.map((item: { id: string; name: string }) => ({
                        id: item.id,
                        name: item.name,
                        category: 'professionalContent'
                        }))
                    ];
                    
                    console.log("Formatted Data:", formattedData);

                    formattedData.forEach(item => {
                        if (!uniqueResults.has(item.id)) {
                            uniqueResults.set(item.id, item);
                        }
                    });

                    setSearchData(Array.from(uniqueResults.values()));
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, []);

        const filteredResults = useMemo(() => {
            if (!searchTerm.trim()) return [];

            return searchData
            .filter(item => 
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => a.name.localeCompare(b.name, 'he'));
            }, [searchTerm, searchData]);

            // רק הדפסות
            useEffect(() => {
                if (filteredResults.length > 0) {
                    ['drills', 'professionalContent', 'firstAid'].forEach(category => {
                        const categoryResults = filteredResults.filter(item => item.category === category);
                        console.log(`Results for ${category}:`, categoryResults);
                    });
                }
            }, [filteredResults]);
        
            console.log("Filtered Results:", filteredResults);

        const handleFocus = () => {
            if (!isLoggedIn) {
                setError('עליך להתחבר לפני שתוכל לבצע חיפוש');
                setIsExpanded(false); // Make sure search doesn't expand if not logged in
            }
            setIsExpanded(true);
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0);
        };

        const handleItemSelect = (item: SearchItem) => {
            setSearchTerm('');
            setIsExpanded(false);
            setIsOpen(false);
            router.push(`${categoryLinks[item.category]}${item.id}`);
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

                // Close the error message when clicking outside
                if (errorRef.current && !errorRef.current.contains(event.target as Node)) {
                    setError(null);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div className="relative z-10">
                {error && (
                <div ref={errorRef} className="absolute top-[100%] left-0 right-0 bg-red-500 text-white text-center py-2 rounded-lg shadow-lg z-10">
                    {error}
                </div>
            )}

                <Popover open={isOpen}>
                    <PopoverTrigger asChild>
                        <div 
                            className={`flex items-center bg-gray-700 rounded-full 
                                        px-4 py-2 cursor-pointer relative z-20 
                                        transition-all duration-300 
                                        ${isExpanded ? 'w-full justify-start' : 'w-[3rem] justify-center'}`}
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
                                    disabled={!isLoggedIn}
                                />
                            )}
                        </div>
                    </PopoverTrigger>

                    <PopoverContent ref={popoverRef} className="w-full sm:w-[500px] p-0">
                    {isLoggedIn && (
                        <Command>
                            <CommandEmpty>
                                {loading 
                                    ? "טוען תוצאות..." 
                                    : searchTerm.trim().length > 0 && filteredResults.length === 0 
                                    ? "אין תוצאות חיפוש" 
                                    : ""}
                            </CommandEmpty>

                            <CommandList>
                                {['drills', 'professionalContent', 'firstAid'].map(category => {
                                    const categoryResults = filteredResults.filter(item => item.category === category);

                                    if (categoryResults.length === 0) return null;

                                    return (
                                        <div key={category}>
                                            <div className="p-2 bg-gray-100 font-semibold text-gray-800">
                                                {category === 'drills' && 'מקצים'}
                                                {category === 'professionalContent' && 'תוכן מקצועי'}
                                                {category === 'firstAid' && 'עזרה ראשונה'}
                                            </div>
                                            {categoryResults.map(item => (
                                                <CommandItem
                                                    key={item.id}
                                                    value={item.name}
                                                    onSelect={() => handleItemSelect(item)}
                                                >
                                                    {item.name}
                                                </CommandItem>
                                            ))}
                                        </div>
                                    );
                                })}
                            </CommandList>
                        </Command>
                         )}
                    </PopoverContent>
                </Popover>
            </div>
        );
    };

    export default SearchBar;
