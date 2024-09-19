
import React from "react";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  return (
    <header>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (values.query.trim() === "") {
            toast.error("Please enter image name!");
          } else {
            onSubmit(values.query);
            actions.resetForm();
          }
        }}
      >
        <Form className={css.searchBar}>
          <Field
            className={css.field}
            name="query"
            placeholder="Search images and photos"
          />
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
