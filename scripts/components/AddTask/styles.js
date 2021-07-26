import styled from 'styled-components';
import { Input as FormInput } from '../forms';

export const Container = styled.form`
    padding: 1rem 1rem 0;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`;

export const Input = styled(FormInput)`
    margin: 0;
    border-radius: 50px;
`;
