import React from "react";
import "./Picker.css";

const Picker = ({ size }) => {
  return (
    <>
      <div class="spinner" style={{ scale: `${size}` }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Picker;
