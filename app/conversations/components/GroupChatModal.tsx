"use client";

import Input from "@inputs/Input";
import Select from "@inputs/Select";
import { User } from "@prisma/client";
import axios from "axios";
import Button from "components/Button";
import Modal from "components/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface GroupChatModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-200">
                Create a chat with more than 2 people
              </p>
              <div className="mt-10 flex flex-col gap-y-8">
                <Input
                  register={register}
                  disabled={isLoading}
                  label="Name"
                  id="name"
                  errors={errors}
                />
                <Select
                  disabled={isLoading}
                  label="Members"
                  onChange={(value) =>
                    setValue("members", value, { shouldValidate: true })
                  }
                  value={members}
                  options={users.map((user) => ({
                    value: user.id,
                    label: user.name,
                  }))}
                />
              </div>
            </h2>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isLoading}
            onClick={onClose}
            type="button"
            secondary
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default GroupChatModal;
