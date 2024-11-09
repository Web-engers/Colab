import { useEffect, useState } from "react";
import axios from "axios";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";

export default function Imageselect() {
    
    const [publicId, setPublicId] = useState("models/new_image");  // You can change this as needed
    const [cloudName] = useState("demo");  // Replace with your actual Cloudinary cloud name
    const [uploadPreset] = useState("your_upload_preset");  // Replace with your actual upload preset
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`https://res.cloudinary.com/${cloudName}/image/list/logo.json`)
            .then((res) => {
                setImages(res.data.resources);  // Assuming 'resources' contains the images list
            })
            .catch((error) => console.error("Error fetching images:", error));
    }, [cloudName]);

    const uwConfig = {
        cloudName,
        uploadPreset
    };

    // Initialize Cloudinary object
    const cld = new Cloudinary({
        cloud: {
            cloudName
        }
    });

    return (
        <div>
            <h3>Cloudinary Upload Widget Example</h3>
            {/* Cloudinary upload widget */}
            <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

            <div style={{ width: "800px" }}>
                {/* Displaying images from Cloudinary */}
                {images.length > 0 ? images.map((image, index) => {
                    const img = cld.image(image.public_id);  // Create image instance from each public ID
                    return (
                        <AdvancedImage
                            key={index}
                            style={{ maxWidth: "10%" }}
                            cldImg={img}
                            plugins={[responsive(), placeholder()]}
                        />
                    );
                }) : <p>Loading images...</p>}
            </div>
        </div>
    );
}
