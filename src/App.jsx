import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { load_model } from "./model";
import "./App.css";

function App() {
  const [inputTxt, setInputTxt] = useState("");
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState(null);
  useEffect(() => {
    load_model().then((model) => setModel(model));
  }, []);

  // Initial test
  // if (model) {
  //   const input = tf.tensor1d([1200]).reshape([-1, 1]);
  //   const output = model.predict(input).dataSync();
  //   const prediction = output[0];
  //   console.log({ prediction });
  // }

  function handleChange(e) {
    setInputTxt(e.target.value);
  }

  function handleClick(value) {
    if (!model) return;
    const input = tf.tensor1d([value]).reshape([-1, 1]);
    const output = model.predict(input).dataSync();
    setPrediction(output[0]);
  }

  const value = parseFloat(inputTxt);
  const disabled = isNaN(value);
  1200;
  return (
    <>
      <h1>House Price Prediction</h1>
      <label htmlFor="area">House Size (sq.ft)</label>
      <input type="number" id="area" value={inputTxt} onChange={handleChange} />
      <button onClick={() => handleClick(value)} disabled={disabled}>
        Predict
      </button>
      <div>Predicted Price: {prediction} USD</div>
    </>
  );
}

export default App;
