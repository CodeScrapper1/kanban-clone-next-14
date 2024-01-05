"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ListItem from "./ListItem";
import CreateList from "./CreateList";
import { useAction } from "@/hooks/useAction";
import { updateCard, updateListOrder } from "@/services";
import { toast } from "sonner";

function reorder(list, startIndex, endIndex) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const ListContainer = ({ lists }) => {
  const [listData, setListData] = useState(lists);

  useEffect(() => {
    setListData(lists);
  }, [lists]);

  // update list
  const { result } = useAction(updateListOrder, {
    onSuccess: () => {
      toast.success(`list order updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // update cards
  const { result: updateCards } = useAction(updateCard, {
    onSuccess: () => {
      toast.success(`list order updated`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDragEnd = (draggedData) => {
    const { destination, source, type } = draggedData;

    if (!destination) return;

    if (
      destination?.droppableId == source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type == "list") {
      const items = reorder(listData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );
      setListData(items);
      result({ items });
    }

    if (type == "card") {
      let newOrderedData = [...listData];

      const sourceList = newOrderedData.find(
        (list) => list.id == source.droppableId
      );

      const destinationList = newOrderedData.find(
        (list) => list.id == destination.droppableId
      );

      if (!sourceList || !destinationList) return;
      if (!sourceList.cards) sourceList.cards = [];
      if (!destinationList.cards) destinationList.cards = [];

      if (source.droppableId == destination.droppableId) {
        const reOrderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );
        reOrderedCards.forEach((card, idx) => {
          card.order = idx;
        });
        sourceList.cards = reOrderedCards;
        setListData(newOrderedData);
        updateCards({ items: destinationList.cards });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;

        destinationList.cards.splice(destination.index, 0, movedCard);
        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        destinationList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setListData(newOrderedData);
        updateCards({ items: destinationList.cards });
      }
    }
  };

  const colors = [
    { bgColor: "bg-[#6B240C]", cardColor: "bg-[#994D1C]" },
    { bgColor: "bg-[#22092C]", cardColor: "bg-[#872341]" },
    { bgColor: "bg-[#190482]", cardColor: "bg-[#7752FE]" },
    { bgColor: "bg-[#159895]", cardColor: "bg-[#57C5B6]" },
    { bgColor: "bg-[#F4B183]", cardColor: "bg-[#FFD966]" },
    { bgColor: "bg-[#F4B183]", cardColor: "bg-[#FFD966]" },
  ];
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {listData.map((list, index) => (
              <ListItem
                key={list.id}
                index={index}
                list={list}
                color={colors[index]}
              />
            ))}
            {provided.placeholder}
            <CreateList />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ListContainer;
