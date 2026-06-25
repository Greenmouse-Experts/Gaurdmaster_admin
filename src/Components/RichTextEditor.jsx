import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ],
};

const RichTextEditor = ({ value, onChange, placeholder }) => {
  return (
    <ReactQuill
      theme="snow"
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder}
      modules={modules}
      className="bg-white [&_.ql-container]:min-h-[160px] [&_.ql-editor]:min-h-[160px]"
    />
  );
};

export default RichTextEditor;
