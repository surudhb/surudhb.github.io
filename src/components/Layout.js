import React, { useState } from "react"
import "../styles/global.scss"
import "./Icons.js"
import { Container } from "react-bootstrap"
import Header from "./Header"
import Footer from "./Footer"

export default ({ children }) => {
  const [state, setState] = useState({
    appThemes: ["rebellion", "empire"],
    selectedTheme: 0,
  })

  const { appThemes, selectedTheme } = state
  const handleChangeTheme = e => {
    setState({
      appThemes,
      selectedTheme: (selectedTheme + 1) % appThemes.length,
    })
  }

  const themeClass = `theme-${appThemes[selectedTheme]}`

  return (
    <Container fluid className={themeClass}>
      <Container fluid className="px-0 app-container">
        <Header />
        <Container fluid="lg" className="min-vh-100">
          {children}
        </Container>
        <Footer handler={handleChangeTheme} />
      </Container>
    </Container>
  )
}
