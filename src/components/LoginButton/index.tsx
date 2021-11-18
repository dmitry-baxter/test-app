import React from 'react'
import { Button } from 'react-bootstrap'
import { withUAL } from 'ual-reactjs-renderer';

const LoginButton = (props: any) => {

  return (
    <Button onClick={props.ual.showModal} size="lg">
      Sign in
    </Button>
  )
}

export default withUAL(LoginButton)
