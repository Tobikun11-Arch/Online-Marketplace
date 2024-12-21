interface InputProps {
    className?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    id?: string;
    accept?: string;
    style?: React.CSSProperties;
    required?: boolean | undefined;
    placeholder?: string;
    value?: string | string[];
    pattern?: string;
    title?: string;
}

export default function Input({className = '', onChange, type, id, accept, style, placeholder = '', value, pattern, title, ...required} : InputProps) {
  return <input className={className} onChange={onChange} type={type} id={id} accept={accept} pattern={pattern} title={title} style={style} placeholder={placeholder} value={value} multiple {...required}/>
}
