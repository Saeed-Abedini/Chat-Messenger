"use client";

import Input from "@inputs/Input";
import { User } from "@prisma/client";
import axios from "axios";
import Button from "components/Button";
import Modal from "components/Modal";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsModal = ({
  currentUser,
  onClose,
  isOpen,
}: SettingsModalProps) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
      theme: localStorage.getItem("theme") === "dark",
    },
  });

  const image = watch("image");
  const theme = watch("theme");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const handleClose = () => {
    reset({
      name: currentUser?.name,
      image: currentUser?.image,
      theme: localStorage.getItem("theme") === "dark",
    });
    onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (theme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Profile
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Edit your public information
            </p>
            <div className="mt-3 flex flex-col gap-y-4">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                register={register}
                required
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-2">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.png"
                    }
                    alt="avatar"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="hq95bnha"
                    className="dark:text-white"
                  >
                    <div>
                      <Button disabled={isLoading} secondary type="button">
                        Change
                      </Button>
                    </div>
                  </CldUploadButton>
                </div>
              </div>

              <h2 className="border-t pt-2 text-base font-semibold text-gray-900 dark:text-white">
                Settings
              </h2>
              <div className="flex items-center gap-3">
                <div className="py-3.5 text-sm font-medium text-gray-900 dark:text-white">
                  Dark mode :
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="peer sr-only opacity-0"
                    id="toggleTheme"
                    {...register("theme")}
                  />
                  <label
                    htmlFor="toggleTheme"
                    className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-400 px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-darkBg dark:peer-checked:bg-darkBg peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-slate-900 dark:peer-checked:peer-focus-visible:outline-darkBg "
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              disabled={isLoading}
              secondary
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
