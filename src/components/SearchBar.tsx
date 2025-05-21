interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
  onSearch: () => void;
}

export function SearchBar( { query, onChange, onSearch} : SearchBarProps) {
    return (
        <div className="flex gap-2 mb-6">
            <input 
                type="text"
                value={query}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search for a movie..."
                className="w-full p-3 rounded border border-gray-400 text-white"
            />
            <button 
                onClick={onSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search
            </button>
        </div>
    );
}