import React, { useRef, useState } from "react";
import fileInputStyles from "./fileinput.module.css";
import image1 from "../../../assets/fileInputImages/image1.svg";
import image2 from "../../../assets/fileInputImages/image2.svg";
import image3 from "../../../assets/fileInputImages/image3.svg";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import vector from "../../../assets/fileInputImages/Vector.svg";

gsap.registerPlugin(useGSAP);

const FileInput = ({
  label,
  type = "text",
  fileType = ".pdf",
  error,
  selectedFile,
  setSelectedFile,
  required,
  ...props
}) => {
  // const [selectedFile, setSelectedFile] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);
  const tl = useRef();
  const container = useRef();

  const handleRemoveFile = () => {
    setSelectedFile();
  };

  const handleFileSelect = (file) => {
    const fileArray = Array.from(file);
    handleFileAnimation();
    setTimeout(() => {
      setSelectedFile(fileArray[0]);
    }, 3500);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e) => {
    handleFileSelect(e.target.files);
  };

  const handleFileAnimation = () => {
    if (tl.current) {
      tl.current.play();
    }
  };

  useGSAP(
    () => {
      if (!selectedFile) {
        const images = container.current?.querySelectorAll(".images");

        if (images && images.length > 0) {
          if (tl.current) {
            tl.current.kill();
          }

          // gsap.set(images, {
          //   x: 0,
          //   y: 0,
          //   rotation: 0,
          //   scale: 1,
          //   // transformOrigin: "center center",
          // });

          tl.current = gsap.timeline({ paused: true });

          tl.current.to(images[0], { x: -10, duration: 0.3 });
          tl.current.to(
            images[1],
            { x: 0, y: -5, rotation: 30, duration: 0.9 },
            "<"
          );
          tl.current.to(images[2], { x: -8, y: -8, duration: 0.9 }, "<");
          tl.current.to(images[1], { y: -130, duration: 0.7 });
          tl.current.to(images[2], { y: -130, duration: 0.6 });
          tl.current.from(images[0], { y: 130, scale: -0.8, duration: 0.8 });
          tl.current.to(images[0], { y: -130, scale: -0.8, duration: 1.8 });
        }
      }
    },
    {
      scope: container,
      dependencies: [selectedFile],
    }
  );

  return (
    <div className={fileInputStyles.mainContainer}>
      <div
        className={
          selectedFile
            ? fileInputStyles.normalContainer
            : fileInputStyles.fileContainer
        }
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          openFileDialog();
        }}
      >
        {selectedFile ? (
          <div className={`${fileInputStyles.inputWrapper}`}>
            <input
              type="text"
              value={
                window.screen.width < 590
                  ? selectedFile?.name.length > 30
                    ? selectedFile?.name.slice(0, 26) + "..."
                    : selectedFile?.name
                  : selectedFile?.name || ""
              }
              readOnly
              className={fileInputStyles.floatingInput}
            />
            <label
              className={`${fileInputStyles.floatingLabel} ${
                error ? fileInputStyles.errorText : ""
              }`}
            >
              {label}
              {required ? "*" : ""}
            </label>

            <button
              onClick={(e) => {
                handleRemoveFile();
              }}
              type="button"
              className={fileInputStyles.cancelBtn}
            >
              <img src={vector} alt="Remove file" />
            </button>
          </div>
        ) : (
          <div className={fileInputStyles.fileWrapper}>
            <div className={fileInputStyles.imgsContainer} ref={container}>
              <img
                src={image3}
                alt="upload image"
                className="images"
                draggable={false}
              />
              <img
                src={image2}
                alt="upload image"
                className="images"
                draggable={false}
              />
              <img
                src={image1}
                alt="upload image"
                className="images"
                draggable={false}
              />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept={fileType}
              required={required}
            />
            {dragActive ? (
              <span className={fileInputStyles.spantext}>
                Drop the file Here
              </span>
            ) : (
              <span className={fileInputStyles.spantext}>
                <span style={{ color: "#E74C21" }}>Click here or drag</span> to
                upload&nbsp;
                {label}
              </span>
            )}
          </div>
        )}
      </div>
      {error && <span className={fileInputStyles.error}>{error}</span>}
    </div>
  );
};

export default FileInput;
