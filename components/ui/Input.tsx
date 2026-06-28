interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: string;
}

export default function Input({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className="w-full rounded-lg border p-3 outline-none focus:border-blue-600"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}