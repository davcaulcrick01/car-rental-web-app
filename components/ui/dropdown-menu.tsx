import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border rounded-lg bg-gray-800 text-white"
      >
        Menu <ChevronDown className="ml-2" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
}

export function DropdownMenuContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DropdownMenuItem({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="block px-4 py-2 w-full text-left text-black hover:bg-gray-200"
    >
      {children}
    </button>
  );
}
