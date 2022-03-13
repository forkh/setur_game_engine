import {useRef, useEffect, useState, Fragment} from 'react'
import {useFrameLoop} from "./GameLoopHook"

// Heavily HEAVILY inspired by:
// https://gist.github.com/balmacefa/3e899642ae96eeb78e76d015d9587397
// https://www.youtube.com/watch?v=uJRXJxsvj7Q&t=82s

function GameLoop() {
// Game Loop

const [time, setTime] = useState(0);
const [deltaTime, setDeltaTime] = useState(0);

useFrameLoop((time: number, deltaTime: number) => {
    // game logic

    setTime(time);
    setDeltaTime(deltaTime);

    //console.log(time);
    //console.log(deltaTime);

});
    return<Fragment>
        <p> Time: </p>
        <p>{time}</p>
        <p>DeltaTime:</p>
        <p>{deltaTime}</p>
    </Fragment>

}

export default GameLoop