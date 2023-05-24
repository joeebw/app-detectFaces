import { useEffect, useState } from 'react';
import ParticlesBg from 'particles-bg';
import AuthenticationPage from './components/authentication-page/AuthenticationPage.component';
import './App.css';

function App() {
  const [numberParticles ,setNumberParticles] = useState(200);

    useEffect(() => {
      const numberParticlesInScreen = (num) => {
        const width = window.innerWidth;
        if(width > 700) return;
        setNumberParticles(num);
      }
      numberParticlesInScreen(60);
    }, []);

  return(
    <div className='App'>
      <ParticlesBg type="cobweb" num={numberParticles} color='#0E1294' bg={true} />
      <AuthenticationPage/>
    </div>
  )
  
}


export default App;
