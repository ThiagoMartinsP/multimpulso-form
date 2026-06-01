import "./Field.css"
export default function FieldForm({ label,
                                    icon,
                                    id,
                                    name,
                                    type,
                                    required,
                                    placeholder,
                                    value,
                                    onChange,
                                    fieldHint }) {
    return (
        <div className="form-group">
            <label htmlFor={id} className="icon-title-input">
                {icon}
                <p>{label}</p>
            </label>
            <div className="input-wrapper">
                <input
                id={id}
                name={name}
                type={type}
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                />
            </div>
            {fieldHint && <p className="field-hint">{fieldHint}</p>}
        </div>
    )
}