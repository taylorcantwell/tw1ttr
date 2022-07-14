import { useField } from 'remix-validated-form';

type ValidatedInputProps = {
  name: string;
  className?: string;
  label?: string;
};

export function ValidatedInput({
  name,
  label,
  className,
  placeholder,
  defaultValue,
}: React.HTMLAttributes<HTMLInputElement> & ValidatedInputProps) {
  const { error, getInputProps } = useField(name);
  return (
    <div className="flex flex-col">
      {label ? (
        <label
          htmlFor={name}
          className="mt-5 mb-1"
        >
          {label}
        </label>
      ) : null}
      <input
        defaultValue={defaultValue}
        required
        placeholder={placeholder}
        className={className}
        {...getInputProps({ id: name })}
      />
      <span className="h-2 mt-1 text-red-700">{error}</span>
    </div>
  );
}
