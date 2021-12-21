import React from 'react';
import {
    nextMonday,
    isSameDay,
    startOfToday,
    startOfTomorrow,
    isSameWeek
} from 'date-fns';

import { Container, ItemContainer, ItemLabel } from './DueDate.styles';

import { Input } from '@components/Forms';
import Calendar from '@components/Icon/svgs/calendar.svg';
import Eyedropper from '@components/Icon/svgs/eyedropper.svg';
import Icon from '@components/Icon';

type Props = {
    onChange(date?: Date): void;
    value: Date;
};

function DueDate({ value, onChange }: Props) {
    const today = getTodaysDate();
    const tomorrow = getTomorrowsDate();
    const nextWeek = getNextWeekDate();
    const isToday = isSameDay(today, value);
    const isTomorrow = isSameDay(tomorrow, value);
    const isNextWeek = isSameWeek(nextWeek, value);
    const isCustom = !isToday && !isTomorrow && !isNextWeek;

    return (
        <>
            <Container>
                <ItemContainer
                    selected={isToday}
                    onClick={() => onChange(today)}
                >
                    <Icon
                        size={`30px`}
                        color="currentColor"
                        icon={Eyedropper}
                    />
                    <ItemLabel>Today</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isTomorrow}
                    onClick={() => onChange(tomorrow)}
                >
                    <Icon
                        size={`30px`}
                        color="currentColor"
                        icon={Eyedropper}
                    />
                    <ItemLabel>Tomorrow</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isNextWeek}
                    onClick={() => onChange(getNextWeekDate())}
                >
                    <Icon size={`30px`} color="currentColor" icon={Calendar} />
                    <ItemLabel>Next Week</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isCustom}
                    onClick={() => {
                        // set the due date to undefined triggering the date picker to be shown
                        onChange(isCustom ? value : undefined);
                    }}
                >
                    <Icon
                        size={`30px`}
                        color="currentColor"
                        icon={Eyedropper}
                    />
                    <ItemLabel>Custom</ItemLabel>
                </ItemContainer>
            </Container>
            {isCustom && (
                <Input
                    type="date"
                    value={formatDateForInput(value)}
                    onKeyPress={e => onChange(e.target.value)}
                    onChange={e => onChange(e.target.value)}
                />
            )}
        </>
    );
}

const formatDateForInput = date => {
    if (date && !isNaN(date.getTime())) {
        return date.toISOString().substr(0, 10);
    }
    return '';
};

const getTodaysDate = () => {
    return startOfToday();
};

const getTomorrowsDate = () => {
    return startOfTomorrow();
};
const getNextWeekDate = () => {
    return nextMonday(new Date());
};
export default DueDate;
