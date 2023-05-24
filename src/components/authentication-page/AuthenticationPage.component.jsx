import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDocUser, authStateChanged } from "../../utils/firebase/firebase.utils"
import { selectRoutes } from "../../store/routes/routes.selector"
import {setUser} from '../../store/user/user.reducer'
import { setRoutes } from "../../store/routes/routes.reducer"
import { ROUTES } from "../../utils/routes/routes.utils"
import SignIn from "../sign-in/sign-in.component"
import Register from "../register/register.component"
import Home from "../home-page/Home.component"

function AuthenticationPage() {
  const routes = useSelector(selectRoutes);
  const dispatch = useDispatch();

  useEffect(() => {
      // Subscribe to auth state changes and update the user state variable
      const unsubscribe = authStateChanged(async (user) => {
        if (!user) return dispatch(setUser(null))
        
        const userDoc = await getDocUser(user);
        dispatch(setUser(userDoc));
        dispatch(setRoutes(ROUTES.FACEDETECTOR));
      });
      // Return a cleanup function to unsubscribe from auth state changes
      return unsubscribe;
  }, []);

  return (
    <>
      {
        routes === ROUTES.SIGN_IN ? 
          <SignIn/> : 
        routes === ROUTES.REGISTER ?
          <Register/> :
        routes === ROUTES.FACEDETECTOR &&
          <Home/>
      }
    </>
  )
}

export default AuthenticationPage
