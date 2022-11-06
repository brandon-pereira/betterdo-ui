import { StyledButton, Loader } from './Button.styles';

interface Props {
    children: React.ReactNode;
    loaderColor?: string;
    isLoading?: boolean;
    loadingText?: string;
}

const Button = ({
    children,
    type,
    loaderColor,
    loadingText,
    isLoading,
    ...props
}: Props & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <StyledButton type={type || 'button'} {...props}>
        {isLoading && (
            <Loader isVisible={true} color={loaderColor} size="1rem" />
        )}
        {isLoading ? (
            <span>{loadingText || 'Loading'}</span>
        ) : (
            <span>{children}</span>
        )}
    </StyledButton>
);

export default Button;
