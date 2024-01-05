"use client";
import React, { useRef, useState } from "react";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { updateList } from "@/services";
import { toast } from "sonner";
import { useAction } from "@/hooks/useAction";
import useEventListner from "@/lib/eventLisnter";
import ListOptions from "./ListOptions";

const Listheader = ({ list }) => {
  const [title, setTitle] = useState(list?.title);
  const [isEditable, setIsEditable] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const enableEditing = () => {
    setIsEditable(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const { result } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`${data.title} updated`);
      setTitle(data.title);
      setIsEditable(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = async (formData) => {
    const title = formData.get("title");
    const id = formData.get("id");
    if (title == list.title) {
      return setIsEditable(false);
    }
    result({ title, id });
  };

  const onKeyDown = (e) => {
    if (e.key == "Escape") {
      setIsEditable(false);
    }
  };

  useEventListner("keydown", onKeyDown);
  return (
    <div className="px-2 text-sm font-semibold flex justify-between items-center">
      {isEditable ? (
        <form action={handleSubmit} ref={formRef}>
          <input hidden id="id" name="id" value={list.id} />
          <FormInput
            ref={inputRef}
            id="title"
            defaultValue={title}
            className="w-full rounded-md text-sm py-1 px-2 h-7 border-transparent font-medium focus:outline-none hover:border-input focus:border-2 focus:border-white transition"
            placeholder="Enter list name"
            errors={"errors"}
          />
          <div className="flex items-center justify-between">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="bg-black text-white"
            >
              update List
            </Button>
            <button onClick={() => setIsEditable(false)}>
              <X className="h-5 w-5 text-white" />
            </button>
          </div>
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 h-7 text-white border-transparent font-semibold"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
      <ListOptions list={list} />
    </div>
  );
};

export default Listheader;
