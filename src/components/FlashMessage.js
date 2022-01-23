import React from "react"
import ToastContainer from 'react-bootstrap/ToastContainer'
import Toast from 'react-bootstrap/Toast'

import "./FlashMessage.css"
function FlashMessage(props) {
  return (
    <>
    <ToastContainer position="top-end" className="p-3">
      {props.messages.map((msg, index) => {
        return (
          // <div key={index} className={`flashmessage ` + msg.type}>
          //   <p> {msg.body} </p>
          // </div>
          <Toast key={`toast`+index} delay={3000} autohide bg={msg.type}>
          <Toast.Body>{msg.body}</Toast.Body>
        </Toast>
        )
      })}
      </ToastContainer>
    </>
  )
}

export default FlashMessage