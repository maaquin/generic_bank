export const Textarea = ({
    field,
    label,
    value,
    onChangeHandler,
    type,
    placeholder,
    className,
    showErrorMessage,
    validationMessage,
    onBlurHandler,
    textarea
}) => {
  const handleValueChange = (event) => {
    onChangeHandler(event.target.value, field)
  }

  const handlerInputBlur = (event) => {
    onBlurHandler(event.target.value, field)
  }
  return (
    <>
      <div className="auth-form-label">
        <span>{label}</span>
      </div>
      <div>
        {
            <textarea 
              type={type}
              value={value}
              onChange={handleValueChange}
              onBlur={handlerInputBlur}
              rows={5}
              style={{maxWidth: '400px'}}
              placeholder={placeholder}
              className={className}
            />
        }
        <span className="auth-form-validation-message">
          {
            showErrorMessage && validationMessage
          }
        </span>
      </div>
    </>
  )
}