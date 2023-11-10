import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContainer from '../auth/AuthContainer'

const Header = () => {
  const navigate = useNavigate();
  const isMobile = window.screen.width < 600;
  const onClick = () => {
    navigate("/");
  }
  const onClickBank = () => {
    navigate("/bank");
  }
  const onClickNotebook = () => {
    navigate("/notebook");
  }
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#ddffdd", minHeight: "50px", padding: "5px" }}>
      <span onClick={onClick} style={{ "float": 'left', fontSize: "24px", cursor: "pointer" }}>
        🌱{!isMobile && <span>SeedStories</span>}
      </span>
      {!isMobile &&
        <span>
          <span onClick={onClickBank} style={{ "float": 'left', fontSize: "20px", cursor: "pointer", marginLeft: "10px", color: "grey" }}>
            bank
          </span>
          <span onClick={onClickNotebook} style={{ "float": 'left', fontSize: "20px", cursor: "pointer", marginLeft: "10px", color: "grey" }}>
            notebook
          </span>
        </span>
      }
      <span style={{ float: "right" }} >
        <AuthContainer />
      </span>
    </Container>
  )
}

export default Header