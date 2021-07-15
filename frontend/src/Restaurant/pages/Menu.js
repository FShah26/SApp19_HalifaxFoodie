
import Navbar from "../components/Navbar";
import "../css/Menu.css"
import React, {useEffect, useState} from "react";
import {Card,Button} from 'react-bootstrap';
import { useHistory } from 'react-router';
import Axios from 'axios';
import { PlusSquareFill,PencilSquare,TrashFill } from 'react-bootstrap-icons';

const Menu = () => {
  
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
};

export default Menu;
