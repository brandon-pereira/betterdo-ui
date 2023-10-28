import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import _Icon from '@components/Icon';
import _Button from '@components/Button';

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-bottom: 5rem;
`;
export const Icon = styled(_Icon)`
    path {
        stroke-width: 1px;
        fill: ${({ theme }) => theme.colors.body.banner.icon.background};
        stroke: ${({ theme }) => theme.colors.body.banner.icon.stroke};
        ${({ icon }) =>
            icon.name === 'SvgBetterdo' &&
            `
            stroke-width: 6px;
       `}
    }
`;
export const Button = styled(_Button)`
    margin-top: 1rem;
`;

export const BodyCopy = styled.span`
    color: ${({ theme }) => theme.colors.body.banner.color};
    font-size: 1.4rem;
    font-weight: 300;
    max-width: 300px;
    text-align: center;
`;
export const Heading = styled.h2`
    color: ${({ theme }) => theme.colors.body.banner.color};
    font-size: 1.4rem;
    font-weight: 600;
    margin: 2rem 0 0.5rem 0;
    max-width: 300px;
`;
