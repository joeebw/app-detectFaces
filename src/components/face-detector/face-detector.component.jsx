import { useSelector } from 'react-redux';
import { selectBox, selectImgUrl } from '../../store/face-detector/faceDetector.selector';
import './face-detector.styles.scss';

const FaceDetector = () => {
  const imgUrl = useSelector(selectImgUrl);
  const boxesFace = useSelector(selectBox);

  return(
    <div className='container-faceDetector'>
      <div className='faceDetector-row'>
        <img alt='' src={imgUrl} id='input-image'/>
        {
          boxesFace.length > 0 &&  boxesFace.map((boxFace, i) => {
            const {leftCol, topRow, rightCol, bottomRow} = boxFace;
            return(
              <div 
                className='box-boundaring' 
                key={i}  
                style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}
              />
            )
          })
        }
      </div>
    </div>
  )
};  

export default FaceDetector;