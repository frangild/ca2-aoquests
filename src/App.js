import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect, /*BrowserHistory*/ } from 'react-router-dom';

import HomePage from './components/HomePage';

import Register from './views/auth/Register';
import Login from './views/auth/Login';

import NpcIndex from './views/npcs/Index';
import NpcShow from './views/npcs/Show';
import NpcCreate from './views/npcs/Create';
import NpcEdit from './views/npcs/Edit';

import QuestIndex from './views/quests/Index';
import QuestShow from './views/quests/Show';
import QuestCreate from './views/quests/Create';

import MyNavbar from './components/MyNavbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null,
      userInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  };

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }));
  };

  render() {
    const loggedIn = this.state.loggedIn;
    const user = this.state.userInfo;
    return (
      <BrowserRouter>
        <MyNavbar loggedIn={loggedIn} userInfo={user} onLogout={this.authHandler} />
        <Container>
          <Row>
          <Col>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/register" exact component={(props) => <Register {...props} onLogin={this.authHandler} />} />
              <Route path="/login" exact component={(props) => <Login {...props} onLogin={this.authHandler} />}/>
              <Route path="/npcs" exact component={(NpcIndex)} />
              <Route path="/quests" exact component={QuestIndex} />
              
              {loggedIn && user.role === 'admin' ?
              <>
              <Route path="/npcs/create" exact component={(props) => <NpcCreate {...props}/>}/>
              <Route path="/npcs/:id/edit" exact component={(props) => <NpcEdit {...props} loggedIn={loggedIn}/>}/>
              <Route path="/quests/create" exact component={(props) => <QuestCreate {...props}/>}/>
              </>
              :
              <>
              <Route path="/npcs/create" exact component={() => <Redirect to="/" />}/>
              <Route path="/npcs/:id/edit" exact component={() => <Redirect to="/" />}/>
              <Route path="/quests/create" exact component={() => <Redirect to="/" />}/>
              </>
              }
              <Route path="/npcs/:id" exact component={(props) => <NpcShow {...props} loggedIn={loggedIn}/>} />
              <Route path="/quests/:id" exact component={(props) => <QuestShow {...props} loggedIn={loggedIn}/>} />
            </Switch>
          </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}