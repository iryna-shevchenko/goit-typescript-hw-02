
import React, { useEffect } from "react";
import Modal from "react-modal";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Image } from "../types"; 

import css from "./ImageModal.module.css";

interface ImageModalProps {
  onCloseModal: () => void;
  isOpen: boolean;
  image: Image | null; 
}

const ImageModal: React.FC<ImageModalProps> = ({
  onCloseModal,
  isOpen,
  image,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!image) return null;

  const { urls, alt_description, user, likes } = image;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      overlayClassName={css.overlay}
      className={css.modal}
      contentLabel="Image enlargement"
    >
      <div className={css.image}>
        <img src={urls.regular} alt={alt_description} />
        <GrClose onClick={onCloseModal} className={css.iconCloseBtn} />
        <div className={css.desc}>
          <p className={css.text}>
            <IoPerson /> {user.name}
          </p>
          <p className={css.text}>
            <FaHeart /> {likes}
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;

