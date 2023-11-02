import { Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const onClick = () => {
    navigate("/");
  }
  return (
    <div style={{ backgroundColor: "#ddffdd", minHeight: "40px", padding: "5px" }}>
      <Container maxWidth="xl">
        <span onClick={onClick} style={{ "float": 'left', fontSize: "24px", cursor: "pointer" }}>
          🌱SeedStories
        </span>
      </Container>
    </div>
  )
}

export default Header