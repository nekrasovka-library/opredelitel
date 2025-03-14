import React, { useContext } from "react";
import { ListStyles } from "./about.styles";
import { OpredelitelContext } from "../../context";
import { listData } from "../../context/data";

const List = () => {
  const { paperType } = useContext(OpredelitelContext);

  return (
    <ListStyles>
      {listData[paperType].map((item) => {
        return (
          <div key={item.id}>
            <span>
              <a href={`${item.id}`}>{item.title}</a>
            </span>
            <ul>
              {item.lists.map((list) => {
                return (
                  <li key={list}>
                    <a href={`${item.id}`}>{list}</a>
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
