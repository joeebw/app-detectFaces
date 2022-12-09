import { Fragment, useEffect, useState } from 'react';
import ParticlesBg from 'particles-bg';
import NavBar from './components/nav-bar/nav-bar.component';
import FormField from './components/form-field/form-field.component';
import LogoImage from './components/logo/logo.component';
import Ranking from './components/ranking/ranking.component';
import FaceDetector from './components/face-detector/face-detector.component';
import SignIn from './components/sign-in/sign-in.component';
import Register from './components/register/register.component';
import './App.css';

function App() {
    const [input, setInput] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [box, setBox] = useState({});
    const [routes, setRoutes] = useState('signin');
    const [isUserSignIn, setIsUserSignIn] = useState(false);
    const [user, setUser] = useState({})

    useEffect(() => {
      if(imgUrl.length <= 0){
        return
       }

       fetch('http://localhost:3001/clarifai', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
            imgUrl: imgUrl
        })
        })
        .then(response => response.json())
        .then(result => {
          if(result){
          fetch('http://localhost:3001/image', {
            method:'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify ( {
              id: user.id
            })
          })
          .then(response => response.json())
          .then(result =>  setUser({...user, entries: result}))
          }

          displayFaceBox(faceCalculator(result));
        })
        .catch(error => console.log('error', error));

    }, [imgUrl]);

    const faceCalculator = (data) => {
      const clarifaiBox = data.outputs[0].data.regions;
      const image = document.getElementById('input-image');
      const width = Number(image.width);
      const height = Number(image.height);

      const boxRegionArray = clarifaiBox.map((box) => {
       const region = box.region_info.bounding_box;
        return{
          leftCol: region.left_col * width,
          topRow: region.top_row * height,
          rightCol: width - (region.right_col * width),
          bottomRow: height - (region.bottom_row * height)
        }
      })
      return boxRegionArray;

    };
    
    const displayFaceBox = (box) => {
      setBox(box);
    };
    

    const onInputChange = (event) => {
      setInput(event.target.value);  
    };


    const onButtonSubmit = () => {
        setImgUrl(input);
    };

    const changeRoute = (route, boolean) => {
      setRoutes(route);
      setIsUserSignIn(boolean);
    };



    const loadUser = (user) => {
        const {id, name, email, password, entries, joined} = user;
        setUser({
          id: id,
          name: name,
          email: email,
          password: password,
          entries: entries ,
          joined: joined
        })
        
    };

    const signOutReset = () => {
        setImgUrl('');
        setUser({});
    }

    console.log("actual user:", user);


    let render;
    switch (routes) {
        case 'signin':
          render = <SignIn changeRoute={changeRoute} loadUser={loadUser}/>;
          break;
        case 'register':
          render = <Register changeRoute={changeRoute} loadUser={loadUser}/>;
          break; 
        case 'faceDetector':
          render = <Fragment>
                      <LogoImage/>
                      <Ranking user={user}/>
                      <FormField onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
                      <FaceDetector imgUrl={imgUrl} boxesFace={box}/>
                  </Fragment>
          break;       
      }

   return(
    <div className='App'>
      <ParticlesBg type="cobweb" num={200} color='#0E1294' bg={true} />
      <NavBar changeRoute={changeRoute} thereIsUser={isUserSignIn} signOutReset={signOutReset}/>
      {render}
    </div>
   )
  
}


export default App;