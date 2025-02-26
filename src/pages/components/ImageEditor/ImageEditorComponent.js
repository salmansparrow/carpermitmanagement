import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

function ImageEditorComponent({ onImageChange }) {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [fabric, setFabric] = useState(null);

  useEffect(() => {
    import("fabric").then((fabricModule) => {
      setFabric(fabricModule.fabric);
    });
  }, []);

  useEffect(() => {
    if (!fabric) return;

    // Initialize fabric canvas
    fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
      width: 500, // Ensure fixed size
      height: 300,
      backgroundColor: "#f3f3f3",
    });
  }, [fabric]);

  const handleImageUpload = (e) => {
    if (!fabric) return;
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        img.scaleToWidth(300);
        fabricCanvasRef.current.centerObject(img);
        fabricCanvasRef.current.add(img);
        fabricCanvasRef.current.setActiveObject(img);
        fabricCanvasRef.current.renderAll(); // Ensure image is rendered
      });
    };
    reader.readAsDataURL(file);
  };

  const getEditedImage = () => {
    return fabricCanvasRef.current?.toDataURL("image/png");
  };

  return (
    <Box>
      <input type="file" onChange={handleImageUpload} />
      <Box sx={{ border: "1px solid #ccc", mt: 2, width: 500, height: 300 }}>
        <canvas ref={canvasRef}></canvas>
      </Box>
      <button onClick={() => onImageChange(getEditedImage())}>
        Save Image
      </button>
    </Box>
  );
}

export default ImageEditorComponent;
