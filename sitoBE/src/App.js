import React from 'react';
import './App.css';
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import HomePage from './components/HomePage'
import Autenticazione from './Autenticazione/Autenticazione'
import Cliente from './components/ClientePage'
import ProprietarioPage from './GestioneProprietario/ProprietarioPage'
import PaginaDettagli from './PaginaDettagli/PaginaDettagli'
import Checkin from './GestioneProprietario/Checkin/Checkin'
import CheckinEffettuato from './GestioneProprietario/Checkin/CheckinEffettuato'
import Earning2 from './GestioneProprietario/Earning/Earning2'
import DatiPersonali from './GestioneProprietario/DatiPersonali'
import InserimentoProprietà from './GestioneProprietario/InserisciProp/InserimentoProprietà';
import ElencoCasaVacanza from './GestioneProprietario/Modifica/ElencoCasaVacanza'
import ElencoBeB from './GestioneProprietario/Modifica/ElencoB&B'
import SceltaModifica from './GestioneProprietario/Modifica/SceltaModifica'
import ModificaCasaVacanza from './GestioneProprietario/Modifica/ModificaCasaVacanza'
import SecondaAutenticazioneAccedi from './Autenticazione/secondaAutenticazioneAccedi'
import SecondaAutenticazioneRegistrati from './Autenticazione/secondaAutenticazioneRegistrati'
import Accettazione from './GestioneProprietario/Accettazione/Accettazione'
import SceltaModificaBeb from './GestioneProprietario/Modifica/SceltaModificaB&B'
import ModificaBeB from './GestioneProprietario/Modifica/ModificaB&B'
import ElencoListaStanze from './GestioneProprietario/Modifica/ElencoListaStanze'
import ModificaStanza from './GestioneProprietario/Modifica/ModificaStanza'
import InserimentoBnB from './GestioneProprietario/InserisciProp/inserimentoB&B'
import InserimentoCasaVacanza from './GestioneProprietario/InserisciProp/inserimentoCasaVacanza'
import ErrorPage from './components/ErrorPage'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

class App extends React.Component {

  constructor() {
    super();

    this.state = { 
      email: '',
      password: '',
      //logged: false,
      //cliente: false,
      //proprietario: false,
      apiResponse: [],
      error: false,
      errorMessage: ''
      //success: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitLogin = (e) => {
    e.preventDefault();
    // get form data out of state
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('http://localhost:9000/login/logged', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((result) => result.text())
    .then((result) => {
      console.log(JSON.parse(result));
      this.setState({ apiResponse: JSON.parse(result) });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }
      else {
        /*this.setState({ 
          logged: true,
          cliente: this.state.apiResponse[0].email_cl ? true : false,
          proprietario: this.state.apiResponse[0].email_prop ? true : false
        });*/

        localStorage.setItem('logged', true);
        localStorage.setObj('user_data', this.state.apiResponse);

        var cliente = this.state.apiResponse[0].email_cl ? true : false;
        
        if(cliente) {
          localStorage.setItem('cliente', true);
          localStorage.setItem('email', this.state.apiResponse[0].email_cl);
        }
        else {
          localStorage.setItem('proprietario', true);
          localStorage.setItem('email', this.state.apiResponse[0].email_prop);
        }
      }
    });
  }
  
  render() {
    return (
      <Router>
      <div className="App">
          <Navbar />
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>
              <Route 
                exact path = '/ErrorPage'
                render = { (props) => (
                  <ErrorPage {...props} 
                />)}
              />
              <Route 
                exact path = '/Autenticazione'
                render = { (props) => (
                  <Autenticazione {...props}  
                    onChange = {this.onChange}
                    onSubmitLogin = {this.onSubmitLogin}
                    error = {this.state.error}
                    errorMessage = {this.state.errorMessage}
                  />)
                }
              />
              <Route exact path = '/secondaAutenticazioneAccedi'>
                <SecondaAutenticazioneAccedi/>
              </Route>
              <Route exact path = '/secondaAutenticazioneRegistrati'>
                <SecondaAutenticazioneRegistrati/>
              </Route>
              <Route exact path = "/PaginaCliente">
                <Cliente />
              </Route>
              <Route exact path = '/PaginaProprietario'>
                <ProprietarioPage/>
              </Route>
              <Route exact path = '/PaginaDettagli'>
                  <PaginaDettagli/>
              </Route>
              <Route exact path = '/Checkin'>
                <Checkin />
              </Route>
              <Route exact path = '/CheckinEffettuato'>
                <CheckinEffettuato />
              </Route>
              <Route exact path = '/InserimentoProprietà'>
                <InserimentoProprietà />
              </Route>
              <Route exact path = '/DatiPersonali'>
                <DatiPersonali/>
              </Route>
              <Route exact path = '/Earning'>
                <Earning2/>
              </Route>
              <Route exact path = '/ElencoB&B'>
                <ElencoBeB/>
              </Route>
              <Route exact path = '/ElencoCasaVacanza'>
                <ElencoCasaVacanza/>
              </Route>
              <Route exact path = '/SceltaModifica'>
                <SceltaModifica/>
              </Route>
              <Route exact path = '/ModificaCasaVacanza'>
                <ModificaCasaVacanza/>
              </Route>
              <Route exact path = '/Accettazione'>
                <Accettazione/>
              </Route>
              <Route exact path = '/SceltaModificaB&B'>
                <SceltaModificaBeb/>
              </Route>
              <Route exact path = '/ModificaB&B'>
                <ModificaBeB/>
              </Route>
              <Route exact path = '/ElencoListaStanze'>
                <ElencoListaStanze/>
              </Route>
              <Route exact path = '/ModificaStanza'>
                <ModificaStanza/>
              </Route>
              <Route exact path = '/InserimentoBnB'>
                <InserimentoBnB/>
              </Route>
              <Route exact path = '/InserimentoCasaVacanza'>
                <InserimentoCasaVacanza/>
              </Route>
              /InserimentoCasaVacanza
            </Switch>  
          <Footer/>
          </div>
        </ Router>
      );
  }
}

export default App;
