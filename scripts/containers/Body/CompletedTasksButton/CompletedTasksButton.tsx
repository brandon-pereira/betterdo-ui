import React, { useState, useEffect } from 'react';

import {
    Button,
    CurrentCounter,
    PrevCounter,
    NextCounter,
    CounterContainer
} from './CompletedTasksButton.styles';

import formatNumber from '@utilities/formatNumber';

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    count: number;
    hidden: boolean;
};

function CompletedTasksButton({ onClick, isLoading, count, hidden }: Props) {
    const [prevCount, setPrevCount] = useState<number | null>(null);
    const [currentCount, setCurrentCount] = useState<number>(count);

    useEffect(() => {
        if (count !== currentCount) {
            setPrevCount(currentCount);
            setCurrentCount(count);
            setTimeout(() => {
                setPrevCount(null);
            }, 600);
        }
    }, [count, currentCount]);

    return (
        <Button
            hidden={hidden || count === 0}
            isLoading={isLoading}
            color="#999999"
            loaderColor="#888"
            onClick={onClick}
        >
            <CounterContainer>
                <PrevCounter aria-hidden="true" isAnimating={!!prevCount}>
                    {formatNumber(prevCount || currentCount)}
                </PrevCounter>
                <NextCounter aria-hidden="true" isAnimating={!!prevCount}>
                    {formatNumber(currentCount)}
                </NextCounter>
                <CurrentCounter isAnimating={!!prevCount}>
                    {formatNumber(currentCount)}
                </CurrentCounter>
            </CounterContainer>
            {' completed tasks'}
        </Button>
    );
}

export default CompletedTasksButton;
