import { useEffect, useState } from "react";
import axios from "axios";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function Imageselect() {
  const [publicId, setPublicId] = useState("models/new_image");
  const [cloudName] = useState("dgy49rzwv");
  const [uploadPreset] = useState("canvas");
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/images")  
      .then((res) => {
        setImages(res.data.resources);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const uwConfig = {
    cloudName,
    uploadPreset,
  };
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  return (
    <div>
      <h3>Cloudinary Upload Widget Example</h3>
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

      <div style={{ width: "800px" }}>
        {images.length > 0 ? (
          images.map((image, index) => {
            const img = cld.image(image.public_id);
            return (
              <AdvancedImage
                key={index}
                style={{ maxWidth: "10%" }}
                cldImg={img}
                plugins={[responsive(), placeholder()]}
              />
            );
          })
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
}
