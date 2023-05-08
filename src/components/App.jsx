import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { ToastContainer } from 'react-toastify';
export default class App extends Component {
  state = {
    imageName: '',
    hits: [],
    page: 1,
    isLoading: false,
    error: null,
    showModal: false,
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  fetchImages = () => {
    const { imageName, page } = this.state;
    this.setState({ isLoading: true });
    fetch(
      `https://pixabay.com/api/?q=${imageName}&page=${page}&key=34723066-8d4f91c8f936e3aca5c8bd269&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(`image gallery ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const newHits = data.hits;
        console.log('newHits', newHits);
        if (newHits.length === 0) {
          this.setState({ isLoading: false });
          return;
        }
        this.setState(prevState => ({
          hits: [...prevState.hits, ...newHits],
          page: prevState.page + 1,
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
        console.error('Error:', error);
      });
  };
  componentDidUpdate(prevProps, prevState) {
    console.log(prevState);
    if (prevState.imageName !== this.state.imageName) {
      this.setState({ hits: [], page: 1 }, () => {
        this.fetchImages();
      });
    }
  }
  render() {
    const { hits, isLoading, showModal } = this.state;
    return (
      <>
        <ToastContainer />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery hits={hits} isLoading={isLoading} />

        {showModal && <Modal />}

        {isLoading && <Loader />}
        {!isLoading && hits.length >= 12 && (
          <Button loadMore={this.fetchImages} />
        )}
      </>
    );
  }
}
