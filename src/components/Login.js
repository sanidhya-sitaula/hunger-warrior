import React from 'react'; 
import {useState} from 'react'; 

import {handleLogin2, handleSignUp} from '../functions/index';

const Login = (props) => {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState(''); 
    const [image, setImage] = useState(''); 
    const [type, setType] = useState(''); 

    const [signUpStatus, setSignUpStatus] = useState(false); 

    const {email, setEmail, password, 
    setPassword,
    hasAccount ,
    setHasAccount ,
    emailError,
    setEmailError,
    setPasswordError,
    passwordError,
    setUserDetails,
    setIsUser,
    setUser
} = props; 

    return (
        <section className = "login">
            <div className = "loginContainer">
                {hasAccount ?
                <>
                 <h2 className = "loginContainerMessage">Log Into Your Account</h2> 
                 <label>Email</label>
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
                <label>Image (Link to image)</label>
                <input type = "text" value = {image} onChange = {e => setImage(e.target.value)} />
                </>
            }   
                <div className = "btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick = {() => handleLogin2(email, password, setEmailError, setPasswordError, setIsUser, setUser)}>Sign In</button>
                            <p>Don't have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign Up</span></p>
                        </>

                    ): (
                        <>
                            <button onClick = {() => handleSignUp(name, location, phone, type, email, image, password, setEmailError, setPasswordError, setSignUpStatus)}>Sign up</button>
                            {signUpStatus ? <h4 style = {{color : 'white', margin: '2% auto', textAlign: 'center'}}>You have signed up successfully. Please login.</h4> : null}
                            <p>Have an account? <span onClick = {() => setHasAccount(!hasAccount)}>Sign In</span></p>
                        </>
                    )}
                </div>
                
            </div>
        </section>
    )
}

export default Login; 