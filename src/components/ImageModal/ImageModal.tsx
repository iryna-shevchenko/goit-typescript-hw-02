import Modal from "react-modal";

import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import css from "./ImageModal.module.css";
import { useEffect } from "react";

export default function ImageModal({
  onCloseModal,
  isOpen,
  image: { urls, alt_description, user, likes },
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
}
