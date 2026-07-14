import React from 'react';
import Item from './Item';

function List({ items, deleteItem, editItem, toggleCompleteItem }) {
  return (
    <ul>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          editItem={editItem}
          toggleCompleteItem={toggleCompleteItem}
        />
      ))}
    </ul>
  );
}

export default List;