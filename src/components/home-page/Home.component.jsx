import { useEffect } from "react"
import LogoImage from "../logo/logo.component"
import Ranking from "../ranking/ranking.component"
import FormField from "../form-field/form-field.component"
import FaceDetector from "../face-detector/face-detector.component"
import NavBar from "../nav-bar/nav-bar.component"
import { useDispatch, useSelector } from "react-redux"
import { setBox } from "../../store/face-detector/faceDetector.reducer"
import { selectImgUrl } from "../../store/face-detector/faceDetector.selector"
import { increaseRanking } from "../../store/user/user.reducer"

function Home() {
  const dispatch = useDispatch();
  const imgUrl = useSelector(selectImgUrl);

  const displayFaceBox = (box) => {
    dispatch(setBox(box));
  };

  useEffect(() => {
    if(!imgUrl) return;

    //API clarifi configuration
    const USER_ID = `${process.env.REACT_APP_TOKEN_ID}`;
    const PAT = `${process.env.REACT_APP_PATH_KEY}`;
    const APP_ID = 'my-first-application';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    const IMAGE_URL = imgUrl;
  
  
    const raw = JSON.stringify({
      "user_app_id": {
        "user_id": USER_ID,
        "app_id": APP_ID
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": IMAGE_URL
            }
          }
        }
      ]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
      },
      body: raw
    };
  
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
    .then(response => response.json())
    .then(result => {
      displayFaceBox(faceCalculator(result));
      dispatch(increaseRanking());
    })
    .catch(error => console.log("There is an error", error))
  }, [imgUrl])


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

  return (
    <>
      <NavBar/>
      <LogoImage/>
      <Ranking/>
      <FormField/>
      <FaceDetector/>
    </>
  )
}

export default Home
