import styled from 'styled-components';
import { TextArea } from '@components/forms';
// import Subtasks from '@components/subtasks';
// import { COLORS } from '../../constants';
import _ProfilePic from '@components/profilePic';
import _Modal from '@components/Modal';

export const Modal = styled(_Modal)`
    background: #eee;
    transform: none;
    right: 0;
    top: 0;
    left: auto;
    bottom: 0;
    &[data-betterdo-modal-arrow] {
        display: none;
    }
`;

export const Container = styled.div``;
export const Block = styled.div``;
export const ProfilePic = styled(_ProfilePic)``;
export const Content = styled.div`
    padding: 1rem;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
`;
export const CreatorBlock = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5rem;
    background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.1));
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2),
        inset 0 2px rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 3px;
    ${ProfilePic} {
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
    ${Block} {
        flex: 1;
        padding: 0 1rem;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    transition: all 0.5s;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    right: 0;
    background: linear-gradient(
        rgba(255, 255, 255, 0.6),
        rgba(255, 255, 255, 0.9)
    );
    box-shadow: 0 -1px rgba(0, 0, 0, 0.1);
`;
export const Notes = styled(TextArea)`
    min-height: 10rem;
`;
