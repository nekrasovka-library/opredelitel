import styled from "styled-components";

const Navigation = styled.nav`
  @media (min-width: 641px) {
    background-color: #000;
    height: 60px;
    width: 100%;
    position: fixed;
    transform: translateY(${({ isVisible }) => (isVisible ? "0" : "-60px")});
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
  cursor: pointer;
  position: relative;

  span {
    font-size: 25px;
    font-weight: 400;
    color: #ffffff;
    padding: 15px;

    ${({ isActive }) => isActive && "background-color: #fff; color: #000"};
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
  text-decoration: underline;
  min-width: 200px;
`;

const ItemTitle = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
`;

const ListItem = styled.li`
  line-height: 1.6;
  font-size: 12px;
  cursor: pointer;
`;

export { Navigation, NavItem, Dropdown, ItemTitle, List, ListItem };
