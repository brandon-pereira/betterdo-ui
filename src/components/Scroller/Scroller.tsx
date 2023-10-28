import { styled } from 'styled-components';
import SimpleBar from 'simplebar-react';

export default styled(SimpleBar)`
    display: flex;
    height: 100%;
    width: 100%;
    .simplebar-content {
        height: 100%;
    }
    .simplebar-scrollbar::before {
        background: #fff;
    }
`;
