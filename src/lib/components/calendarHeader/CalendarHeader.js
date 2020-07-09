import React from 'react';
import PropTypes from 'prop-types';
import { months } from '../../constants';
import './styles.css';

const CalendarHeader = ({
    allowToBack, date, handleOnNextMonth, handleOnPrevMonth
}) => {
    return (
        <header className="calendar-header">
            <div className="calendar-header-controls">
                <div className="prev">
                    <button type="button" disabled={!allowToBack} onClick={handleOnPrevMonth}>{`<`}</button>
                </div>
                <div>
                    <h2>{date.getFullYear()}</h2>
                    <h3>{months[date.getMonth()]}</h3>
                </div>
                <div className="next">
                    <button type="button" onClick={handleOnNextMonth}>{`>`}</button>
                </div>
            </div>
            <div className="calendar-header-days">
                <div>Do</div>
                <div>Lu</div>
                <div>Ma</div>
                <div>Mi</div>
                <div>Ju</div>
                <div>Vi</div>
                <div>Sa</div>
            </div>
        </header>
    );
}

CalendarHeader.propTypes = {
    handleOnNextMonth: PropTypes.func,
    handleOnPrevMonth: PropTypes.func,
};

export default CalendarHeader;