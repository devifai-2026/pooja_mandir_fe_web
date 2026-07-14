import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

const controlClasses = cn(
  'w-full rounded-xl border-[1.5px] border-gold/35 bg-white/60 px-[18px] py-3.5',
  'font-body text-[1rem] text-indigo-deep outline-none',
  'transition-[border-color,box-shadow] duration-300',
  'focus:border-gold focus:shadow-[0_0_0_4px_rgba(212,175,55,0.15)]',
);

const errorControlClasses = 'border-temple-red';

interface FieldWrapperProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

function FieldWrapper({ label, required, error, children }: FieldWrapperProps) {
  return (
    <div className="mb-5 flex flex-col gap-2">
      <label className="text-[0.9rem] font-semibold text-maroon">
        {label}
        {required && <span className="ml-0.5 text-temple-red">*</span>}
      </label>
      {children}
      {error && <span className="text-[0.8rem] text-temple-red">{error}</span>}
    </div>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export function InputField({ label, required, error, className = '', ...rest }: InputFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <input
        className={cn(controlClasses, error && errorControlClasses, className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  required?: boolean;
  error?: string;
}

export function TextareaField({ label, required, error, className = '', ...rest }: TextareaFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <textarea
        className={cn(controlClasses, 'min-h-24 resize-y', error && errorControlClasses, className)}
        {...rest}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  required?: boolean;
  error?: string;
  options: string[];
  placeholder?: string;
}

export function SelectField({ label, required, error, options, placeholder, className = '', ...rest }: SelectFieldProps) {
  return (
    <FieldWrapper label={label} required={required} error={error}>
      <select
        className={cn(controlClasses, 'cursor-pointer', error && errorControlClasses, className)}
        {...rest}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
