import React, { createElement } from 'react';

import { IconContainer } from './Icon.styles.js';

interface Props {
    children?: string;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    className?: string;
    color?: string;
}

function Icon({ children, onClick, icon, className, color, ...props }: Props) {
    return (
        <IconContainer
            {...props}
            color={color}
            as={onClick ? 'button' : 'div'}
            className={className}
            onClick={onClick}
        >
            {createElement(icon, {
                'aria-describedby': children
            })}
        </IconContainer>
    );
}

export default Icon;
