import React, { useContext, useEffect, useState } from "react";
import { ListStyles } from "./about.styles";
import { OpredelitelContext } from "../../context";

const List = () => {
  const ITEMS_PER_COLUMN = 9; // Зависит от высоты и стилизации
  const { paperSelected, setPaperSelected, lists } =
    useContext(OpredelitelContext);
  const [columns, setColumns] = useState([]);

  const handlePaperSelected = (id) => {
    const newId = id === paperSelected ? "" : id;
    setPaperSelected(newId);
    window.history.replaceState({}, "", `/opredelitel/${newId}`);
  };

  const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }

    return result;
  };

  useEffect(() => {
    setColumns(chunkArray(lists, ITEMS_PER_COLUMN));
  }, [lists]);

  return (
    <ListStyles>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex}>
          {column.map((item) => (
            <div key={item.id} onClick={() => handlePaperSelected(item.id)}>
              <span>{item.title}</span>
              <ul>
                {item.lists.map((list) => (
                  <li key={list}>{list.title}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </ListStyles>
  );
};

export default List;
