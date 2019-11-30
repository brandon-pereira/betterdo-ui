import React from 'react';
import { StyledButton } from './styles';
import Loader from '../loader';

const Button = ({ children, type, ...props }) => (
    <StyledButton type={type || 'button'} {...props}>
        {props.isLoading && <Loader isLoading={true} size="1rem" />}
        {props.isLoading ? (
            <span>{props.loadingText || 'Loading'}</span>
        ) : (
            <span>{children}</span>
        )}
    </StyledButton>
);

export default Button;
