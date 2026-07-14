import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value, completed: false }]);
    }
  };

  const deleteItem = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  const toggleCompleteItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const clearAllItems = () => {
    const confirmar = window.confirm("¿Estás seguro de que deseas borrar TODOS los elementos?");
    if (confirmar) {
      setItems([]);
    }
  };

  const filteredItems = items.filter(item => 
    item.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      
      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      
      <input
        type="text"
        className="search-input"
        placeholder="Buscar elemento..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="list-actions">
        <span className="counter">Total: {filteredItems.length}</span>
        {items.length > 0 && (
          <button className="btn-clear-all" onClick={clearAllItems}>
            Borrar Todo
          </button>
        )}
      </div>
      
      <List 
        items={filteredItems} 
        deleteItem={deleteItem} 
        editItem={editItem} 
        toggleCompleteItem={toggleCompleteItem} 
      />
    </div>
  );
}

export default App;