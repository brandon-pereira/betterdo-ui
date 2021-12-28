import React, { useState, useEffect } from 'react';

import {
    CompletedTasksButton,
    CurrentCounter,
    PrevCounter,
    NextCounter,
    CounterContainer
} from './Body.styles.js';

import formatNumber from '@utilities/formatNumber';

function _CompletedTasksButton({ onClick, isLoading, count, hidden }) {
    const [prevCount, setPrevCount] = useState(null);
    const [currentCount, setCurrentCount] = useState(count);

    useEffect(() => {
        if (count !== currentCount) {
            setPrevCount(currentCount);
            setCurrentCount(count);
            const timeout = setTimeout(() => {
                setPrevCount(null);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [count, currentCount]);

    return (
        <CompletedTasksButton
            hidden={hidden || count === 0}
            isLoading={isLoading}
            color="#999999"
            loaderColor="#888"
            onClick={onClick}
        >
            <CounterContainer>
                <PrevCounter aria-hidden="true" isAnimating={prevCount}>
                    {formatNumber(prevCount)}
                </PrevCounter>
                <NextCounter aria-hidden="true" isAnimating={prevCount}>
                    {formatNumber(currentCount)}
                </NextCounter>
                <CurrentCounter isAnimating={prevCount}>
                    {formatNumber(currentCount)}
                </CurrentCounter>
            </CounterContainer>
            {' completed tasks'}
        </CompletedTasksButton>
    );
}

export default _CompletedTasksButton;
