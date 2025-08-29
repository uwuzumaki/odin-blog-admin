import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./Create.css";

const Create = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const submitPost = async (data) => {
    const url = `${import.meta.env.VITE_URL}/post`;
    const postData = { title: data.title, content: data.content };
    try {
      const post = await axios.post(url, postData, { withCredentials: true });
      navigate(`/post/${post.data.id}`);
    } catch (err) {
      console.log(err);
    }
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
          {...register("title", {
            required: "Please include a title.",
            minLength: {
              value: 10,
              message: "Title must be at least 10 characters long.",
            },
          })}
        />
        <Controller
          name="content"
          defaultValue=""
          control={control}
          rules={{
            validate: (value) => {
              if (!value || value === "<p><br></p>") {
                return "Your post can't be empty.";
              }
              const textContent = value?.replace(/<[^>]*>/g, "").trim() || "";
              if (!textContent) {
                return textContent.length > 0 || "Your post can't be empty.";
              }
              if (textContent.length < 10) {
                return "Your post has to be at least 10 characters long.";
              }
              return true;
            },
            minLength: {
              value: 10,
              message: "Your post has to be at least 10 characters long.",
            },
          }}
          render={({ field }) => (
            <ReactQuill
              className="flex max-h-1/1 flex-1 flex-col rounded shadow"
              theme="snow"
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
        {errors.content && (
          <span className="text-red-500">{errors.content.message}</span>
        )}
        <button
          disabled={isSubmitting}
          className="my-4 max-w-full cursor-pointer self-start rounded border border-blue-500 bg-blue-400 px-2 py-1 font-bold text-white"
          type="submit"
          value="Create Post"
        >
          {isSubmitting ? "Loading..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default Create;
