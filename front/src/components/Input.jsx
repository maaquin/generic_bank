export const Input = ({
  field,
  label,
  value,
  onChangeHandler,
  type,
  placeholder,
  className,
  onBlurHandler,
  textarea,
  disabled
}) => {
  const handleValueChange = (event) => {
    onChangeHandler(event.target.value, field);
  };

  const handlerInputBlur = (event) => {
    onBlurHandler(event.target.value, field);
  };

  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      <div>
          <input
            type={type}
            value={value}
            onChange={handleValueChange}
            onBlur={handlerInputBlur}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
          />
      </div>
    </>
  );
};
