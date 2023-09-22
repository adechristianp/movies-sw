import './styles.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

const DefaultButton: React.FC<ButtonProps> = ({ label, ...props }) => {
    return (
        <button className='button' {...props}>
            {label}
        </button>
    );
};

export default DefaultButton;
