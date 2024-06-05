"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const input = useRef();
  const [selectedImage, setSelectedImage] = useState();
  function handleClick() {
    input.current.click();
  }
  function handleImageSelection(event) {
    const image = event.target.files[0];

    if (!image) {
      setSelectedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImage(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!selectedImage && <p>Please select an image</p>}
          {selectedImage && (
            <Image src={selectedImage} alt="Selected Image" fill />
          )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg"
          ref={input}
          required
          onChange={handleImageSelection}
        />
        <button className={classes.button} type="button" onClick={handleClick}>
          Pick an image
        </button>
      </div>
    </div>
  );
}
