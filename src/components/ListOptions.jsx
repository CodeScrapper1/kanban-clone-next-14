"use client";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { toast } from "sonner";
import { copyList, deleteList } from "@/services";

const ListOptions = ({ list }) => {
  const { result: copyListresult } = useAction(copyList, {
    onsuccess: (data) => {
      toast.success(`${data.title} copied`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // delete list
  const { result: deleteListresult } = useAction(deleteList, {
    onsuccess: (data) => {
      toast.success(`${data.title} copied`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const listCopy = (formData) => {
    const id = formData.get("id");
    copyListresult({ id });
  };
  const listDelete = (formData) => {
    const id = formData.get("id");
    deleteListresult({ id });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button className="" varient="ghost">
          <MoreHorizontal className="h-4 w-4 text-white" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 bg-white">
        <Separator />
        <form action={listCopy}>
          <input hidden name="id" id="id" value={list.id} />
          <Button
            varient="ghost"
            className="rounded-none w-full h-auto px-5 py-2 text-sm"
          >
            Copy List
          </Button>
        </form>
        <Separator />
        <form action={listDelete}>
          <input hidden name="id" id="id" value={list.id} />
          <Button
            varient="ghost"
            className="rounded-none w-full h-auto px-5 py-2 text-sm"
          >
            Delete List
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
