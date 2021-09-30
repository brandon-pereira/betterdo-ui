import styled from 'styled-components';
import Button from '@components/Button';
import Icon from '@components/Icon';
import _Loader from '@components/Loader';
import _Hamburger from '@components/Hamburger';
import { DEFAULT_LIST_COLOR, QUERIES } from '../../constants';

export { Icon, Button };

export const Hamburger = styled(_Hamburger)`
    ${({ hidden }) =>
        hidden &&
        `
        display: none;
    `}
`;
export const Loader = styled(_Loader)`
    margin-left: 0.5rem;
`;

export const Container = styled.header`
    grid-row: 3;
    grid-column: 1;
    background-color: ${({ color }) => color || DEFAULT_LIST_COLOR};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 0.8rem 0 0;
    overflow: hidden;
    transform: translateY(0%);
    transition: background 0.6s;
    ${Hamburger} {
        padding: 0 0.5rem 0 0.8rem;
    }
    ${Loader} {
        filter: drop-shadow(1px 1px rgba(0, 0, 0, 0.5));
    }
    @media ${QUERIES.medium} {
        grid-row: 1;
        grid-column: 2;
        ${Hamburger} {
            display: none;
        }
    }
`;

export const SettingsButton = styled(Button)`
    margin-left: 0.35rem;
    border-radius: 20px;
    user-select: none;
    padding: 0.8rem 1.1rem;
    box-shadow: 0px 0px 0px 1px inset rgba(0, 0, 0, 0.8),
        0px 2px inset rgba(255, 255, 255, 0.1), 0 1px rgba(255, 255, 255, 0.3);
`;
export const Title = styled.h2`
    flex: 1;
    font-size: 1.8rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 4rem;
    margin: 0;
`;
