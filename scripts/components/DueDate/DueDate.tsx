import React, { useState } from 'react';
import {
    nextMonday,
    isSameDay,
    startOfToday,
    startOfTomorrow,
    isSameWeek
} from 'date-fns';

import { Container, DayIcon, ItemContainer, ItemLabel } from './DueDate.styles';

import { Input } from '@components/Forms';
import Calendar from '@components/Icon/svgs/calendar.svg';
import Eyedropper from '@components/Icon/svgs/eyedropper.svg';
import Icon from '@components/Icon';
import { getCurrentDay, getTomorrowDay } from '@utilities/customLists';

type Props = {
    onChange(date?: string): void;
    value?: string;
};

function DueDate({ value, onChange }: Props) {
    // create all variables we'll need to use later
    const currentValue = new Date(value || '');
    const today = getTodaysDate();
    const tomorrow = getTomorrowsDate();
    const nextWeek = getNextWeekDate();
    const isToday = isSameDay(today, currentValue);
    const isTomorrow = isSameDay(tomorrow, currentValue);
    const isNextWeek = isSameWeek(nextWeek, currentValue);
    const isSet = !!value;
    const isOther = !isToday && !isTomorrow && !isNextWeek;
    const [isCustomEnabled, setCustomEnabled] = useState(false);
    const isCustomSelected =
        isCustomEnabled || (!isCustomEnabled && isSet && isOther);

    // a light wrapper around the onChange prop for tweaking value
    const _onQuickActionSelect = (newValue: Date) => () => {
        // disable custom if it was selected
        setCustomEnabled(false);
        // if already selected, unselect
        if (isSameDay(currentValue, newValue)) {
            // toggle ui, switch to unset
            onChange(undefined);
        } else {
            // convert to string
            onChange(newValue.toISOString());
        }
    };

    const _onCustomDateSelect = () => {
        // set the due date to undefined triggering the date picker to be shown
        if (!isCustomEnabled) {
            onChange(undefined);
            setCustomEnabled(true);
        } else {
            onChange(undefined);
            setCustomEnabled(false);
        }
    };

    return (
        <>
            <Container>
                <ItemContainer
                    selected={isToday && !isCustomEnabled}
                    onClick={_onQuickActionSelect(today)}
                >
                    <DayIcon>{getCurrentDay()}</DayIcon>
                    <ItemLabel>Today</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isTomorrow && !isCustomEnabled}
                    onClick={_onQuickActionSelect(tomorrow)}
                >
                    <DayIcon>{getTomorrowDay()}</DayIcon>
                    <ItemLabel>Tomorrow</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isNextWeek && !isCustomEnabled}
                    onClick={_onQuickActionSelect(getNextWeekDate())}
                >
                    <Icon size={`30px`} color="currentColor" icon={Calendar} />
                    <ItemLabel>Next Week</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={Boolean(isCustomSelected)}
                    onClick={_onCustomDateSelect}
                >
                    <Icon
                        size={`30px`}
                        color="currentColor"
                        icon={Eyedropper}
                    />
                    <ItemLabel>Custom</ItemLabel>
                </ItemContainer>
            </Container>
            {isCustomSelected && (
                <Input
                    type="date"
                    value={formatDateForInput(value)}
                    onChange={e =>
                        onChange(formatDateValueToDate(e.target.value))
                    }
                />
            )}
        </>
    );
}

const formatDateValueToDate = (value: string) => {
    if (
        // If dueDate is passed in and format is 'YYYY-MM-DD' then
        // we need to create a date obj using CURRENT timezone
        // (strings generate with UTC by default) then pass the UTC
        // version to server (since current timezone to UTC will include timezone)
        value &&
        typeof value === 'string' &&
        // make sure its in 'YYYY-MM-DD' not already ISO string
        value.length === 10
    ) {
        const [year, month, day] = value.split('-');
        return new Date(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day)
        ).toUTCString();
    }
    return '';
};

const formatDateForInput = (value?: string): string => {
    if (!value) return '';
    const date = new Date(value);
    if (value && !isNaN(date.getTime())) {
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
