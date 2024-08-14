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

export default function CheckboxList({ options, selectedOptions, onChange }: CheckboxListProps) {
    const handleChange = (id: string) => {
        if (selectedOptions !== null && selectedOptions.includes(id)) {
            onChange(selectedOptions.filter(option => option !== id));
        } else {
            if(selectedOptions !== null )
                 onChange([...selectedOptions, id]);
        }
    };

    return (
        <div className="checkboxList">
            {options.map(option => (
                <label key={option.id} className="checkboxLabel">
                    <input
                        type="checkbox"
                        checked={selectedOptions?.includes(option.id)}
                        onChange={() => handleChange(option.id)}
                    />
                    {option.name}
                </label>
            ))}
        </div>
    );
}
