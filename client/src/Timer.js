import React, { useEffect, useState } from "react";

function Timer(instance, dropMinutes, dropSeconds) {
console.log(instance.minutes)
console.log(instance.seconds)


var [minutes, setMinutes] = useState(instance.minutes);
var [seconds, setSeconds] = useState(instance.seconds);
var timer;

useEffect(()=>{
    timer = setInterval(async ()=>{
        setSeconds(seconds-1);
        if(minutes === 0 && seconds === 0){
                const shareslift = (instance.instance.methods.sharesLeft().call())
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
            <h1>Time until next drop: </h1>
            <h1>{minutes<10? "0"+minutes:minutes}:{seconds<10?"0"+seconds:seconds}</h1>
        </div>
    )
}
export default Timer