import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  DragStartEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  Grid,
  IconButton
} from "@material-ui/core";
import {
  HighlightOff, 
  CheckCircle
} from "@material-ui/icons";

import SortableChild from "./SortableChild";

export enum Position {
  Before = -1,
  After = 1,
}

export enum Layout {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
  Grid = 'grid',
}

interface Props {
  layout: Layout;
}

const defaultInitializer = (index: number) => index;

export function createRange<T = number>(
  length: number,
  initializer: (index: number) => any = defaultInitializer
): T[] {
  return [...new Array(length)].map((_, index) => initializer(index));
}

export default function GridContainer({layout}: Props) {
  const [activeId, setActiveId] = useState<number | null>(0);
  const [items, setItems] = useState(() =>
    createRange<string>(20, (index) => `${index + 1}`)
  );
  const activeIndex: number = activeId ? activeId : -1;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div style={{
      overflowX: "hidden",
      marginLeft: 20,
      width: "97%",
    }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid 
            container
            justify="space-between"
            spacing={3}
          >
            {items.map((item: any, idx: number) => {
                if((idx+1) % 5 === 0){
                  const components = [
                    <IconButton
                      style={{ 
                        margin: 5,
                      }}
                      onClick={() => {
                        alert("Hello");
                      }}
                    >
                      <CheckCircle />
                    </IconButton>
                    ,
                    <IconButton
                      style={{ 
                        margin: 5,
                      }}
                      onClick={() => {
                        alert("World");
                      }}
                    >
                      <HighlightOff />
                    </IconButton>
                    
                  ]
                  return <SortableChild title={item} components={components} />
                }
                return <SortableChild title={item} />
              })
            }
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true}>
          {activeId ? (
            <div>{activeId === null}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );

  function handleDragStart({active}: DragStartEvent) {
    setActiveId(Number(active.id));
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  function handleDragEnd({over}: DragEndEvent) {
        if (over) {
      const overIndex = items.indexOf(over.id);

      if (activeIndex !== overIndex) {
        const newIndex = overIndex;

        setItems((items: any) => arrayMove(items, activeIndex, newIndex));
      }
    }

    setActiveId(null);
  }
}

