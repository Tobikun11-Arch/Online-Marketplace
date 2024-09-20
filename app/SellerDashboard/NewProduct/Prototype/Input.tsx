interface InputProps {
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type: string;
    id: string;
    accept: string;
    style: React.CSSProperties;
    required: boolean | undefined;
}

export default function Input({className = '', onChange, type, id, accept, style, ...required} : InputProps) {
  return <input className={className} onChange={onChange} type={type} id={id} accept={accept} style={style} {...required}/>
}
