import styled from 'styled-components';
import Button from '@components/Button';
import Icon from '@components/icon';
import _Loader from '@components/Loader';
import Hamburger from '@components/hamburger';
import { QUERIES } from '../../constants';

export { Icon, Hamburger, Button };

export const Loader = styled(_Loader)``;

export const Container = styled.header`
    grid-row: 1 / 1;
    grid-column: 2 / 3;
    background-color: ${({ color, theme }) =>
        color || theme.colors.defaultList};
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    box-shadow: inset 0 -1px rgba(0, 0, 0, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 0.8rem 0 0;
    overflow: hidden;
    ${Hamburger} {
        padding: 0 0.5rem 0 0.8rem;
        
    }
    ${Loader} {
        filter: drop-shadow(1px 1px rgba(0,0,0,.5))
    }
    ${props =>
        props.mobileNavVisible &&
        `
        grid-row: 3;
    `}
    @media ${QUERIES.medium} {
        grid-row: 1;
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
