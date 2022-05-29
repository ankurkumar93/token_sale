import React, { useEffect, useState } from "react";

function Timer(instance, dropMinutes, dropSeconds) {
var [minutes, setMinutes] = useState(instance.minutes);
var [seconds, setSeconds] = useState(instance.seconds);
var timer;
useEffect(()=>{
    timer = setInterval(async ()=>{
        setSeconds(seconds-1);
        if(minutes === 0 && seconds === 0){
                setMinutes(minutes)
                setSeconds(seconds)
        }
        else if (seconds === 0){
            setMinutes(minutes-1);
            setSeconds(59)

        }
    }, 1000)
return ()=> clearInterval(timer)
})
    return (
        <div>
            <h3>Time until next drop: </h3>
            <h3>{minutes<10? "0"+minutes:instance.minutes}:{seconds<10?"0"+seconds:instance.seconds}</h3>
        </div>
    )
}
export default Timer