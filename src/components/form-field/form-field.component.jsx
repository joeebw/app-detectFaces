import { useDispatch } from "react-redux";
import { setImgUrl } from "../../store/face-detector/faceDetector.reducer";
import "./form-field.style.scss";
import { useRef } from "react";

const FormField = ({ isProcessing = false, clearImageAndBox }) => {
  const input = useRef();
  const dispatch = useDispatch();

  const onButtonSubmit = (e) => {
    e.preventDefault();

    const url = input.current.value.trim();

    dispatch(setImgUrl(url));
  };

  const handleClear = () => {
    if (input.current) {
      input.current.value = "";
    }
    clearImageAndBox();
  };

  return (
    <div className="container-form">
      <h3>I can detect faces in your picture. Put an url and click detect. </h3>
      <form className="input-row" onSubmit={onButtonSubmit}>
        <input
          type="text"
          placeholder="Put the url"
          ref={input}
          disabled={isProcessing}
        />
        <button type="submit" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Detect"}
        </button>
        <button type="button" onClick={handleClear} disabled={isProcessing}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default FormField;
