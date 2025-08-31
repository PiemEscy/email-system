import { useState } from "react";
import { validateEmail } from "@/CommonJsFunction/CommonJsFunction";

export default function MultiEmailInput({ value = [], onChange }) {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const addEmail = () => {
        const trimmed = inputValue.trim();

        if (!trimmed) return;

        if (!validateEmail(trimmed)) {
            setError("Invalid email address.");
            return;
        }

        if (value.includes(trimmed)) {
            setError("This email is already added.");
            return;
        }

        onChange([...value, trimmed]);
        setInputValue("");
        setError("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addEmail();
        }
    };

    const removeEmail = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-2">
            {/* Emails + Input in one line */}
            <div className="flex flex-wrap items-center gap-1 border rounded px-2 py-2 text-sm border-gray-400 min-h-[40px]">
                {value.map((email, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded-full"
                    >
                        {email}
                        <button
                            type="button"
                            onClick={() => removeEmail(i)}
                            className="text-gray-500 hover:text-red-600"
                        >
                            ×
                        </button>
                    </span>
                ))}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addEmail}
                    placeholder="Enter email..."
                    className="w-64 border-none outline-none focus:outline-none focus:ring-0 bg-gray-200 px-2 py-1 rounded-full text-sm"
                />

                {/* Add button styled like a chip */}
                {inputValue && (
                    <button
                        type="button"
                        onClick={addEmail}
                        className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm hover:bg-blue-200"
                    >
                        Add
                    </button>
                )}
            </div>

            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
