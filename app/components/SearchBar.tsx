interface SearchBarProps {
  onSearchInput: (str: string) => void
}

export default function SearchBar({ onSearchInput }: SearchBarProps) {
  return (
    <input onChange={(e) => onSearchInput(e.target.value)} className="w-1/3 outline-none bg-slate-100 px-4 py-3 rounded-lg mt-20" placeholder="Search through library here..." />
  );
}

