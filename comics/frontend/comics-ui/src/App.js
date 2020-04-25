import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'

import Home from './components/Home/Home'
import NewChar from './components/ManageChar/NewChar'
import EditChar from './components/ManageChar/EditChar'
import DeleteChar from './components/ManageChar/DeleteChar'
import CharDetail from './components/Character/CharDetail'
import NotFound from './components/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={ () => <Redirect to='/home' component={ Home }/>}/>
        <Route exact path='/home' component={ Home }/>
        <Route exact path='/:house/new' component={ NewChar }/>
        <Route exact path='/:house/edit' component={ EditChar }/>
        <Route exact path='/:house/delete' component={ DeleteChar }/>
        <Route exact path='/:house/characters/:name' component={ CharDetail }/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}


export default App;
