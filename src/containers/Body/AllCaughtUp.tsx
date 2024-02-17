import { styled } from 'styled-components';
import BaseReactCanvasConfetti from 'react-canvas-confetti';
import { colord } from 'colord';
import { useEffect, useRef, useState } from 'react';

import BetterDo from '@components/Icon/svgs/betterdo.svg';
import BaseBanner from '@components/Banner';
import useCurrentListId from '@hooks/useCurrentListId';
import useListDetails from '@hooks/useListDetails';

const Wrapper = styled.div`
    position: relative;
    flex: 1;
    overflow: hidden;
`;

const Banner = styled(BaseBanner)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 5rem 0;
`;

const ReactCanvasConfetti = styled(BaseReactCanvasConfetti)`
    width: 100%;
    height: 100vh;
`;

export default function AllCaughtUpBanner() {
    const currentListId = useCurrentListId();
    const { error, list } = useListDetails(currentListId);
    const prevTaskLength = useRef(list?.tasks?.length || 0);
    const prevListId = useRef(list?._id);
    const [triggerFire, setState] = useState(0);

    // Essentially, only fire the animation if
    // the list hasn't changed and tasks went from not 0 to 0
    useEffect(() => {
        if (
            prevListId.current === list._id &&
            list?.tasks?.length === 0 &&
            prevTaskLength.current !== 0
        ) {
            setState(s => ++s);
        }
        prevListId.current = list?._id;
        prevTaskLength.current = list?.tasks?.length || 0;
    }, [list]);

    if (list.tasks?.length !== 0 || error) {
        return null;
    }

    return (
        <Wrapper>
            <ReactCanvasConfetti
                colors={
                    list?.color && list?.type === 'default'
                        ? [
                              list.color,
                              colord(list.color).darken(0.5).toHex(),
                              colord(list.color).lighten(0.5).toHex()
                          ]
                        : ['#228BE6', '#66A80F', '#F03E3E', '#FAB005']
                }
                particleCount={50}
                shapes={['square']}
                spread={80}
                scalar={1.8}
                fire={triggerFire}
            />
            <Banner icon={BetterDo} body="You're all caught up!" />
        </Wrapper>
    );
}
