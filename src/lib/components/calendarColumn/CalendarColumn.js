import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const CalendarColumn = ({children}) => {
    return (
        <div className="calendar-column">{children}</div>
    );
};

CalendarColumn.propTypes = {
    children: PropTypes.node
};

export default CalendarColumn;