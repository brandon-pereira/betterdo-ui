import { styled } from 'styled-components';

import _Button from '@components/Button';

export const Header = styled.h2`
    margin: 0 0 0.3rem;
`;
export const Description = styled.p`
    margin: 0;
`;
export const CopyContainer = styled.div`
    flex: 1;
`;
export const ButtonContainer = styled.div`
    display: flex;
`;
export const Button = styled(_Button)`
    padding: 1rem;
`;
export const SecondaryButton = styled(Button)`
    box-shadow: none;
    background: none;
    order: 2;
    &:before {
        display: none;
    }
`;
export const Container = styled.div`
    background: ${({ theme }) => theme.colors.general.blue};
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    padding: 1rem;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
    ${Button} {
        padding: 1rem;
        margin-top: 1rem;
        margin-right: 0.5rem;
    }
    ${({ theme }) => theme.queries.medium} {
        display: flex;
        justify-content: center;
        align-items: center;
        ${Button} {
            margin: 0;
            order: 2;
            margin-left: 0.5rem;
            margin-right: 0;
        }
        ${SecondaryButton} {
            order: 1;
        }
    }
`;
