import { useState, useEffect } from "react";

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Filter({ onSearch }) {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <div className="filter-panel">
      <label className="filter-label" htmlFor="model-search">
        Search models
      </label>
      <input
        id="model-search"
        type="text"
        placeholder="Type a model name to filter results..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="filter-input"
      />
    </div>
  );
}