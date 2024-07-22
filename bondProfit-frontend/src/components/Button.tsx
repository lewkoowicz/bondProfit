interface ButtonProps {
    onClick: () => void;
    text: string;
}

const Button = ({ onClick, text }: ButtonProps) => (
    <button className="btn btn-primary mt-4" onClick={onClick}>
        {text}
    </button>
);

export default Button;
