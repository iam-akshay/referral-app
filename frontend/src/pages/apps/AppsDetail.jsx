import React, { useState, useRef } from 'react';

export const AppsDetail = ({ params }) => {
  console.log('---params----', params);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      const fd = new FormData();
      fd.append('screenshot', file);

      axios
        .post('/apps/', fd)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('logo', image);
    fd.append('name', formData['name']);
    fd.append('link', formData['link']);
    fd.append('category', formData['category']);
    fd.append('sub_category', formData['sub_category']);
    fd.append('points', formData['points']);

    axios
      .post('/apps/', fd)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      Name: {app.name}
      <br />
      <div
        className={`image-uploader ${isDragging ? 'dragging' : ''}`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
      >
        <input
          type='file'
          accept='image/*'
          onChange={handleSelectFile}
          style={{ display: 'none' }}
          ref={fileInputRef}
        />
        <button
          type='button'
          className='border h-[200px] p-10 w-full'
          onClick={() => fileInputRef.current.click()}
        >
          Select or Drag and Drop your logo here
        </button>
      </div>
    </>
  );
};
