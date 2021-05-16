import React from 'react';

interface Props {
  children: any[];
  columns: any;
}

export default function Grid(props: Props) {
  const { children, columns } = props;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridGap: 10,
        padding: 10,
      }}
    >
      {children}
    </div>
  );
}
