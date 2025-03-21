import React, {useEffect} from 'react';
import useUser from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRoute({children}) {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading} = useUser()
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate])
  if (isLoading) return <FullPage><Spinner/></FullPage>

  return children;
}

export default ProtectedRoute;