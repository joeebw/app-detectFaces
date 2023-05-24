import { useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { setRoutes } from '../../store/routes/routes.reducer';
import { signInWithFirebase } from '../../utils/firebase/firebase.utils';
import { ROUTES } from '../../utils/routes/routes.utils';
import './sign-in.styles.scss';

const SignIn = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const changeRouteHandler = () => {
      dispatch(setRoutes(ROUTES.REGISTER));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    signInWithFirebase(emailValue, passwordValue);
  }

  return(
    <form className='sign-in' onSubmit={handleSubmit}>
      <div className="login-block">
        <h1>Sign-in</h1>
        <input 
          type="email"  
          placeholder="Email" 
          id="username" 
          ref={email}
        />
        <input 
          type="password"  
          placeholder="Password" 
          id="password" 
          ref={password}
        />
        <button type='submit'>Sign-In?</button>
        <p onClick={changeRouteHandler}>REGISTER?</p>
      </div>
    </form>
  )
};

export default SignIn;