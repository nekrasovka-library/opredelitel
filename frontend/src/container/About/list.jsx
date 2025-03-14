import React, { useContext } from "react";
import { ListStyles } from "./about.styles";
import { OpredelitelContext } from "../../context";
import { listData } from "../../context/data";

const List = () => {
  const { paperType, paperSelected, setPaperSelected } =
    useContext(OpredelitelContext);

  const handlePaperSelected = (id) => {
    const newId = id === paperSelected ? "" : id;
    setPaperSelected(newId);
    window.history.replaceState({}, "", `/opredelitel/${newId}`);
  };

  return (
    <ListStyles>
      {listData[paperType].map((item) => {
        return (
          <div key={item.id} onClick={() => handlePaperSelected(item.id)}>
            <span>{item.title}</span>
            <ul>
              {item.lists.map((list) => {
                return <li key={list}>{list}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </ListStyles>
  );
};

export default List;
