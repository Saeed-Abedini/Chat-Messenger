"use client";
import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const Input = ({
  label,
  errors,
  id,
  disabled,
  required,
  type,
  register,
}: InputProps) => {
  return (
    <div>
      <label
        className=" block text-sm font-medium leading-6 text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(
            `form-input block w-full rounded-md border-0 py-1.5 text-gray-900  dark:text-white dark:bg-slate-700 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-sky-600
            dark:focus:bg-slate-700 dark:focus:ring-sky-800 sm:text-sm sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
