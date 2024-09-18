import css from "./ImageCard.module.css";

export default function ImageCard({
  image: { urls, alt_description },
  imageClick,
}) {
  return (
    <img
      className={css.imageCard}
      src={urls.small}
      alt={alt_description}
      onClick={imageClick}
    />
  );
}
