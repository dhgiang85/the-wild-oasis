import React from 'react';
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiArrowLeftOnRectangle} from "react-icons/hi2";
import useLogout from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

function Logout() {
  const {isLoading, logout} = useLogout();
  return (
    <ButtonIcon onClick={logout}>{isLoading ? <SpinnerMini/> : <HiArrowLeftOnRectangle/>}</ButtonIcon>
  );
}

export default Logout;