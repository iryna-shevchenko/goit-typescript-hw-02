
import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import { Image } from "../types"; 
import css from "./ImageGallery.module.css";

interface ImageGalleryProps {
  items: Image[];
  onOpenModal: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ items, onOpenModal }) => {
  return (
    <section>
      <ul className={css.imageGallery}>
        {items.map((item) => (
          <li key={item.id}>
            <ImageCard image={item} imageClick={() => onOpenModal(item)} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ImageGallery;
