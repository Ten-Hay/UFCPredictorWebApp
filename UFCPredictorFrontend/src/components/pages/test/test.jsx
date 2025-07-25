import { useState, useEffect } from "react"

function Test() {


    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/time').then(res => res.json()).then(data => {
            setCurrentTime(data.time);
        });
    }, []);


    return (
        <>
            <div className="">
                {currentTime}
            </div>
        </>
    )
}

export default Test