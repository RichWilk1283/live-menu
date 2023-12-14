import React from 'react';

export default function FormGroup({
  label,
  name = "",
  type = "text",
  className = "",
  placeholder = "",
  errorMessage = "",
  ...props
}) {
  return (
    <div className={`${className}`}>
      <label>
        {label}
      </label>
      {
        type == "textarea" ?
        <textarea name={name} placeholder={placeholder} type={type} className="border border-gray-600 rounded-md p-2" {...props}></textarea>
        :
        <input name={name} placeholder={placeholder} type={type} className="border border-gray-600 rounded-md p-2" {...props} />
      }
      {errorMessage && <span className="text-red-500 text-sm">{errorMessage}</span>}
    </div>
  )
}
