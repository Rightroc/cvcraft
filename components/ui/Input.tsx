interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;

  register?: any;
  error?: string;

  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  disabled?: boolean;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
  value,
  onChange,
  disabled,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register}
        {...(value !== undefined ? { value } : {})}
        {...(onChange ? { onChange } : {})}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-gray-100"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}