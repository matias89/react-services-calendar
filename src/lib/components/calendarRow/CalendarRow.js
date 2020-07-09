import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const CalendarRow = ({children}) => {
    return (
        <div className="calendar-row">{children}</div>
    );
};

CalendarRow.propTypes = {
    children: PropTypes.node
};

export default CalendarRow;