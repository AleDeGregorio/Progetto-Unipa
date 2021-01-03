/*CSS FATTO*/

import React from "react";
//import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"

import "./InserimentoProprietà.css";


class InserimentoProprietà extends React.Component {
  
 render(){
  return (
    <div className="background">
    <div className="containerNewSelezione">  
      <div className="contentNew">
        <form >
          <h2>Seleziona il tipo di struttura che stai inserendo</h2>
          <Form.Group>
            <Form.Row className="justify-content-center">
            <a className="bottoniScelta" href="/InserimentoCasaVacanza">
              Casa Vacanza
            </a>
            <a  className="bottoniScelta" href="/InserimentoBnB">
              B&B
            </a>
            <a className="bottoniScelta" href="/ElencoBnB2">
              Stanza B&B
            </a>
            </Form.Row>
          </Form.Group>
        </form>
      </div>
    </div>
    </div>
  );}
}

export default InserimentoProprietà;
