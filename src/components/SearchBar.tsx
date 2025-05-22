interface SearchBarProps {
  query: string;
  onChange: (q: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie..."
        className="flex-1 rounded-lg px-4 py-2 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
}
