import formatNumber from '@utilities/formatNumber';
import React from 'react';
import { CompletedTasksButton } from './Body.styles.js';

function _CompletedTasksButton({ onClick, isLoading, count, hidden }) {
    return (
        <CompletedTasksButton
            hidden={hidden || count === 0}
            isLoading={isLoading}
            color="#999999"
            loaderColor="#888"
            onClick={onClick}
        >
            {formatNumber(count)} completed tasks
        </CompletedTasksButton>
    );
}

export default _CompletedTasksButton;
