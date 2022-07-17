import axios from "axios";
import PenIcon from "../assets/PenIcon";
import React, { useContext, useEffect } from "react";
import { BlogContext } from "../App";
import DeleteIcon from "../assets/DeleteIcon";
import { BlogContextType, BlogListPropType } from "../types";

export const BASE_URL = `https://faas-blr1-8177d592.doserverless.co/api/v1/web/fn-cbbb23a4-4c66-405a-a8ca-d4f8d4312270/blogs`;

const BlogList: React.FC<BlogListPropType> = ({ handleEdit }) => {
  const { blogs, setBlogs } = useContext(BlogContext) as BlogContextType;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/getBlogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`${BASE_URL}/deleteBlogs?id=${id}`)
      .then((res) => setBlogs(blogs.filter((b) => b._id !== id)))
      .catch((err) => console.log(err));
  };

  if (blogs.length === 0)
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return (
    <div className="container-fluid mt-3 gx-0">
      {blogs?.map(({ _id, title, body }) => (
        <div key={_id} className="card col-8 m-auto mb-3">
          <div className="card-header fs-4">
            {title}

            <span className="float-end" onClick={(e) => e.stopPropagation()}>
              <span
                className="btn border-0 p-0 mx-3  pointer"
                onClick={() => handleDelete(_id)}
              >
                <DeleteIcon />
              </span>
            </span>
            <span className="float-end" onClick={(e) => e.stopPropagation()}>
              <span
                className="btn border-0 p-0 mx-3 pointer"
                onClick={() => handleEdit(_id)}
              >
                <PenIcon />
              </span>
            </span>
          </div>
          <div className="card-body">
            <p className="card-text fst-italic">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
