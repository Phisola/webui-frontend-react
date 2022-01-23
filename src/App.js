//library
import React, { useEffect } from 'react';
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"


// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

//component
import './App.css';
import FlashMessage from './components/FlashMessage'
import Moduleprepsec from './modules/prepsec/Module'
import Head from './components/Head'
import Home from './modules/home/Home'
import ModuleSds from './modules/SDS/Module'




//contexts
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"


function App() {

  const initialState = {
    flashMessages: []
  }



  function ourReducer(draft, action) {
    switch (action.type) {
      case "flashMessage":
        draft.flashMessages.push(action.data)
        break
      case "deleteflashMessage":
        draft.flashMessages.pop()
        break
      default:
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    if (state.flashMessages.length) {
      setTimeout(() => {
        dispatch({ type: "deleteflashMessage" })
      }, 3000)
    }
  }, [state.flashMessages, dispatch])

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>

        <BrowserRouter>
          <Head />

          {state.flashMessages.length > 0 && (<FlashMessage messages={state.flashMessages} />)}
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route path="/prepsec" element={<Moduleprepsec />} exact></Route>
            <Route path="/sds" element={<ModuleSds />} exact></Route>
          </Routes>
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
