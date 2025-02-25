import React, {useState} from 'react';


export function Signup(){
    const [success, setsuccess] = useState('');
    const [error, seterror] = useState('');
    async function handleusersignup(e) {
        e.preventDefault();
        setsuccess('');
        seterror('');
        const response = await fetch('http://127.0.0.1:8000/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:e.target.name.value, email:e.target.email.value, is_seller:e.target.is_seller.value, password:e.target.password.value})
        });
        const data = await response.json();
        if (data.msg){
            setsuccess(data.msg)
        }
        if (data.errmsg){
            seterror(data.errmsg)
        }
        e.target.reset();
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-8">
                    <form action="" onSubmit={handleusersignup} className='text-center'>
                        <label htmlFor="" className='fw-bold'>Username: </label>
                        <input className='mt-1' required type="text" name="name" id="" /><br />
                        
                        <label htmlFor="" className='fw-bold'>Eamil: </label>
                        <input className='mt-1' required type="email" name="email" id="" /><br />

                        <label htmlFor="" className='fw-bold'>is_seller: </label>
                        <input className='mt-1' type="checkbox" name="is_seller" id="" /><br />

                        <label htmlFor="" className='fw-bold'>Password: </label>
                        <input className='mt-1 mb-1' required type="text" name="password" id="" /><br />
                        {success?<div className="alert alert-success">{success}</div>:<></>}
                        {error?<div className="alert alert-danger">{error}</div>:<></>}
                        <button className="btn btn-primary">Signup!</button>

                    </form>
                </div>
            </div>
        </div>
    );
};