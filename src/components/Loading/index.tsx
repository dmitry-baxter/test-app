import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
import './style.css'

const Loading = () =>
  <div className="Loading">
    <Spinner animation="border" variant="primary"/>
  </div>

export default Loading
