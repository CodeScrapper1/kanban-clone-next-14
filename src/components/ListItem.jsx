import React from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import Listheader from "./Listheader";
import AddCard from "./AddCard";
import CardItem from "./CardItem";
import { cn } from "@/lib/utils";

const ListItem = ({ index, key, color, list }) => {
  return (
    <Draggable draggableId={list.id} index={index} key={key}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <AddCard list={list} />
          <div
            {...provided.dragHandleProps}
            className={`${color.bgColor} w-full py-2`}
          >
            <Listheader list={list} />
            <Droppable droppableId={list.id} type="card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2 rounded-md",
                    list.cards?.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {list?.cards?.map((card, index) => (
                    <CardItem
                      index={index}
                      key={card.id}
                      card={card}
                      cardColor={color.cardColor}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default ListItem;
