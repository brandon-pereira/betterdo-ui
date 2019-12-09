import styled from 'styled-components';

export const Container = styled.form`
    padding: 1rem 1rem 0;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
    input {
        margin: 0;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    }
`;
