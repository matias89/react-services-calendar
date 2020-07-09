import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import './styles.css';

const CalendarSelectOption = ({
    onClose, onAccept, selectedDay, data, date, type, urlToValidate
}) => {
    const [itemSelected, setItemSelected] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const handleOnSelectItem = event => {
        setShowError(false);
        event.persist();
        const { target: { value }} = event;
        const info = {
            date: date.toISOString().split('T')[0],
            ...data.hours[value]
        };
        if (urlToValidate) {
            // Make fetch
            setShowLoader(true);
            window.fetch(urlToValidate)
                .then(response => {
                    if (response.status === '200') {
                        setShowLoader(false);
                        setItemSelected(info);
                    } else {
                        setShowLoader(false);
                        setShowError(true);
                    }
                });
        } else {
            setItemSelected(info);
        }
    };
    const handleOnAccept = () => {
        onAccept(itemSelected);
    } ;
    return (
        <div className="calendar-select-option">
            {showLoader && <Loader />}
            <section>
                <h3>{selectedDay.date.toLocaleDateString()}</h3>
                <ul className="calendar-select-list">
                {data.hours.map((hour, key) => {
                    return (
                        <li key={key}>
                            <input type="radio" name="time" id={`option_${key}`} value={key} onChange={handleOnSelectItem} />&nbsp;
                            <label htmlFor={`option_${key}`}>{hour.from}hs - {hour.to}hs {type === 'perHour' &&  ' - $' + hour.price}</label>
                        </li>
                    );
                })}
                </ul>
            </section>
            {showError && <p style={{color: 'red', padding: '10px', fontSize: '0.8rem'}}>La hora seleccionada no está disponible para esta fecha.</p>}
            <section className="calendar-select-option-buttons">
                <button onClick={handleOnAccept} type="button" className="accept" disabled={!itemSelected}>Aceptar</button>
                <button onClick={onClose} type="button" className="cancel">Cancelar</button>
            </section>
        </div>
    );
}

CalendarSelectOption.propTypes = {
    children: PropTypes.node
};

export default CalendarSelectOption;