import React from 'react';

export const Select = ({
  field,
  label,
  value,
  onChangeHandler,
  options,
  className,
  showErrorMessage,
  validationMessage,
  onBlurHandler,
}) => {
  const handleValueChange = (event) => {
    onChangeHandler(event.target.value, field);
  };

  const handleSelectBlur = (event) => {
    if (onBlurHandler) {
      onBlurHandler(event.target.value, field);
    }
  };

  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      <div>
        <select
          value={value}
          onChange={handleValueChange}
          onBlur={handleSelectBlur}
          className={className}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="auth-form-validation-message">
          {showErrorMessage && validationMessage}
        </span>
      </div>
    </>
  );
};