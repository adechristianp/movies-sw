import './styles.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    testId?: string;
    onClick?(): any;
}

const DefaultButton: React.FC<ButtonProps> = ({ label, onClick, testId = 'button', ...props  }) => {
    return (
        <button data-testid={testId} className='button' onClick={onClick} {...props}>
            {label}
        </button>
    );
};

export default DefaultButton;
