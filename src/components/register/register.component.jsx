import { useRef, useState } from 'react';
import { setRoutes } from '../../store/routes/routes.reducer';
import { useDispatch } from 'react-redux';
import { createUserWithFirebase } from '../../utils/firebase/firebase.utils';
import { ROUTES } from '../../utils/routes/routes.utils';
import './register.styles.scss';

const Register = ({ loadUser}) => {
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const dispatch = useDispatch();

  const handleChangeRoutes = () => {
    dispatch(setRoutes(ROUTES.SIGN_IN));
  }

  const handleSumbit = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const namevalue = name.current.value;
    createUserWithFirebase(emailValue, passwordValue, namevalue);
  }

    return(
    <form className='register-container' onSubmit={handleSumbit}>
      <div className="login-block">
        <h1>Register</h1>
        <input 
          type="text"  
          placeholder="Name" 
          id="username"
          ref={name}  
        />
        <input 
          type="email"  
          placeholder="Email" 
          id="email" 
          ref={email}
        />
        <input 
          type="password"  
          placeholder="Password" 
          id="password"
          ref={password}
        />
        <button type='submit'>Register</button>
        <p onClick={handleChangeRoutes}>SIGN-IN</p>
      </div>
    </form>
    )
};

export default Register;