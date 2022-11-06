import { createElement } from 'react';

import { IconContainer } from './Icon.styles';

interface Props {
    children?: string;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    className?: string;
    color?: string;
    size?: string;
}

function Icon({ children, onClick, icon, className, color, ...props }: Props) {
    return (
        <IconContainer
            {...props}
            color={color}
            as={onClick ? 'button' : 'div'}
            className={className}
            onClick={onClick}
            // add type button so it doesn't default to submit
            type={onClick ? 'button' : undefined}
        >
            {createElement(icon, {
                'aria-describedby': children
            })}
        </IconContainer>
    );
}

export default Icon;
