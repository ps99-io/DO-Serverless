import React, { createContext, useEffect, useState } from "react";
import Nav_Bar from "./components/Nav_Bar";
import BlogList from "./pages/BlogList";
import { BlogArr, BlogContextType, BlogType } from "./types";
import Modal from "./components/Modal";

export const BlogContext = createContext<BlogContextType | null>(null);

function App() {
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState<BlogArr>([]);
  const [editBlogId, setEditBlogId] = useState<string>();
  const handleEdit = (id: string) => {
    setEditBlogId(id);
    setShowModal(!showModal);
  };
  const toggleModal = () => setShowModal(!showModal);
  return (
    <div className="container-fluid gx-0">
      <BlogContext.Provider
        value={{
          blogs,
          setBlogs,
          toggleModal,
          showModal,
          editBlogId,
          setEditBlogId
        }}
      >
        <Nav_Bar toggleModal={toggleModal} />
        {/* <Container /> */}
        <BlogList handleEdit={handleEdit} />
        {showModal && <Modal />}
      </BlogContext.Provider>
    </div>
  );
}

export default App;
