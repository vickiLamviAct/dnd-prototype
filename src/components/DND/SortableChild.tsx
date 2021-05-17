import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Paper, Typography } from "@material-ui/core";

interface Props {
  title: any;
  components?: any[];
}

export default function SortableChild(props: Props){
  const { title, components } = props;
  const sortable = useSortable({id: title});
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = sortable;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      key={title}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ? transition : "none",
      }}
      {...props}
      {...attributes}
      {...listeners}
    >
      <Paper
        style={{
          height: 250, 
          backgroundColor: "#F6F6F6",
          textAlign: "center"
        }}
      >
        <Typography variant="h4" style={{ paddingTop: 20 }}>{`child-${title}`}</Typography>
        {components && (
          components.map((c) => { return c })
        )}
      </Paper>
    </Grid>
  );
}