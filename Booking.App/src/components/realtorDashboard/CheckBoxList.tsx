import "../../css/DashBoardRealtorClasses/index.scss";

interface CheckboxOption {
    id: string;
    name: string;
}

interface CheckboxListProps {
    options: CheckboxOption[];
    selectedOptions: string[] | null;
    onChange: (selectedOptions: string[]) => void;
}

export default function CheckboxList({
    options,
    selectedOptions,
    onChange,
}: CheckboxListProps) {
    const handleChange = (id: string) => {
        if (selectedOptions !== null && selectedOptions.includes(id)) {
            onChange(selectedOptions.filter((option) => option !== id));
        } else {
            if (selectedOptions !== null) onChange([...selectedOptions, id]);
        }
    };

    //Set oportunity make choice with enter button
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, optionId: string) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevent form submission or other default actions
            handleChange(optionId);  // Trigger the change handler
        }
    };

    return (
        <div className="checkboxList">
            {options.map((option) => (
                <label key={option.id} className="checkboxLabel">
                    <input
                        type="checkbox"
                        checked={selectedOptions?.includes(option.id)}
                        onChange={() => handleChange(option.id)}
                        onKeyDown={(event) => handleKeyDown(event, option.id)} // Handle Enter/Space with onKeyDown
                        tabIndex={0}
                    />
                    {option.name}
                </label>
            ))}
        </div>
    );
}
