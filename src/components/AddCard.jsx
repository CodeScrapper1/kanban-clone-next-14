"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Separator } from "./ui/separator";
import TextArea from "./TextArea";
import { useAction } from "@/hooks/useAction";
import { createCard } from "@/services";
import { toast } from "sonner";

const AddCard = ({ list }) => {
  const { result, fieldError } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`${data.title} created`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const submit = (formData) => {
    const title = formData.get("title");

    result({ title, listId: list.id });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button varient="ghost" className="text-white w-full justify-end">
          <Plus className="h-4 w-4 mr-2" />
          Add Card
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 bg-white">
        <Separator />
        <form action={submit}>
          <TextArea
            id="title"
            placeholder="Enter card title"
            errors={fieldError}
            className="outline-none border border-slate-300"
          />
          <Button
            varient="ghost"
            type="submit"
            className="rounded-none w-full h-auto px-5 py-2 text-sm"
          >
            Add a card
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default AddCard;
