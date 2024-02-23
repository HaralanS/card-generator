import { Routes, Route, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import './detailsbutton.css'

function Details() {
  const navigate = useNavigate()
  const location = useLocation()
  const character = location.state.character

  function goToHome() {
    navigate('/')
  }
  const [classe, setClasse] = useState('')
  const handleClass = () => {
    if (character.type == "heroi") {
      setClasse('cgreen')
    } else if (character.type == "vilao") {
      setClasse('cred')
    }
  }
  useEffect(handleClass, [character.tipo])

  return (
    <div className="cp-bg-img">
      <div className="cp-opacity">
        <div className={`char-page-container ${classe}`}>
          <h1 className="charpage-name">{character.name}</h1>
          <img className="charpage-img" src={character.image} alt="character" />
          <div className="data-container">
            <h2 className="details-prop">Tipo:</h2>
            <p>{character.type}</p>
            <h2 className="details-prop">Descricao:</h2>
            <p>{character.description}</p>
            
          </div>


          <button className="go-home-button" onClick={goToHome}>Home</button>
        </div>
      </div>

    </div>

  )
}

export default Details