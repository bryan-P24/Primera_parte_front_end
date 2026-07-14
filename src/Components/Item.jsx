import React from 'react';

function Item({ item, deleteItem, editItem, toggleCompleteItem }) {
  return (
    <li className={item.completed ? "completed" : ""}>
      <div className="item-content">
        <input 
          type="checkbox" 
          checked={item.completed || false} 
          onChange={() => toggleCompleteItem(item.id)} 
          className="todo-checkbox"
        />
        <span className="item-text">
          {item.value}
        </span>
      </div>
      <div className="item-buttons">
        <button 
          className="btn-edit" 
          onClick={() => editItem(item)}
          disabled={item.completed} /* Deshabilita el botón si está completado */
          style={item.completed ? { opacity: 0.5, cursor: 'not-allowed' } : {}} /* Estilo visual de bloqueado */
        >
          Editar
        </button>
        <button className="btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;