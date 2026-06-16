import React from 'react'

interface FormInputProps {
  type?: 'text' | 'tel'
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  isTextarea?: boolean
  rows?: number
  required?: boolean
}

export default function FormInput({
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  isTextarea = false,
  rows = 4,
  required = true,
}: FormInputProps) {
  const baseProps = {
    name,
    placeholder,
    value,
    onChange,
    required,
    className: 'form-input',
    id: `form-${name}`,
  }

  if (isTextarea) {
    return (
      <textarea
        {...baseProps}
        rows={rows}
        style={{ resize: 'vertical' }}
      />
    )
  }

  return (
    <input
      {...baseProps}
      type={type}
      pattern={type === 'tel' ? '[0-9]{10}' : undefined}
      title={type === 'tel' ? 'Please enter a 10-digit Indian number' : undefined}
    />
  )
}
