export interface FormProps {
  values: Field[];
}

export interface Field {
  label: string;
  inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
}
