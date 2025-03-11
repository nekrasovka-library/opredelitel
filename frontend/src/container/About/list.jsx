import React, { useContext } from "react";
import { ListStyles } from "./about.styles";
import { OpredelitelContext } from "../../context";
import { listData } from "../../context/data";

const List = () => {
  const { paperSelected, paperType, setPaperSelected, setIsIntersected } =
    useContext(OpredelitelContext);

  const handlePaperSelected = (id) => {
    setIsIntersected(false);
    setPaperSelected(id === paperSelected ? "" : id);
  };

  return (
    <ListStyles>
      {listData[paperType].map((item) => {
        return (
          <div key={item.id}>
            <span onClick={() => handlePaperSelected(item.id)}>
              {item.title}
            </span>
            <ul>
              {item.lists.map((list) => {
                return (
                  <li
                    key={list.id}
                    onClick={() => handlePaperSelected(item.id)}
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </ListStyles>
  );
};

export default List;
