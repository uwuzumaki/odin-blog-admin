import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./Create.css";

const Create = () => {
  const [post, setPost] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const submitPost = async (data) => {
    // const url = "http://localhost:3000/post";
    // const data = { title: title, content: post };
    // try {
    //   const post = await axios.post(url, data, { withCredentials: true });
    //   setFullPost(post);
    // } catch (err) {
    //   console.log(err);
    // }
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="mx-auto flex w-[80%] flex-1 flex-col justify-center">
      <form
        onSubmit={handleSubmit(submitPost)}
        className="mx-auto flex min-h-[40vh] w-[80%] flex-col rounded border border-blue-400 bg-slate-50 px-4"
      >
        <input
          className="my-6 w-full bg-white px-2 focus:outline-none"
          placeholder="Title"
          required
          {...register("title", {
            required: "Please include a title.",
            minLength: {
              value: 10,
              message: "Title must be at least 10 characters long.",
            },
          })}
        ></input>
        <ReactQuill
          className="flex max-h-1/1 flex-1 flex-col rounded shadow"
          theme="snow"
          value={post}
          onChange={setPost}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
        <input
          className="my-4 max-w-full cursor-pointer self-start rounded border border-blue-500 bg-blue-400 px-2 py-1 font-bold text-white"
          type="submit"
          value="Create Post"
        />
      </form>
    </div>
  );
};

export default Create;
