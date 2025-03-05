import { useSelector } from "react-redux";
import LogoImage from "../logo/logo.component";
import Ranking from "../ranking/ranking.component";
import FormField from "../form-field/form-field.component";
import FaceDetector from "../face-detector/face-detector.component";
import NavBar from "../nav-bar/nav-bar.component";
import { selectImgUrl } from "../../store/face-detector/faceDetector.selector";
import { toast, Toaster } from "sonner";
import useFaceDetection from "../../hooks/useFaceDetection";

function Home() {
  const imgUrl = useSelector(selectImgUrl);

  const { isProcessing, clearImageAndBox } = useFaceDetection(imgUrl);

  return (
    <>
      <Toaster position="top-center" richColors />
      <NavBar />
      <LogoImage />
      <Ranking />
      <FormField
        isProcessing={isProcessing}
        clearImageAndBox={clearImageAndBox}
      />
      <FaceDetector />
    </>
  );
}

export default Home;
