import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid } from "@material-ui/core";

interface Props {
  url: any;
}

export default function SortableChild(props: Props){

  const sortable = useSortable({id: props.url});
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    //aaa
    <Grid
      item
      xs={12}
      sm={6}
      key={props.url}
      ref={setNodeRef}
      //style={{style}}
      {...props}
      {...attributes}
      {...listeners}
    >
    <img src={props.url} />
    </Grid>
  );
}
