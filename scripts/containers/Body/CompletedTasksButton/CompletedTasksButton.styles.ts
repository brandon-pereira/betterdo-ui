import styled from 'styled-components';

import _Button from '@components/Button';

export const Button = styled(_Button)`
    margin: 0.5rem auto 1rem;
    text-transform: uppercase;
    user-select: none;
    align-self: start;
    background: rgba(0, 0, 0, 0.1) !important;
    border: 1px solid
        ${({ theme }) => theme.colors.body.completedTasksButton.borderColor};
    box-shadow: none;
    font-size: 1.1rem;
    line-height: 2rem;
    text-shadow: ${({ theme }) =>
        theme.colors.body.completedTasksButton.textShadow};
    color: ${({ theme }) => theme.colors.body.completedTasksButton.color};
    font-weight: 800;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.02),
        0 2px 1px -1px rgba(0, 0, 0, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    padding: 0.2rem 2rem;
    flex-shrink: 0;
`;
