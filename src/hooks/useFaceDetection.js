import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBox, setImgUrl } from "../store/face-detector/faceDetector.reducer";
import { increaseRanking } from "../store/user/user.reducer";
import { toast } from "sonner";

const useFaceDetection = (imgUrl) => {
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const clearImageAndBox = () => {
    dispatch(setBox([]));
    dispatch(setImgUrl(""));
  };

  const getProxiedImageUrl = (originalUrl) => {
    return `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;
  };

  const calculateFaceBoxes = (detections, image) => {
    const width = Number(image.width);
    const height = Number(image.height);

    return detections.map((detection) => {
      const box = detection.detection.box;
      return {
        leftCol: (box.x / width) * 100 + "%",
        topRow: (box.y / height) * 100 + "%",
        rightCol: ((width - (box.x + box.width)) / width) * 100 + "%",
        bottomRow: ((height - (box.y + box.height)) / height) * 100 + "%",
      };
    });
  };

  const processImage = async (faceapi, proxiedUrl) => {
    try {
      setIsProcessing(true);

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = proxiedUrl;

      const imageLoadPromise = new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Failed to load image"));
      });

      const loadedImg = await imageLoadPromise;

      const detections = await faceapi
        .detectAllFaces(loadedImg, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!detections || detections.length === 0) {
        throw new Error("No faces detected");
      }

      const boxes = calculateFaceBoxes(detections, loadedImg);

      dispatch(setBox(boxes));
      dispatch(increaseRanking());

      toast.success("Face detection completed successfully!");
    } catch (error) {
      console.error("Error processing image:", error);

      clearImageAndBox();

      let errorMessage = "Unable to process this image.";

      if (error.message.includes("load")) {
        errorMessage =
          "Failed to load the image. The URL might be incorrect or the server might be blocking access.";

        if (proxiedUrl.includes("404")) {
          errorMessage =
            "The image doesn't exist at the provided URL (404 Not Found).";
        }
      } else if (error.message.includes("No faces")) {
        errorMessage =
          "No faces were detected in this image. Please try with an image that shows a clear, frontal face.";
      } else if (
        error.message.includes("CORS") ||
        error.message.includes("tainted")
      ) {
        errorMessage =
          "Security restrictions prevent processing this image. Please try with an image from a different source.";
      }

      toast.error(errorMessage, {
        description: "Please try with a different image.",
        duration: 5000,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const loadModels = async () => {
    try {
      const MODEL_URL = "/models";

      const faceapi = await import("face-api.js");

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);

      if (imgUrl) {
        const proxiedUrl = getProxiedImageUrl(imgUrl);
        processImage(faceapi, proxiedUrl);
      }
    } catch (error) {
      console.error("Error loading models:", error);

      clearImageAndBox();

      toast.error(
        "Failed to load face detection models. Please refresh the page and try again."
      );
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!imgUrl) {
      clearImageAndBox();
      return;
    }

    loadModels();
  }, [imgUrl]);

  return {
    isProcessing,
    clearImageAndBox,
  };
};

export default useFaceDetection;
