/**
 * SearchableSelect component - Dropdown with search/filter functionality.
 * Selected items display as chips below.
 */
import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  options: string[];
  selectedValues: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder?: string;
  label: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  selectedValues,
  onAdd,
  onRemove,
  placeholder = "Type to search or add custom...",
  label,
  disabled = false,
}: SearchableSelectProps) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter options based on input
  useEffect(() => {
    if (inputValue.trim()) {
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(inputValue.toLowerCase()),
      );
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions(options);
    }
  }, [inputValue, options]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAdd = (value: string) => {
    if (value.trim() && !selectedValues.includes(value.trim())) {
      onAdd(value.trim());
      setInputValue("");
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        handleAdd(inputValue);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <label className="form-label">{label}</label>

      {/* Input Field */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="form-input"
          placeholder={placeholder}
          disabled={disabled}
        />
        {inputValue && (
          <button
            type="button"
            onClick={() => setInputValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={disabled}
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown Options */}
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.slice(0, 20).map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleAdd(option)}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm transition-colors"
              disabled={disabled || selectedValues.includes(option)}
            >
              {selectedValues.includes(option) ? (
                <span className="text-gray-400">{option} ✓</span>
              ) : (
                option
              )}
            </button>
          ))}
          {filteredOptions.length > 20 && (
            <div className="px-4 py-2 text-xs text-gray-500 italic">
              ...and {filteredOptions.length - 20} more. Keep typing to narrow
              results.
            </div>
          )}
        </div>
      )}

      {/* Custom Entry Hint */}
      {isOpen && inputValue && filteredOptions.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <button
            type="button"
            onClick={() => handleAdd(inputValue)}
            className="w-full text-left px-4 py-2 hover:bg-green-50 text-sm"
            disabled={disabled}
          >
            <span className="text-green-600">+ Add custom:</span> "{inputValue}"
          </button>
        </div>
      )}

      {/* Selected Chips */}
      {selectedValues.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedValues.map((value, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {value}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="hover:text-blue-600 font-bold"
                disabled={disabled}
                title="Remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
