import { styled } from 'styled-components';

import useCurrentListId from '@hooks/useCurrentListId';
import useLists from '@hooks/useLists';
import useSwipe from '@hooks/useSwipe';
import useSwitchList from '@hooks/useSwitchList';

const Bar = styled.div`
    height: 4px;
    width: 100%;
    background: currentColor;
    border-radius: 3px;
    transition:
        transform 0.4s,
        opacity 0.2s;
    &:nth-of-type(1) {
        transform-origin: top left;
    }
    &:nth-of-type(3) {
        transform-origin: bottom left;
    }
`;

const ClickContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const BarContainer = styled.div<{ open: boolean }>`
    flex-direction: column;
    justify-content: space-between;
    height: 1.5rem;
    width: 2rem;
    filter: drop-shadow(0 1px rgba(0, 0, 0, 0.5));
    display: ${props => (props.hidden ? 'none' : 'flex')};
    ${props =>
        props.open &&
        `
            ${Bar}:nth-of-type(1) {
                transform: rotate(45deg);
            }
            ${Bar}:nth-of-type(2) {
                opacity: 0;
            }
            ${Bar}:nth-of-type(3) {
                transform: rotate(-45deg);
            }
    `}
`;

interface Props {
    className?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    open: boolean;
}

const Hamburger = ({ open, className, onClick }: Props) => {
    const { lists } = useLists();
    const currentListId = useCurrentListId();
    const switchList = useSwitchList();
    const currentListIndex = lists.findIndex(l => l._id === currentListId);
    const nextList =
        currentListIndex + 1 < lists.length
            ? lists[currentListIndex + 1]
            : lists[0];
    const prevList =
        currentListIndex - 1 >= 0
            ? lists[currentListIndex - 1]
            : lists[lists.length - 1];
    const swiper = useSwipe({
        onSwipedLeft: () => switchList(nextList),
        onSwipedRight: () => switchList(prevList)
    });

    return (
        <ClickContainer onClick={onClick} className={className} {...swiper}>
            <BarContainer open={open}>
                <Bar />
                <Bar />
                <Bar />
            </BarContainer>
        </ClickContainer>
    );
};

export default Hamburger;
