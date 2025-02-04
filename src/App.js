import React,{useRef} from 'react';
//import logo from './logo.svg';
import './App.css';
import * as tf from "@tensorflow/tfjs"
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from 'react-webcam';




function App() {

  //Setup references

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //Load Facemesh

  const runFacemesh = async()=>{
    const net = await facemesh.load({
      inputResolution:{width: 640,height: 480},
      scale: 0.8,
    });

    setInterval(() => {
      detect(net)
    }, 100)
  };

  //Detect Function
  const detect = async()=>{
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !==null && webcamRef.current.video.readyState === 4) {

      //Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoWidth;

      //Set Video Width
    
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //Set Canvas Width

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //Make Detections

      const face = await net.estimateFaces(video);
      console.log(face);

      //Get Canvas Context For Drawing


      
    }
  };
  return (
    <div className="App">
      <header className="App-header">
       <Webcam
       ref={webcamRef}
       style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right:0,
        textAlign: "center",
        zIndex: 9,
        width:640,
        height:480,
        }}
        />

       <canvas
       ref={canvasRef}
       style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 0,
        right:0,
        textAlign: "center",
        zIndex: 9,
        width:640,
        height:480,
        }}
        />
 
      </header>
    </div>
  );
}

export default App;
