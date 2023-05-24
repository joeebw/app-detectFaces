import { useDispatch } from 'react-redux';
import { setImgUrl } from '../../store/face-detector/faceDetector.reducer';
import './form-field.style.scss';
import { useRef } from 'react';

const FormField = () => {
  const input = useRef();
  const dispatch = useDispatch();

  const onButtonSubmit = (e) => {
    e.preventDefault();
    dispatch(setImgUrl(input.current.value));
  };

    return(
    <div className='container-form'>
      <h3>I can detect faces in your picture. Put an url and click detect. </h3>
      <form className='input-row' onSubmit={onButtonSubmit}>
        <input 
          type='text' 
          placeholder='Put the url' 
          ref={input} 
        />
        <button type='submit'>Detect</button>
      </form>
    </div>
    )
};

export default FormField;