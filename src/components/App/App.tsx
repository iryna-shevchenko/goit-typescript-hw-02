import { useState, useEffect } from "react";
import { fetchImages } from "../../image-api";
import toast, { Toaster } from "react-hot-toast";
import Modal from "react-modal";

import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

import css from "./App.module.css";

Modal.setAppElement("#root");

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        if (data.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        }
        setImages((prevImages) => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query, page]);

  const handleSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} onOpenModal={openModal} />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {modalIsOpen && (
        <ImageModal
          onCloseModal={closeModal}
          isOpen={modalIsOpen}
          image={selectedImage}
        />
      )}
      <Toaster position="top-right" />
    </div>
  );
}
