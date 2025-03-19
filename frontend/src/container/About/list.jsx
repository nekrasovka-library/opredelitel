import React, { useContext, useEffect, useState } from "react";
import { ListStyles } from "./about.styles";
import { OpredelitelContext } from "../../context";
import { Link } from "react-router-dom";

const List = () => {
  const ITEMS_PER_COLUMN = 9; // Зависит от высоты и стилизации
  const { lists } = useContext(OpredelitelContext);
  const [columns, setColumns] = useState([]);

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
            <div key={item.id}>
              <Link to={`/opredelitel/${item.id}`}>{item.title}</Link>
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
