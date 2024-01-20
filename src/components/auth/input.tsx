type InputProps = {
  label: string;
  type?: string;
  id: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Input({
  label,
  id,
  placeholder,
  value,
  type = 'text',
  handleChange,
}: InputProps) {
  return (
    <label htmlFor={id} className=''>
      <span className='sr-only'>{label}</span>
      <input
        name={id}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className='w-full border-b border-black/30 py-1 pt-3 focus-within:outline-none focus:border-primary/70 focus:shadow-lg px-3 placeholder:capitalize bg-inherit'
      />
    </label>
  );
}
