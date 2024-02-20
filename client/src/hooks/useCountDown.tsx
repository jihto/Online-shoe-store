import moment from "moment";
import { useEffect, useState } from "react";

//2h

const useCountDown: (timeHours: number)=> string = (
    timeHours: number
) => {   
    const [countDown, setCountDown] = useState<number>(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCountDown(prev => prev - 1);
        }, 1000);
    
        return () => clearInterval(interval);
    },[countDown]); 
    const duration = moment.duration(countDown, 'seconds');
    return  moment.utc(duration.asMilliseconds()).format('h:mm:ss a');
}

export { useCountDown }