"use client";

import axios from "axios";
import useConversation from "hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import toast from "react-hot-toast";
const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });

    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .catch(() => toast.error("Sending message failed!"));
  };

  const handleUpload = (result: any) => {
    axios
      .post("/api/messages", {
        image: result?.info?.secure_url,
        conversationId,
      })
      .catch(() => toast.error("Uploading file failed!"));
  };

  return (
    <div className="py-2 px-4 bg-white dark:bg-darkSideBar border-t dark:border-t-slate-950 flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        className="dark:bg-darkBg"
        onUpload={handleUpload}
        uploadPreset="hq95bnha"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Form;
