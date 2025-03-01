import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function Signin() {
    const navigate = useNavigate();
    const [success, setsuccess] = useState('');
    const [error, seterror] = useState('');

    async function signinhandle(e) {
        setsuccess('');
        seterror('');
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/signin', {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:e.target.email.value, password:e.target.password.value})
        });

        const data = await response.json();
        if (data.msg){
            setsuccess(data.msg);
        };
        if(data.errmsg){
            seterror(data.errmsg);
        };
        if(data.token){
            localStorage.setItem('Login Token', data.token);
            navigate('/products');
        }
        e.target.reset();
    };

    function movetosignup() {
        navigate('/signup');
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-6">
                    <form action="" className="text-center" onSubmit={signinhandle}>

                        <label htmlFor="" className='fw-bold'>Eamil: </label>
                        <input className='mt-1' required type="email" name="email"/><br />

                        <label htmlFor="" className='fw-bold'>Password: </label>
                        <input className='mt-1 mb-1' required type="text" name="password"/><br />

                        {success?<div className="alert alert-success">{success}</div>:<></>}
                        {error?<div className="alert alert-danger">{error}</div>:<></>}
                        <button className="btn btn-primary">Signin!</button>

                    </form>
                        <p className='text-center'>Don't have any account <a onClick={()=>{movetosignup()}} className='text-primary user-select-none'>signup here</a></p>

                </div>
            </div>
        </div>
    );
}
