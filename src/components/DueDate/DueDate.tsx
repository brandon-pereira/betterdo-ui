import { useRef } from 'react';
import {
    nextMonday,
    isSameDay,
    startOfToday,
    startOfTomorrow,
    isSameWeek
} from 'date-fns';

import {
    Container,
    DayIcon,
    ItemContainer,
    ItemLabel,
    DueDateInput
} from './DueDate.styles';

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
    const dateInputRef = useRef<HTMLInputElement>(null);
    const today = getTodaysDate();
    const tomorrow = getTomorrowsDate();
    const nextWeek = getNextWeekDate();
    const isToday = isSameDay(today, currentValue);
    const isTomorrow = isSameDay(tomorrow, currentValue);
    const isNextWeek = !isTomorrow && isSameWeek(nextWeek, currentValue);
    const isSet = !!value;
    const isOther = isSet && !isToday && !isTomorrow && !isNextWeek;

    // a light wrapper around the onChange prop for tweaking value
    const _onQuickActionSelect = (newValue: Date) => () => {
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
        dateInputRef.current?.showPicker();
    };

    return (
        <>
            <Container>
                <ItemContainer
                    selected={isToday}
                    onClick={_onQuickActionSelect(today)}
                >
                    <DayIcon>{getCurrentDay()}</DayIcon>
                    <ItemLabel>Today</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isTomorrow}
                    onClick={_onQuickActionSelect(tomorrow)}
                >
                    <DayIcon>{getTomorrowDay()}</DayIcon>
                    <ItemLabel>Tomorrow</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={isNextWeek}
                    onClick={_onQuickActionSelect(getNextWeekDate())}
                >
                    <Icon size={`30px`} color="currentColor" icon={Calendar} />
                    <ItemLabel>Next Week</ItemLabel>
                </ItemContainer>
                <ItemContainer
                    selected={Boolean(isOther)}
                    onClick={_onCustomDateSelect}
                >
                    <DueDateInput
                        ref={dateInputRef}
                        type="date"
                        value={formatDateForInput(value)}
                        onChange={e =>
                            onChange(formatDateValueToDate(e.target.value))
                        }
                    />
                    <Icon
                        size={`30px`}
                        color="currentColor"
                        icon={Eyedropper}
                    />
                    <ItemLabel>Custom</ItemLabel>
                </ItemContainer>
            </Container>
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
    return nextMonday(startOfToday());
};
export default DueDate;
