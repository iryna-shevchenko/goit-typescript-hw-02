
import { useState, useEffect } from "react";
import { fetchImages } from "../../image-api";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { Image } from "../types"; // Імпорт типу

import css from "./App.module.css";

const App: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (query === "") {
      return;
    }

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImages(query, page);
        if (data.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again!"
          );
        }
        setImages((prevImages) => [...prevImages, ...data]);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
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
};

export default App;

