import React from 'react';
import { useField } from 'formik';

interface FieldProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}

export default function Field({
  label,
  name,
  placeholder = '',
  type = 'text',
  required = false,
}: FieldProps) {

  const [field, meta, helpers] = useField(name);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        {...field}
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />
      {meta.touched && meta.error ? (
        <p className="text-sm text-red-500 h-[14px] block">{meta.error}</p>
      ) : null}
    </div>
  );
}
