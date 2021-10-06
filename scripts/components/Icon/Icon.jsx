import React from 'react';

import { IconContainer } from './Icon.styles.js';

function Icon({ children, onClick, icon, className, ...props }) {
    return (
        <IconContainer
            {...props}
            as={onClick ? 'button' : 'div'}
            className={className}
            onClick={onClick ? e => onClick(e) : null}
        >
            {React.createElement(icon, {
                title: children,
                'aria-describedby': children
            })}
        </IconContainer>
    );
}

export default Icon;
