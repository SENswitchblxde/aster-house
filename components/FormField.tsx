import type { ReactNode } from 'react';

const fieldBase =
  'w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3.5 font-text text-[1.05rem] text-ink transition-colors duration-300 placeholder:text-ink-faint/70 focus:border-burgundy focus:outline-none focus:ring-0';

export function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="eyebrow flex items-center gap-2 text-ink-faint">
      <span>{children}</span>
      {optional && <span className="normal-case tracking-normal text-ink-faint/70">(optional)</span>}
    </label>
  );
}

export function TextField({
  id,
  name,
  label,
  type = 'text',
  required,
  optional,
  placeholder,
  autoComplete,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={`${fieldBase} mt-2`}
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 font-text text-[0.85rem] text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  id,
  name,
  label,
  required,
  rows = 5,
  placeholder,
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`${fieldBase} mt-2 resize-y`}
      />
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  options,
  value,
  onChange,
  required,
  optional,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className={`${fieldBase} mt-2 appearance-none rounded-none bg-[length:12px] bg-[right_0.25rem_center] bg-no-repeat pr-8`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23641F2A' stroke-width='1.5'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">Select&hellip;</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function RadioGroup({
  legend,
  name,
  options,
  defaultValue,
}: {
  legend: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <fieldset>
      <legend className="eyebrow text-ink-faint">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
        {options.map((o) => (
          <label key={o} className="group flex cursor-pointer items-center gap-3">
            <input
              type="radio"
              name={name}
              value={o}
              defaultChecked={defaultValue === o}
              className="peer h-4 w-4 appearance-none rounded-full border border-ink/35 transition-colors checked:border-burgundy checked:bg-burgundy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-burgundy"
            />
            <span className="font-text text-[1rem] text-ink-soft peer-checked:text-ink">{o}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function FileField({
  id,
  name,
  label,
  hint,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} optional>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type="file"
        accept=".doc,.docx,.pdf,.rtf,.txt,.odt"
        aria-describedby={hint ? `${id}-hint` : undefined}
        className="mt-3 block w-full font-text text-[0.95rem] text-ink-soft file:mr-4 file:cursor-pointer file:border file:border-ink/25 file:bg-transparent file:px-5 file:py-3 file:font-text file:text-[0.7rem] file:uppercase file:tracking-[0.16em] file:text-ink hover:file:border-ink"
      />
      {hint && (
        <p id={`${id}-hint`} className="mt-2 font-text text-[0.85rem] text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  );
}
