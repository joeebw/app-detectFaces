import { useSelector } from "react-redux";
import {
  selectBox,
  selectImgUrl,
} from "../../store/face-detector/faceDetector.selector";
import "./face-detector.styles.scss";
import { useEffect, useState } from "react";

const FaceDetector = () => {
  const imgUrl = useSelector(selectImgUrl);
  const boxesFace = useSelector(selectBox);
  const [showFaces, setShowFaces] = useState(false);

  // Usamos un efecto para verificar cuando actualizar la vista
  useEffect(() => {
    // Solo mostrar si hay una URL válida Y hay cajas
    const shouldShow =
      Boolean(imgUrl) &&
      imgUrl.trim() !== "" &&
      Array.isArray(boxesFace) &&
      boxesFace.length > 0;

    setShowFaces(shouldShow);
  }, [imgUrl, boxesFace]);

  return (
    <div className="container-faceDetector">
      <div className="faceDetector-row">
        {showFaces && (
          <>
            <img alt="" src={imgUrl} />
            {boxesFace.map((boxFace, i) => {
              const { leftCol, topRow, rightCol, bottomRow } = boxFace;
              return (
                <div
                  className="box-boundaring"
                  key={i}
                  style={{
                    top: topRow,
                    right: rightCol,
                    bottom: bottomRow,
                    left: leftCol,
                  }}
                />
              );
            })}
          </>
        )}
        {!showFaces && (
          <div className="placeholder-message">
            Ingresa una URL de imagen con rostros para detectar
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceDetector;
