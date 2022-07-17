import axios from "axios";
import React, { useContext, useState } from "react";
import { BlogContextType, ModalProps } from "../types";
import { BlogContext } from "../App";
import { BASE_URL } from "../pages/BlogList";

const Modal: React.FC<ModalProps> = () => {
  const { blogs, setBlogs, showModal, toggleModal, editBlogId, setEditBlogId } =
    useContext(BlogContext) as BlogContextType;

  const selectedBlog = blogs.find((blog) => blog._id === editBlogId);

  const initialFormState: { [x: string]: string } =
    editBlogId && selectedBlog
      ? { title: selectedBlog?.title, body: selectedBlog?.body }
      : {
          title: "",
          body: ""
        };

  const [form, setForm] = useState(initialFormState);
  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const key: string = e.target.id;
    setForm({ ...form, [key]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editBlogId) {
      if (form.title.length > 0 && form.body.length > 0) {
        axios
          .post(`${BASE_URL}/createBlogs`, form)
          .then(({ data }) => {
            const newBlog = {
              _id: data._id,
              title: data.title,
              body: data.body
            };
            setBlogs([...blogs, newBlog]);
            setForm(initialFormState);
            toggleModal();
            if (editBlogId) {
              setEditBlogId(undefined);
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("Input fields must not be empty!!");
      }
    } else {
      if (form.title.length > 0 && form.body.length > 0) {
        const formattedForm = { body: { title: form.title, body: form.body } };
        axios
          .patch(`${BASE_URL}/updateBlogs?id=${editBlogId}`, formattedForm)
          .then((res) => {
            setBlogs(
              blogs.map((b) => {
                if (b._id === editBlogId) {
                  return Object.assign(
                    {},
                    { _id: editBlogId, title: form.title, body: form.body }
                  );
                } else {
                  return b;
                }
              })
            );
            setEditBlogId(undefined);
            setForm(initialFormState);
            toggleModal();
          })
          .catch((err) => console.log(err));
      } else {
        alert("Input fields must not be empty!!");
      }
    }
  };

  return (
    <div className={showModal ? "modal d-block bg-secondary" : "modal"}>
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">New Blog</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}
            ></button>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={form?.title}
                  placeholder="Title"
                  onChange={(e) => handleOnChange(e)}
                />
                <label htmlFor="title" className="floatingTextarea2">
                  Title:
                </label>
              </div>
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  style={{ height: "300px" }}
                  id="body"
                  value={form?.body}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Content"
                ></textarea>
                <label
                  htmlFor="body"
                  className="floatingTextarea2 col-form-label"
                >
                  Content:
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  toggleModal();
                  setEditBlogId(undefined);
                }}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                {selectedBlog ? "Update Blog" : "Post Blog"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
