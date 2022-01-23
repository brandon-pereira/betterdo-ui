import styled from 'styled-components';

import { Input as FormInput } from '@components/Forms';

export const Input = styled(FormInput)`
    margin: 0;
    border-radius: 50px;
`;

export const Container = styled.form<{ isHidden?: boolean }>`
    padding: 1rem 1rem 0.8rem;
    ${({ isHidden }) =>
        isHidden &&
        `
        margin-bottom: 1rem;
        padding: 0;
        ${Input} {
            display: none;
        }
    `}
`;
