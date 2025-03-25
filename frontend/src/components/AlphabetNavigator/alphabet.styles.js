import styled from "styled-components";
import { Link } from "react-router-dom";

const Navigation = styled.nav`
  @media (min-width: 641px) {
    background-color: #000;
    height: 60px;
    width: 100%;
    position: fixed;
    transform: translateY(${({ $isVisible }) => ($isVisible ? "0" : "-60px")});
    transition: transform 0.3s ease;
    top: 0;
    z-index: 100;

    display: flex;
    justify-content: center;
    padding: 0;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  span {
    cursor: pointer;
    font-size: 25px;
    color: #ffffff;
    padding: 15px;

    ${({ $isActive }) => $isActive && "background-color: #fff; color: #000"};
  }
`;

const Dropdown = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #fff;
  padding: 15px;
  z-index: 100;
  font-size: 14px;
  min-width: 200px;

  > div {
    > div {
      cursor: pointer;
    }
  }
`;

const ItemTitle = styled(Link)`
  color: #222222;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  line-height: 1.6;
  font-size: 12px;
  text-decoration: none;
`;

export { Navigation, NavItem, Dropdown, ItemTitle, List, ListItem };
