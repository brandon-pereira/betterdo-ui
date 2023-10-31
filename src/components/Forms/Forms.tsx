import { forwardRef } from 'react';
import { styled } from 'styled-components';

const _Input = styled.input<{ $invalid?: boolean }>`
    appearance: none;
    background: ${({ theme }) => theme.colors.forms.input.background};
    width: ${props => props.width || '100%'};
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: none;
    box-shadow: ${({ theme }) => theme.colors.forms.input.boxShadow};
    color: ${({ theme }) => theme.colors.forms.input.color};
    border-radius: 3px;
    outline: none;
    font: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    // hack for chrome to make date picker white
    ${({ theme }) =>
        theme.isDarkMode &&
        `
        &::-webkit-calendar-picker-indicator {
            filter: invert(1);
        }
    `}
    &:focus {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
    &::placeholder {
        color: #aaa;
    }
    ${({ theme, $invalid }) =>
        $invalid &&
        `
      box-shadow: inset 0 0 0 2px ${theme.colors.general.red} !important;
    `};
`;

const Error = styled.div`
    background: ${({ theme }) => theme.colors.general.red};
    color: #fff;
    padding: 0.5rem;
    margin: 1rem 0;
    border-radius: 3px;
`;

const Label = styled.label`
    color: ${({ theme }) => theme.colors.forms.label.color};
    margin: 0 0 0.4rem;
    display: block;
`;

const TextArea = styled.textarea<{ $invalid?: boolean }>`
    box-shadow: ${({ theme }) => theme.colors.forms.input.boxShadow};
    color: ${({ theme }) => theme.colors.forms.input.color};
    background: ${({ theme }) => theme.colors.forms.input.background};
    font-family: inherit;
    font-size: 1rem;
    margin-bottom: 1rem;
    resize: none;
    width: 100%;
    box-sizing: border-box;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 3px;
    outline: none;
    &:focus {
        box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.general.blue};
    }
    &::placeholder {
        color: #aaa;
    }
    ${({ theme, $invalid }) =>
        $invalid &&
        `
    box-shadow: inset 0 0 0 2px ${theme.colors.general.red} !important;
    `};
`;

const Form = ({
    children,
    errorMessage,
    ...props
}: {
    children: React.ReactNode;
    errorMessage?: string;
} & React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>) => (
    <form {...props}>
        {errorMessage ? <Error>{errorMessage}</Error> : null}
        {children}
    </form>
);

type InputProps = {
    invalid?: boolean;
};
const Input = forwardRef<
    HTMLInputElement,
    InputProps &
        React.DetailedHTMLProps<
            React.InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >
>(({ placeholder, invalid, ...props }, ref) => (
    <_Input
        {...props}
        ref={ref}
        aria-label={placeholder}
        placeholder={placeholder}
        $invalid={invalid}
    />
));
Input.displayName = 'Input';

export { Input, Label, Form, Error, TextArea };
