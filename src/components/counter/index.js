import React, { useState, useEffect } from 'react';
import './counter.scss';
import { IconButton, Icon } from '@material-ui/core';

function Counter(props) {
    const buttonStyle = { fontSize: 50 };
    const [endTime, setEndTime] = useState(props.endTime);
    const [hours, setHours] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    let interval;

    Number.prototype.pad = function(size) {
        let s = String(this);
        while (s.length < (size || 2)) {s = "0" + s;}
        return s;
    };

    useEffect(() => {
        interval = setInterval(() => updateTime(), 1000);

        if(parseInt(hours) <= 0 && parseInt(minutes) <= 0 && parseInt(seconds) <= 0){
            clear();
            clearInterval(interval);
        }

        return () => clearInterval(interval)
    },[hours, minutes, seconds]);

    function clear() {
        setHours(0);
        setMinutes(0);
        setSeconds(0);
    }

    function updateTime(interval) {
        const timeLeft = endTime - new Date();
        calcTime(timeLeft);
    }
    
    function calcTime(timeLeft){
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setHours(hours.pad());
        setMinutes(minutes.pad());
        setSeconds(seconds.pad());
    }

    function setHour(hour) {
        const result = parseInt(hours) + hour;

        if(result >= 0){
            const _endTime = new Date(endTime);
            setHours(result.pad());
            setEndTime(_endTime.setHours(_endTime.getHours()+hour));
        }
    }

    function setMinute(minute) {
        const result = parseInt(minutes) + minute;

        if (((hours > 0 && result >= -1) || (hours <= 0 && result >= 0)) && result <= 60) {
            const _endTime = new Date(endTime);
            if (result !== -1)
                setMinutes(result.pad());
            setEndTime(_endTime.setMinutes(_endTime.getMinutes() + minute));
        }
    }

    function setSecond(second) {
        const result = parseInt(seconds) + second;

        if(result >= -1 && result <= 60){
            const _endTime = new Date(endTime);
            if(result !== -1)
                setSeconds(result.pad());
            setEndTime(_endTime.setSeconds(_endTime.getSeconds()+second));
        }
    }

    return (
        <div className="counter">
            <div className="column">
                <span>{hours?hours:"00"}</span>
                <div className="buttons">
                    <IconButton onClick ={() => setHour(+1)}><Icon style={buttonStyle}>add_circle_outline</Icon></IconButton>
                    <IconButton onClick ={() => setHour(-1)}><Icon style={buttonStyle}>remove_circle_outline</Icon></IconButton>
                </div>
            </div>
            <div className="column">
                <span>{minutes?minutes:"00"}</span>
                <div className="buttons">
                    <IconButton onClick = {() => setMinute(+1)}><Icon style={buttonStyle}>add_circle_outline</Icon></IconButton>
                    <IconButton onClick = {() => setMinute(-1)}><Icon style={buttonStyle}>remove_circle_outline</Icon></IconButton>
                </div>
            </div>
            <div className="column">
                <span>{seconds?seconds:"00"}</span>
                <div className="buttons">
                    <IconButton onClick = {() => setSecond(+1)}><Icon style={buttonStyle}>add_circle_outline</Icon></IconButton>
                    <IconButton onClick = {() => setSecond(-1)}><Icon style={buttonStyle}>remove_circle_outline</Icon></IconButton>
                </div>
            </div>
        </div>
    );
}

export default Counter;
