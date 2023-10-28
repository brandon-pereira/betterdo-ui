import { styled } from 'styled-components';

import _Icon from '@components/Icon';

export const Icon = styled(_Icon)``;

export const CustomListsContainer = styled.ol`
    position: relative;
    padding: 0;
    margin: 0 -1rem;
    border-radius: 1rem;
    background: ${({ theme }) => theme.colors.navigation.background};
`;
export const CustomListItem = styled.li`
    color: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 1px rgba(255, 255, 255, 0.15);
    padding: 0 0.5rem;
`;
export const Title = styled.span`
    flex: 1;
    padding: 1rem 1rem 1rem 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
export const IconHolder = styled.div`
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    ${Icon} {
        filter: drop-shadow(0 1px #000);
    }
`;
