import { useEffect, useState } from "react";
import axios from "axios";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function ImageGallery({setAction, setImgLink}) {
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

  const handleImageButton = (img)=>{
    setAction("IMAGE")
    console.log(img)
    setImgLink(`https://res.cloudinary.com/dgy49rzwv/image/upload/${img.publicID}`)
  }

  return (
    <div className="rounded-xl shadow-xl w-[420px] h-[400px] overflow-scroll">
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
      <div className="grid grid-cols-3 gap-2 w-[400px] overflow-scroll">
        {images.length > 0 ? (
          images.map((image, index) => {
            const img = cld.image(image.public_id);
            return (
                <button onClick={()=>handleImageButton(img)}>
                    <AdvancedImage
                        key={index}
                        width={100}
                        cldImg={img}
                        plugins={[responsive(), placeholder()]}
                        />
                </button>
            );
          })
        ) : (
          <p>Loading images...</p>
        )}
      </div>
    </div>
  );
}
