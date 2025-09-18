
import React from 'react';

type FormFieldProps = {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
};

const commonInputStyle = "w-full bg-gray-800 text-white p-3 border-2 border-dashed border-cyan-400 rounded-md focus:outline-none focus:border-solid focus:border-pink-500 transition-all duration-300 transform hover:scale-[1.02] focus:scale-[1.02] shadow-[4px_4px_0px_0px_#f472b6]";

export const FormField: React.FC<FormFieldProps> = ({ id, label, type, value, onChange, required = true, placeholder, options, min }) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-xl text-cyan-400 mb-2">{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value as string}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={4}
          className={commonInputStyle}
        />
      ) : type === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className={commonInputStyle}
        >
          <option value="" disabled>Pilih...</option>
          {options?.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          min={min}
          className={commonInputStyle}
        />
      )}
    </div>
  );
};
