import React from 'react'; 
import {useState} from 'react'; 

import {handleLogin, handleSignUp} from '../functions/index';

const Login = (props) => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState(''); 
    const [type, setType] = useState(''); 

    const {email, setEmail,  password, 
    setPassword,
    hasAccount ,
    setHasAccount ,
    emailError,
    setEmailError,
    setPasswordError,
    passwordError,
    setUserDetails
} = props; 

    return (
        <section className = "login">
            <div className = "loginContainer">
                {hasAccount ?
                <>
                 <h2 className = "loginContainerMessage">Log Into Your Account</h2> 
                <input type = "text" autoFocus required value = {email} onChange = {e => setEmail(e.target.value)} />
                <p className = "errorMsg">{emailError}</p>
                <label>Password</label>
                <input type = "password" required value = {password} onChange = {e => setPassword(e.target.value)} />
                <p className = "errorMsg">{passwordError}</p>
                 </>
                 
                 : 
                 <>
                 <h2 className = "loginContainerMessage">Sign Up For an Account</h2> 
                <label>Name</label>
                <input type = "text" autoFocus required value = {name} onChange = {e => setName(e.target.value)} />
                <label>Location</label>
                <input type = "text" autoFocus required value = {location} onChange = {e => setLocation(e.target.value)} />
                <label>Phone</label>
                <input type = "text" autoFocus required value = {phone} onChange = {e => setPhone(e.target.value)} />
                <label>Type</label>
                    <select name = "type" id = "type" onChange = {e => setType(e.target.value)} >
                        <option label = " "></option>
                        <option value = "Store">Store</option>
                        <option value = "Shelter">Shelter</option>
                    </select>
                <label>Email</label>
                <input type = "text" autoFocus required value = {email} onChange = {e => setEmail(e.target.value)} />
                <p className = "errorMsg">{emailError}</p>
                <label>Password</label>
                <input type = "password" required value = {password} onChange = {e => setPassword(e.target.value)} />
                <p className = "errorMsg">{passwordError}</p>
                </>
            }   
                <div className = "btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick = {() => handleLogin(email, password, setEmailError, setPasswordError, setUserDetails)}>Sign In</button>
                            <p>Don't have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                        </>

                    ): (
                        <>
                            <button onClick = {() => handleSignUp(name, location, phone, type, email, password, setEmailError, setPasswordError, setUserDetails)}>Sign up</button>
                            <p>Have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                </div>
                
            </div>
        </section>
    )
}

export default Login; 