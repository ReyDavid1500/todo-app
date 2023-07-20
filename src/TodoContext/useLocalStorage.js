import React from "react";

//Se abstraen todas las variables para crear el Custom Hook
function useLocalStorage(itemName, initialValue) {
  //Toma el valor inicial para esperar que cargue el localStorage con useEffect
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  //El useEffect hace que esta parte del código se cargue de último, lo que da
  //tiempo de carga a los eventos asincronos. 
  React.useEffect(() => {
    setTimeout(() => {
      try {
        //Con esas lineas se define el valor inicial de localStorage
        const localStorageItem = localStorage.getItem(itemName);
        //Se inicializa esta variable para retornar los valores de localStorage
        let parsedItem;
        //Acá se maneja el error en caso de que localStorage este vacío
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = [];
        } else {
          parsedItem = JSON.parse(localStorageItem);
          setItem(parsedItem); 
        }
  
        setLoading(false);
      } catch(error) {
        setLoading(false);
        setError(true); 
      }
    }, 2000);
  }, [])
  //Esta función permite que se guarden los cambios en localStorage
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };
  //Las funciones siempre tienen que tener un return! 
  return {
    item,
    saveItem,
    loading,
    error
  };
}

export { useLocalStorage }