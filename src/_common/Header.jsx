import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContainer from '../auth/AuthContainer'

const Header = () => {
  const navigate = useNavigate()
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
    <div style={{ backgroundColor: "#ddffdd", minHeight: "40px", padding: "5px" }}>
      <Container maxWidth="xl">
        <span onClick={onClick} style={{ "float": 'left', fontSize: "24px", cursor: "pointer" }}>
          🌱SeedStories
        </span>
        <span onClick={onClickBank} style={{ "float": 'left', fontSize: "20px", cursor: "pointer", marginLeft: "10px", color: "grey" }}>
          bank
        </span>
        <span onClick={onClickNotebook} style={{ "float": 'left', fontSize: "20px", cursor: "pointer", marginLeft: "10px", color: "grey" }}>
          notebook
        </span>
        <span style={{ float: "right" }} >
          <AuthContainer />
        </span>
      </Container>
    </div>
  )
}

export default Header