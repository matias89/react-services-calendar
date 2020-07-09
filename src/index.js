import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './lib/components/calendar/Calendar';

const serviceMock = {
    "type": "perHour", // perHour
    "serviceId": 98,
    "price": {
        adult: 700,
        child: 400,
    }, // Only applies if type is "perPerson"
    "days": [{
        "day": "monday",
        "price": null, // Consultar esta variable, ya que tiene más sentido
        "hours": [{
            "serviceAvailabilityId": 1,
            "from": "10:00",
            "to": "11:00",
            "price": 200
        },{
            "serviceAvailabilityId": 2,
            "from": "11:00",
            "to": "12:00",
            "price": 200
        },{
            "serviceAvailabilityId": 3,
            "from": "12:00",
            "to": "13:00",
            "price": 200
        }]
    },{
        "day": "wednesday",
        "hours": [{
            "serviceAvailabilityId": 4,
            "from": "11:00",
            "to": "12:00",
            "price": 300
        },{
            "serviceAvailabilityId": 5,
            "from": "12:00",
            "to": "13:00",
            "price": 400
        },{
            "serviceAvailabilityId": 6,
            "from": "13:00",
            "to": "14:00",
            "price": 200
        },{
            "serviceAvailabilityId": 7,
            "from": "14:00",
            "to": "15:00",
            "price": 200
        }]
    },{
        "day": "sunday",
        "hours": [{
            "serviceAvailabilityId": 8,
            "from": "14:00",
            "to": "15:00",
            "price": 500
        },{
            "serviceAvailabilityId": 9,
            "from": "15:00",
            "to": "16:00",
            "price": 700
        },{
            "serviceAvailabilityId": 10,
            "from": "16:00",
            "to": "17:00",
            "price": 200
        },{
            "serviceAvailabilityId": 11,
            "from": "10:00",
            "to": "11:00",
            "price": 200
        },{
            "serviceAvailabilityId": 12,
            "from": "11:00",
            "to": "12:00",
            "price": 200
        },{
            "serviceAvailabilityId": 13,
            "from": "12:00",
            "to": "13:00",
            "price": 200
        }]
    }]
};

ReactDOM.render(
    <Calendar
        availableDays={serviceMock}
        onAccept={e => window.console.log('onAccept', e)}
        urlToValidate="https://jsonplaceholder.typicode.com/postss"
    />,
    document.getElementById('root')
);
