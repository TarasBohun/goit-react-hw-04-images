import React, { Component } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import { getImages } from 'settings/getImages';

import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Loader } from 'components/Loader';

class App extends Component {
  state = {
    textSearch: '',
    images: [],
    page: 1,
    loader: false,
    error: '',
    totalHits: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { textSearch, page } = this.state;

    if (prevState.textSearch !== textSearch || prevState.page !== page) {
      this.setState({ loader: true });

      getImages(textSearch, page)
        .then(res => res.json())
        .then(images => {
          if (images.hits.length === 0) {
            toast.error('No images was found for your request!');
            this.setState({ loader: false });
            return;
          }
          this.setState({
            images: [...this.state.images, ...images.hits],
            loader: false,
            totalHits: images.totalHits,
          });
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  handleSubmit = textSearch => {
    this.setState({ textSearch, page: 1, images: [] });
  };

  handleLoading = () => {
    this.setState({ page: this.state.page + 1 });
  };

  render() {
    const { error, loader, textSearch, page, images, totalHits } = this.state;
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
        <Searchbar onSearch={this.handleSubmit} />

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
          <ImageGallery value={textSearch} page={page} images={images} />
          {images.length < totalHits && images.length !== 0 && (
            <Button loadMore={this.handleLoading} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
