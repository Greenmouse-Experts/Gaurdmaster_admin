import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getBlogTags, updateBlogPost } from "../../../services/api/blogApi";
import { uploadImage } from "../../../services/api/routineApi";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { TbArrowBackUpDouble } from "react-icons/tb";
import { toast } from "react-toastify";

const EditBlog = ({ item, refetch, close }) => {
  const { data: tags } = useQuery({
    queryKey: ["getBlogTags"],
    queryFn: getBlogTags,
  });
  const [isBusy, setIsBusy] = useState(false);
  const [postDetail, setPostDetail] = useState({
    title: item?.title || "",
    description: item?.description || "",
    brief: item?.brief || "",
  });
  const [oldTags, setOldTags] = useState([])
  const getDefaultTags = () => {
    const filteredArray = tags?.data.filter((items) =>
      item?.tags.some((filterItem) => filterItem.id === items.id)
    );
    setOldTags(filteredArray.map(({ id, tag }) => ({ id: id, name: tag })),)
  };
  useEffect(() => {
    if(tags){
      getDefaultTags()
    }
  }, [tags])
  const handleChange = (name, value) => {
    setPostDetail({ ...postDetail, [name]: value });
  };
  const [showTag, setShowTag] = useState(false);
  const [addedTags, setAddedTags] = useState([]);
  const handleAdd = (item) => {
    const payload = {
      name: item.tag,
      id: item.id,
    };
    const filter = addedTags.filter((where) => where.id === item.id);
    if (!filter.length) {
      setAddedTags([...addedTags, payload]);
    } else {
      toast.info("Tag Already added");
    }
  };
  const handleRemove = (item) => {
    const check = addedTags.filter((where) => where.id !== item);
    setAddedTags(check);
  };
  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      const payload = {
        ...postDetail,
        // tags: addedTags.map(({ id }) => ({ id: id })),
        coverImage: data.image,
      };
      updateBlogPost(item?.id, payload)
        .then((res) => {
          toast.success('Blog updated successfully');
          setIsBusy(false);
          refetch();
          close();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsBusy(false);
        });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      setIsBusy(false);
    },
  });
  const submitAction = (e) => {
    e.preventDefault();
    setIsBusy(true);
    const payload = {
      ...postDetail,
      // tags: addedTags.map(({ id }) => ({ id: id })),
    };
    if (postDetail.coverImage) {
      const fd = new FormData();
      fd.append("image", postDetail.coverImage);
      mutation.mutate(fd);
    } else {
      updateBlogPost(item?.id, payload)
        .then((res) => {
          toast.success('Blog updated successfully');
          setIsBusy(false);
          refetch();
          close();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setIsBusy(false);
        });
    }
  };
  return (
    <div className="">
      <div className="mb-7 mt-7 flex justify-between items-center">
        <p className="text-2xl fw-600">Edit Blog Post</p>
        <p className="flex items-center gap-x-2 cursor-pointer" onClick={() => close()}><TbArrowBackUpDouble/>Back</p>
      </div>
      <div className="">
        <form action="" onSubmit={submitAction}>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="input">
                <label>Blog Title</label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Program Title"
                    className="bg-transparent"
                    value={postDetail.title}
                    required
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
              </div>
              <div className="input">
                <label>Blog Brief</label>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Program Title"
                    value={postDetail.brief}
                    className="bg-transparent"
                    required
                    onChange={(e) => handleChange("brief", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="input">
                <label>Blog Description</label>
                <div>
                  <textarea
                    placeholder="Enter Program Description"
                    value={postDetail.description}
                    className="h-36 w-full bg-transparent"
                    required
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex items-end gap-x-5">
              <div className="input w-full">
                <label>Blog Cover Image</label>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleChange("coverImage", e.target.files[0])
                    }
                  />
                </div>
              </div>
              <div className="shrink-0">
                <img
                  src={item.coverImage}
                  alt="prevImage"
                  className="w-36 shrink-0"
                />
              </div>
            </div>
            <div>
              <p>Blog Tags</p>
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="border flex justify-between pr-2 items-center rounded-lg w-full border-gray-900 cursor-pointer">
                    <p
                      className="p-4 w-full"
                      onClick={() => setShowTag(!showTag)}
                    >
                      Click to add tags
                    </p>
                    {showTag ? (
                      <RiArrowDropDownLine
                        className="text-2xl"
                        onClick={() => setShowTag(false)}
                      />
                    ) : (
                      <RiArrowDropUpLine
                        className="text-2xl"
                        onClick={() => setShowTag(true)}
                      />
                    )}
                  </div>
                  {showTag && (
                    <div className="h-[200px] overflow-y-auto bg-white shadow p-2">
                      {tags?.data
                        .filter((where) => where.isPublished)
                        .map((item) => (
                          <div
                            className="p-2 bg-gray-50 hover:bg-gray-200 cursor-pointer"
                            key={item.id}
                            onClick={() => handleAdd(item)}
                          >
                            <p className="">{item.tag}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                <div>
                  <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
                    {[...oldTags, ...addedTags].map((item) => (
                      <div
                        className="border border-gray-400 flex justify-between rounded-lg px-3 py-1"
                        key={item.id}
                      >
                        <p>{item.name}</p>
                        <MdOutlineCancel
                          className="text-xl cursor-pointer shrink-0"
                          onClick={() => handleRemove(item.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 flex justify-end">
            <button className="btn-primary w-full py-3 fw-500 lg:text-lg">
              {isBusy ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
