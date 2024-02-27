import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
function Codetails() {
    let { cid } = useParams();

    useEffect(() => {
       
        console.log("Received cid:", cid);
    }, [cid]);

    return (
       <div>hi</div>
    );
}

export default Codetails
