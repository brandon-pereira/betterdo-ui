import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from './CompletedTasksButton.styles';

import formatNumber from '@utilities/formatNumber';

const variants = {
    entering: {
        y: -50,
        opacity: 0
    },
    entered: {
        y: 0,
        opacity: 1
    },
    exiting: {
        position: 'absolute',
        y: 50,
        opacity: 0
    }
};

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isLoading?: boolean;
    count?: number;
    hidden: boolean;
};

function CompletedTasksButton({ onClick, isLoading, count, hidden }: Props) {
    if (!count) {
        return null;
    }
    return (
        <Button
            hidden={hidden || count === 0}
            isLoading={isLoading}
            loaderColor="#888"
            onClick={onClick}
        >
            <AnimatePresence initial={false}>
                <motion.span
                    style={{ display: 'inline-block' }}
                    // @ts-expect-error position is supported in browser but not types
                    variants={variants}
                    initial="entering"
                    animate="entered"
                    exit="exiting"
                    key={count}
                    transition={{
                        type: 'linear',
                        duration: 1
                    }}
                >
                    {formatNumber(count)}
                </motion.span>
            </AnimatePresence>
            {' completed tasks'}
        </Button>
    );
}

export default CompletedTasksButton;
