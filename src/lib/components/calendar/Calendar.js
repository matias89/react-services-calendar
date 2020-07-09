import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CalendarColumn from '../calendarColumn/CalendarColumn';
import CalendarRow from '../calendarRow/CalendarRow';
import CalendarHeader from '../calendarHeader/CalendarHeader';
import CalendarSelectOption from '../calendarSelectOption/CalendarSelectOption';
import { listOfDays } from '../../constants';
import './styles.css';

const CalendarCols = ({
    availability, cols, date, r, firstDayOfMonth, lastDayOfMonth, currentDay, onSelectDay, type, price
}) => {
    const c = [];
    let dayPosition = 0;
    for (let i = r * cols; i < (cols + (r * cols)); i++) {
        const day = i - firstDayOfMonth + 1;
        const dayIsAllowed = availability.includes(dayPosition);
        c.push(
            <CalendarColumn key={i}>
                {
                    i >= firstDayOfMonth
                    && lastDayOfMonth >= day
                    && (
                        <button
                            disabled={currentDay > day || !dayIsAllowed}
                            onClick={() => onSelectDay({date: new Date(date.getFullYear(), date.getMonth(), day)})}
                            type="button"
                        >
                            <div>{day}</div>
                            {currentDay <= day && dayIsAllowed && type === 'perPerson' && <div className="calendar-button-description">${price.child}</div>}
                        </button>
                    )
                }
            </CalendarColumn>
        );
        dayPosition++;
    }
    return c;
};

const Calendar = ({ availableDays, initialDate, onAccept, urlToValidate }) => {
    const [date, setDate] = useState(new Date(initialDate));
    const [showOptionSelector, setShowOptionSelector] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const today = new Date();
    const allowToBack = today < date;
    const handleOnNextMonth = () => {
        const m = date.getMonth() + 1;
        const y = date.getFullYear();
        setDate(new Date(y, m, 1));
    };
    const handleOnPrevMonth = () => {
        if (allowToBack) {
            const m = date.getMonth() - 1;
            const y = date.getFullYear();
            setDate(new Date(y, m, m === today.getMonth() && y === today.getFullYear() ? today.getDate() : 1));
        }
    };
    const onSelectDay = data => {
        setShowOptionSelector(true);
        setSelectedDay(data);
    };
    const onCloseDaySelector = () => {
        setShowOptionSelector(false);
    };
    const onAcceptDate = data => {
        setShowOptionSelector(false);
        onAccept(data);
    }
    const { days, price, type } = availableDays;
    const availability = days.map(day => listOfDays[day.day]);
    const calendar = [];
    const currentDay = date.getDate();
    const firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const firstDayOfMonth = firstOfMonth.getDay();
    const lastDayOfMonth = lastOfMonth.getDate();
    const rows = 5;
    const cols = 7;
    for (let r = 0; r < rows; r++) {
        calendar.push(
            <CalendarRow key={r}>
                <CalendarCols
                    cols={cols}
                    currentDay={currentDay}
                    date={date}
                    firstDayOfMonth={firstDayOfMonth}
                    lastDayOfMonth={lastDayOfMonth}
                    availability={availability}
                    r={r}
                    onSelectDay={onSelectDay}
                    price={price}
                    type={type}
                />
            </CalendarRow>
        );
    }
    return (
        <section className="calendar">
            {showOptionSelector && (
                <CalendarSelectOption
                    onClose={onCloseDaySelector}
                    onAccept={onAcceptDate}
                    selectedDay={selectedDay}
                    data={days.find(item => {
                        return listOfDays[item.day] === selectedDay.date.getDay();
                    })}
                    date={date}
                    urlToValidate={urlToValidate}
                    type={type}
                />
            )}
            <CalendarHeader
                allowToBack={allowToBack}
                date={date}
                handleOnNextMonth={handleOnNextMonth}
                handleOnPrevMonth={handleOnPrevMonth}
            />
            {calendar}
        </section>
    );
};

Calendar.propTypes = {
    availableDays: PropTypes.object,
    urlToValidate: PropTypes.string,
};

Calendar.defaultProps = {
    availableDays: [],
    initialDate: new Date(),
    urlToValidate: null,
}

export default Calendar;