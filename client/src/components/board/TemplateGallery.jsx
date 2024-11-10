import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config'; 
import { Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from "uuid";

const TemplateGallery = ({ setDisplayTemplate, rectangles, scribbles, circles, arrows, texts }) => {
  const [allTemplates, setAllTemplates] = useState([]); 
  const params = useParams();

  // Fetch templates from Firestore
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const tempCollection = collection(db, 'templates');
        const tempSnapshot = await getDocs(tempCollection);
        
        if (!tempSnapshot.empty) {
          const templates = tempSnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data(),
          }));
          setAllTemplates(templates);
        } else {
          console.log('No templates found');
        }
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  // Load a specific template based on templateId
  const loadTemplate = async (templateId) => {
    console.log(`Template ${templateId} clicked`);
    const tempRef = doc(db, "templates", templateId);  // Corrected typo here
    await getDoc(tempRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          console.log(docSnap.data().canvas)
          setDisplayTemplate(docSnap.data().canvas);  
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.error("Error loading template:", err);
      });
  };

  // Handle adding a new template
  const handleAddTemplate = async () => {
    console.log("Adding template...");
    try {
      console.log("Template is being added");

      // Use setDoc to create or overwrite the template document
      const tempRef = doc(db, "templates", uuid()); // Use uuid() correctly
      await setDoc(tempRef, {
        title: "new", // New title for the template
        canvas: { 
          rectangles, 
          scribbles, 
          circles, 
          arrows, 
          texts 
        }, 
        img: "https://cdn.pixabay.com/photo/2020/05/04/10/21/background-5128585_1280.jpg" // Default image URL
      });
  
      console.log("Template added successfully");
    } catch (error) {
      console.error("Error adding template:", error);
    }
  };

  return (
    <div className='rounded-xl shadow-lg w-[300px] h-[400px]'>
      <div className='grid grid-cols-2 gap-2 overflow-scroll w-[300px] h-[350px]'>
        {allTemplates.map((template) => (
          <button 
            key={template.id} 
            onClick={() => loadTemplate(template.id)} 
            className='border solid border-black h-[130px] w-[110px]'
          >
            <img src={template.image} alt={template.title} height={100} width={100} />
            <p>{template.title}</p>
          </button>
        ))}
      </div>
      <Button onClick={handleAddTemplate}>Contribute to template</Button>
    </div>
  );
};

export default TemplateGallery;
