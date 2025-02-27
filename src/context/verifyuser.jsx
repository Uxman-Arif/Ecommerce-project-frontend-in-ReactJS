import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react';

async function verifyuserfrombackend(){
    const token = localStorage.getItem('Login Token');
    const response = await fetch('http://127.0.0.1:8000/user/validate', {
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({token:token})
    });
    const validateuser = await response.json();
    return validateuser;
}
function Verifyuser(){
    const [user, setuser] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        verifyuserfrombackend().then((user)=>setuser(user));
    }, []);
    if (user?.authenticate!=='verified') {
            navigate("/signin");
    };

    return user ? <Outlet context={{ user }} /> : null;
};

export default Verifyuser;