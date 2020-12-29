/*CSS FATTO*/

import React from "react";   
import { Button, Accordion, Card, Form, Col } from "react-bootstrap"
import {AiOutlineEdit} from 'react-icons/ai'

import "../InserisciProp/InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';

class ModificaBeB extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb : '',
      ref_proprietario: localStorage.getItem('email'),
      id_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.id_proprieta : '',
      nome_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.nome_proprieta : '',
      indirizzo: this.props.history.location.state ? this.props.history.location.state.dati_bb.indirizzo : '',
      localita: this.props.history.location.state ? this.props.history.location.state.dati_bb.localita : '',
      provincia: this.props.history.location.state ? this.props.history.location.state.dati_bb.provincia : '',
      tipo_proprieta: this.props.history.location.state ? this.props.history.location.state.dati_bb.tipo_proprieta : '',
      servizi: this.props.history.location.state ? this.props.history.location.state.dati_bb.servizi : '',
      descrizione: this.props.history.location.state ? this.props.history.location.state.dati_bb.descrizione : '',
      ref_proprieta_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb.ref_proprieta_bb : '',
      check_in: this.props.history.location.state ? this.props.history.location.state.dati_bb.check_in : '',
      check_out: this.props.history.location.state ? this.props.history.location.state.dati_bb.check_out : '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    const data1 = {
      nome_proprieta: this.state.nome_proprieta,
      indirizzo: this.state.indirizzo,
      localita: this.state.localita,
      provincia: this.state.provincia,
      tipo_proprieta: this.state.tipo_proprieta,
      servizi: this.state.servizi,
      ref_proprietario: this.state.ref_proprietario,
      descrizione: this.state.descrizione,
      id_proprieta: this.state.id_proprieta
    };

    fetch('http://localhost:9000/updateProprieta/fields', {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(data1)
    })
    .then((result) => {result.text()})
    .then((result) => {
      this.setState({ apiResponse: result });

      if(this.state.apiResponse && this.state.apiResponse.status === 'error') {
        this.setState({
          error: true,
          errorMessage: this.state.apiResponse.message
        });
      }
      else {
        const data2 = {
          check_in: this.state.check_in,
          check_out: this.state.check_out,
          ref_proprieta_bb: this.state.ref_proprieta_bb,
        };
    
        fetch('http://localhost:9000/updateBB/fields',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data2)
        })
        .then((result) => result.text())
        .then((result) => {
          this.setState({ apiResponse: result });
    
          if(this.state.apiResponse && this.state.apiResponse.status === 'error') {
            this.setState({
              error: true,
              errorMessage: this.state.apiResponse.message
            });
          }
          else {
            this.setState({ success: true });
          }
        });
      }
    });
  }

  render() {
    if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario')) {
      return <Redirect
          to={{
              pathname: "/ErrorPage",
              state: { 
                error: true,
                errorMessage: "Utente non autorizzato" 
              }
          }}
      />
    }
    else if(this.state.error) {
      return <Redirect 
        to = {{
          pathname: "/ErrorPage",
          state: {
            error: true,
            errorMessage: this.state.errorMessage
          }
        }}
      />
    }
    else if(this.state.success) {
      return (
        <div className = "Errore">
          <h1>Modifiche avvenute con successo!</h1>
          <p>Il tuo B&B è stato modificato correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      var bb = this.state.dati_bb ? this.state.dati_bb : '';

      return (
          <div className="background">
        <div className="containerNew">  
          <div className="contentNew">
          <h2>Modifica il tuo B&B con le informazioni che preferisci!</h2>
            <Accordion>
              <Card border="light">
                <div className="head-update">
                  <p>Nome :{bb.nome_proprieta}</p>
                  <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="1" />
                </div>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <form>
                  <label htmlFor = "nome_proprieta">Nome</label>
                <input
                  type = "text"
                  id = "nome_proprieta"
                  name = "nome_proprieta"
                  placeholder = "Inserisci nome proprietà"
                  onChange = {this.onChange}
                  className = "i"
                />
                <Button variant="primary" onClick = {this.onSubmit}>
                Modifica nome
              </Button>
              </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card border="light">
                <div className="head-update">
                <p>Località : {bb.localita}, {bb.indirizzo},{bb.provincia}</p>
                <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="2" />
                </div>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                  <form>
                  <label htmlFor = "localita">Città</label>
                <input
                  type = "text"
                  id = "localita"
                  name = "localita"
                  placeholder=" Inserisci città"
                  onChange = {this.onChange}
                  className = "i"
                />

                <label htmlFor = "indirizzo">Indirizzo</label>
                <input
                  type = "text"
                  id = "indirizzo"
                  name = "indirizzo"
                  placeholder=" Inserisci indirizzo"
                  onChange = {this.onChange}
                  className = "i"
                />
                
                <label htmlFor = "provincia">Provincia</label>
                <input
                  type = "text"
                  id = "provincia"
                  name = "provincia"
                  placeholder=" Inserisci Provincia (Due lettere)"
                  onChange = {this.onChange}
                  className = "i"
                />
                  <Button onClick = {this.onSubmit}>
                Modifica località
              </Button>
                  </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card border="light">
                <div className="head-update">
                <p> Servizi offerti :{bb.servizi}</p>
                <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="3" />
                </div>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Servizi</Form.Label>
                        <Form.Check type="checkbox" id="Wi-fi" label="Wi-fi"/>
                        <Form.Check type="checkbox" id="Aria condizionata" label="Aria condizionata"/> 
                        <Form.Check type="checkbox" id="Parcheggio gratuito" label="Parcheggio gratuito"/>
                        <Form.Check type="checkbox" id="4" label="Animali annessi"/>
                        <Form.Check type="checkbox" id="5" label="Accesso ospiti disabili"/>
                        <Form.Check type="checkbox" id="6" label="Misure extra per la salute"/>
                      </Form.Group>
                    </Form.Row>
                    <Button onClick = {this.onSubmit}>
                Cambia servizi
              </Button>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card border="light">
                <div className="head-update">
                <p> Descrizione : </p>
                <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="4" />
                </div>
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <form>
                    <label htmlFor = "descrizione">Descrizione attuale: {bb.descrizione}</label>
                <textarea 
                  id = 'descrizione'
                  name = 'descrizione'
                  placeholder='Inserisci descrizione'
                  onChange = {this.onChange}
                  className = 'iTA'
                >
                </textarea>
                <Button onClick = {this.onSubmit}>
                Modifica Descrizione
              </Button>
                    </form>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
        </div>
      );
    }
  }
}

export default ModificaBeB;