"use client";
import ReactSelect from "react-select";
interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

const Select = ({ label, onChange, options, disabled, value }: SelectProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
          }}
          classNames={{
            control: () =>
              "text-sm dark:bg-slate-700 dark:border-slate-800 dark:focus:ring-sky-800",
            menu: () => "dark:bg-slate-700 dark:text-gray-200 ",
            option: () => "dark:hover:bg-slate-800 dark:bg-slate-700",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
