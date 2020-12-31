import formatNumber from '@utilities/formatNumber';
import React from 'react';
import { CompletedTasksButton } from './Body.styles';

function _CompletedTasksButton({ onClick, isLoading, count, hidden }) {
    return (
        <CompletedTasksButton
            hidden={hidden || count === 0}
            isLoading={isLoading}
            color="#999999"
            onClick={onClick}
        >
            {formatNumber(count)} completed tasks
        </CompletedTasksButton>
    );
}

export default _CompletedTasksButton;
