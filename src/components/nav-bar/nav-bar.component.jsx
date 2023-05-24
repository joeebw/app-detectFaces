import { setRoutes } from '../../store/routes/routes.reducer';
import { setImgUrl, setBox } from '../../store/face-detector/faceDetector.reducer';
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './nav-bar.style.scss';

const NavBar = ({  }) => {
  const dispatch = useDispatch();

  const changeRoute = () => {
    dispatch(setRoutes('signin'));
  }

  const signOutReset = () => {
    signOutUser();
    dispatch(setImgUrl(''));
    dispatch(setBox([]));
  }

  const handleRouteChangeAndReset = () => {
    changeRoute();
    signOutReset();
  };

  return(
    <nav className='container-nav'>
      <span onClick={handleRouteChangeAndReset}>
        Sign-Out
      </span>
    </nav>
  )
};

export default NavBar ;