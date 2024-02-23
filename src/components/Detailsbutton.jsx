import { Routes, Route, BrowserRouter, Navigate, useNavigate } from "react-router-dom";

function Detailsbutton({character}) {
  const navigate = useNavigate()
  
  function goToChar() {
    navigate("/details", { state: { character } })
  }
  return (
    <button className='card-button' onClick={goToChar}>Detalhes</button>
  )
}

export default Detailsbutton