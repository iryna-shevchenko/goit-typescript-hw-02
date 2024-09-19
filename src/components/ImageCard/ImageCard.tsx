
import React from "react";
import css from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string;
  };
  alt_description: string;
}

interface ImageCardProps {
  image: Image;
  imageClick: () => void; 
}

const ImageCard: React.FC<ImageCardProps> = ({
  image: { urls, alt_description },
  imageClick,
}) => {
  return (
    <img
      className={css.imageCard}
      src={urls.small}
      alt={alt_description}
      onClick={imageClick}
    />
  );
};

export default ImageCard;
