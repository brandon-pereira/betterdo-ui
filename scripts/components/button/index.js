import React from 'react';
import Loader from '../Loader';
import { StyledButton } from './styles';

const Button = ({ children, type, ...props }) => (
    <StyledButton type={type || 'button'} {...props}>
        {props.isLoading && <Loader isVisible={true} size="1rem" />}
        {props.isLoading ? (
            <span>{props.loadingText || 'Loading'}</span>
        ) : (
            <span>{children}</span>
        )}
    </StyledButton>
);

export default Button;
