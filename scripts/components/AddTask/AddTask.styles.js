import styled from 'styled-components';

import { Input as FormInput } from '@components/Forms';

export const Container = styled.form`
    padding: 0 1rem;
    margin-bottom: 0.8rem;
    display: ${({ hidden }) => (hidden ? 'none' : 'block')};
`;

export const Input = styled(FormInput)`
    margin: 0;
    border-radius: 50px;
`;
