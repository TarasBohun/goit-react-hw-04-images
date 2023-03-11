import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { getImages } from 'settings/getImages';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Loader } from 'components/Loader';

import axios from 'axios';

const App = () => {
  const [textSearch, setTextSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!textSearch) {
      return;
    }
    setLoader(true);

    getImages(textSearch, page)
      .then(res => res.json())
      .then(res => {
        if (res.hits.length === 0) {
          toast.error('No images was found for your request!');
          setLoader(false);
          return;
        }
        setImages([...images, ...res.hits]);
        setLoader(false);
        setTotalHits(res.totalHits);
      })
      .catch(error => {
        setError(error);
      });
  }, [textSearch, page]);

  const handleSubmit = textSearch => {
    setTextSearch(textSearch);
    setImages([]);
    setPage(1);
  };

  const handleLoading = () => {
    setPage(page + 1);
  };

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#1f6c31',
            color: '#fff',
          },
        }}
      />
      <Searchbar onSearch={handleSubmit} />

      <div
        style={{
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {error && <p>{error}</p>}
        {loader && <Loader />}
        <ImageGallery images={images} />
        {images.length < totalHits && images.length !== 0 && (
          <Button loadMore={handleLoading} />
        )}
      </div>
    </div>
  );
};

export default App;
