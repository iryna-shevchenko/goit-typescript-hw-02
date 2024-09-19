
import React from "react";
import css from "./LoadMoreBtn.module.css";


interface LoadMoreBtnProps {
  onLoadMore: () => void; 
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <div>
      <button className={css.loadMoreBtn} onClick={onLoadMore}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
