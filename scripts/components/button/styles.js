import styled from 'styled-components';
import _Loader from '../Loader';
import { COLORS } from '../../constants';

export const Button = styled.button.attrs(props => ({
    style: {
        backgroundColor: props.color || COLORS.blue
    }
}))`
    border: none;
    color: #fff;
    border-radius: 50px;
    padding: ${props => (props.small ? '0.4rem 0.5rem' : '1rem 2rem')};
    font: inherit;
    background-image: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
    font-size: ${props => (props.small ? '0.6rem' : '1rem')};
    cursor: pointer;
    position: relative;
    z-index: 0;
    overflow: hidden;
    outline: none;
    display: ${({ hidden }) => (hidden ? 'none' : 'inline-flex')};
    align-items: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    &:before {
        content: '';
        opacity: 0;
        transition: opacity 0.2s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    &:hover:before {
        opacity: 1;
    }
    &:focus-visible {
        box-shadow: 0 0 0 2px ${COLORS.blue};
    }
    ${props =>
        props.isLoading &&
        `
            pointer-events: none;
            &:before {
                opacity: 1;
                background: rgba(255, 255, 255, 0.3);
            }
        `};
`;

export const Loader = styled(_Loader)`
    margin-right: 1rem;
`;
export const Text = styled.span`
    position: relative;
    z-index: 1;
`;
