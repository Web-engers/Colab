import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/config'; 
import { Button } from '@mui/material';

const TemplateGallery = ({setDisplayTemplate}) => {
  const [allTemplates, setAllTemplates] = useState([]); 

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

  const loadTemplate = (templateId) => {
    console.log(`Template ${templateId} clicked`);
    const tempRef = doc(db, "templates", templateId); 
    getDoc(tempRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          setDisplayTemplate(docSnap.data().canvas);  
        } else {
          console.log("No such document!");
        }
      })
      .catch((err) => {
        console.error("Error loading template:", err);
      });
  };

  const handleAddTemplate = ()=>{
    console.log(`Template is to be added`);
  }

  return (
    <div className='rounded-xl shadow-lg w-[300px] h-[400px]'>
        <div className='grid grid-cols-2 gap-2 overflow-scroll  w-[300px] h-[350px]'>
        {allTemplates.map((template) => (
            <button key={template.id} 
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
