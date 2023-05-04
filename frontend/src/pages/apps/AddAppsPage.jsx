import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const initialFormData = {
  name: '',
  link: '',
  category: '',
  sub_category: '',
  points: '',
  logo: null
};

const categories = ['Social', 'Entertainment', 'News', 'Shopping'];
const subCategories = {
  Social: ['Facebook', 'Twitter', 'LinkedIn', 'Instagram'],
  Entertainment: ['YouTube', 'Netflix', 'Spotify'],
  News: ['CNN', 'BBC', 'Fox News'],
  Shopping: ['Amazon', 'eBay', 'Walmart']
};

export const AddAppsPage = () => {
  const [formData, setFormData] = useState(initialFormData);

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
      setImage(file);
    }
  };

  const handleSelectFile = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
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
    <div className='flex flex-col gap-4'>
      <div>
        <Link to={'/apps'}>Back to Apps Page</Link>
      </div>
      <form onSubmit={handleSubmit} className='flex flex-col w-[500px] p-10 '>
        <label htmlFor='name'>Name:</label>
        <input
          className='border p-2'
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
        />
        <br />

        <label htmlFor='link'>Link:</label>
        <input
          className='border p-2'
          type='text'
          id='link'
          name='link'
          value={formData.link}
          onChange={handleChange}
        />
        <br />

        <label htmlFor='category'>Category:</label>
        <select
          className='border p-2'
          id='category'
          name='category'
          value={formData.category}
          onChange={handleChange}
        >
          <option value=''>--Select Category--</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />

        {formData.category && (
          <>
            <label htmlFor='sub_category'>Sub-Category:</label>
            <select
              className='border p-2'
              id='sub_category'
              name='sub_category'
              value={formData.sub_category}
              onChange={handleChange}
            >
              <option value=''>--Select Sub-Category--</option>
              {subCategories[formData.category].map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
            <br />
          </>
        )}

        <label htmlFor='points'>Points:</label>
        <input
          className='border p-2'
          type='number'
          id='points'
          name='points'
          value={formData.points}
          onChange={handleChange}
        />
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

        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Add App
        </button>
      </form>
    </div>
  );
};
