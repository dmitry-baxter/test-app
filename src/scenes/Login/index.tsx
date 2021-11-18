import React from 'react'
import { Container } from 'react-bootstrap'
import { LoginButton } from '../../components'
import { withUAL } from 'ual-reactjs-renderer'

import './style.css'

const Login = (props: any) => {

  return (
    <div className="LoginScene">
      <LoginButton/>
    </div>
  )
}

export default withUAL(Login)
