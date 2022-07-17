export interface BlogType {
  _id: string;
  title: string;
  body: string;
}

export type BlogArr = BlogType[];

export interface BlogContextType {
  blogs: BlogArr;
  setBlogs: React.Dispatch<React.SetStateAction<BlogArr>>;
  setEditBlogId: React.Dispatch<React.SetStateAction<string | undefined>>;
  toggleModal: () => void;
  showModal: boolean;
  editBlogId: string | undefined;
}

export interface ModalProps {}

export interface BlogListPropType {
  handleEdit: (id: string) => void;
}
