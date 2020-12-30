/*CSS FATTO*/ 

import React from "react";
import {Button, Form} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';

class InserimentoStanzaBnB extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_bb: this.props.history.location.state ? this.props.history.location.state.dati_bb : '',
      ref_proprietario: localStorage.getItem('email'),
      tipologia: 1,
      tariffa_stanza: '',
      foto1SRC: '',
      foto1: null,
      fileName1: '',
      foto2SRC: '',
      foto2: null,
      fileName2: '',
      foto3SRC: '',
      foto3: null,
      fileName3: '',
      foto4SRC: '',
      foto4: null,
      fileName4: '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeFoto = (e) => {
    this.setState({ [e.target.name]: URL.createObjectURL(e.target.files[0]) })
    this.setState({ [e.target.id]: e.target.files[0] });
  }

  onSubmitInsert = (e) => {
    e.preventDefault();

    const data1 = {
      ref_bb: this.state.dati_bb.ref_bb,
      tipologia: this.state.tipologia,
      tariffa_stanza: this.state.tariffa_stanza
    }

    fetch('http://localhost:9000/insertStanza/new', {
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data1)
    })
    .then((result) => result.text())
    .then((result) => {
      this.setState({ apiResponse: JSON.parse(result) });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }

      var id_stanza = this.state.apiResponse.id_stanza;
      var ref_bb = this.state.dati_bb.ref_bb;

      this.setState({
        fileName1: id_stanza + "_" + ref_bb + "_1.jpg",
        fileName2: id_stanza + "_" + ref_bb + "_2.jpg",
        fileName3: id_stanza + "_" + ref_bb + "_3.jpg",
        fileName4: id_stanza + "_" + ref_bb + "_4.jpg",
      });

      var form = new FormData();
      form.append("foto1", this.state.foto1, this.state.fileName1);
      form.append("foto2", this.state.foto2, this.state.fileName2);
      form.append("foto3", this.state.foto3, this.state.fileName3);
      form.append("foto4", this.state.foto4, this.state.fileName4);
  
      fetch('http://localhost:9000/uploadFotoST/upload', {
          method: "POST",
          body: form
      })
      .then((result) => result.text())
      .then((result) => {
        this.setState({ apiResponse: result });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }
      else {
        this.setState({ success: true });
      }
    });
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
          <h1>Inserimento avvenuto con successo!</h1>
          <p>La tua casa vacanza è stata registrata correttamente all'interno del sistema</p>
        </div>
      );
    }
    else {
      return(
        <div className = "background">
        <div className = "containerNew">  
            <div className = "contentNew">
                <form onSubmit = {this.onSubmitInsert}>
                <h2>Compila questo form per inserire le stanze del tuo B&B!</h2>
            
                <label htmlFor = "bb">Struttura B&B selezionata</label>
                  <input
                  type = "text"
                  className = "i"
                  value = {this.state.dati_bb.nome_proprieta}
                />

                <label htmlFor = "tipologia">Tipologia di stanza</label>
                <Form.Control as="select" className="i" required onChange = {this.onChange} id = "tipologia" name = "tipologia">
                    <option value="1">Singola</option>
                    <option value="2">Doppia</option>
                    <option value="3">Tripla</option>
                    <option value="4">Quadrupla</option>
                  </Form.Control >

                <label htmlFor = "tariffa_stanza">Tariffa stanza B&B</label>
                <input
                  type = "text"
                  pattern = "^\d+(.\d{1,2})?$"
                  title = "Inserire un valore numerico usando un punto per i valori decimali"
                  id = "tariffa_stanza"
                  name = "tariffa_stanza"
                  placeholder= "Tariffa stanza B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
            
                <Form.Group>
                        <label>Inserisci delle foto della tua stanza</label>
                        <Form.Row className = "justify-content-center">
                        <input
                        type = "file"
                        id = "foto1"
                        name = "foto1SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto1SRC} alt = "Foto 1" ></img>
                        <input
                        type = "file"
                        id = "foto2"
                        name = "foto2SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto2SRC} alt = "Foto 2" ></img>
                        <input
                        type = "file"
                        id = "foto3"
                        name = "foto3SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto3SRC} alt = "Foto 3" ></img>
                        <input
                        type = "file"
                        id = "foto4"
                        name = "foto4SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto4SRC} alt = "Foto 4" ></img>
                    </Form.Row>
                    </Form.Group>
            <Link to="/InserimentoProprietà">Torna indietro</Link>
            <Button variant="primary" type="submit">
              Carica
            </Button>
          </form>
        </div>
      </div>
      </div>
      ); 
    }
  }
}


export default InserimentoStanzaBnB;