export default function FieldOptions({ label, icon, options, selected, onSelect, error }) {
    return (
        <div className="form-group">
            <label className="icon-title-input">
                {icon}
                <p>{label}</p>
            </label>
            <div className="options-group">
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        className={`option-card${selected === option ? " selected" : ""}`}
                        onClick={() => onSelect(option)}
                    >
                        <span className="option-radio" aria-hidden="true" />
                        {option}
                    </button>
                ))}
            </div>
            {error && (
                <p className="field-hint field-hint--error">{error}</p>
            )}
        </div>
    )
}
