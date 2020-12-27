import React from 'react';
import { Button, Loader } from './styles';

const _Button = ({ children, type, ...props }) => (
    <Button type={type || 'button'} {...props}>
        {props.isLoading && <Loader isVisible={true} size="1rem" />}
        {props.isLoading ? (
            <span>{props.loadingText || 'Loading'}</span>
        ) : (
            <span>{children}</span>
        )}
    </Button>
);

export default _Button;
