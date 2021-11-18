import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UAL } from '../../types/ual.module'
import { withUAL } from 'ual-reactjs-renderer'
import { Loading } from '../../components'

const Page: React.FC<UAL> = ({ ual, children}) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (ual.availableAuthenticators.length > 0) {
        if (ual.activeUser) {
          setLoading(false)
          navigate('home')
        } else {
          setLoading(false)
          navigate('/')
        }
    }
  }, [ual.activeUser, ual.availableAuthenticators.length])

  return (
    <Container fluid>
      { loading ?
          <Loading/>
        :
          <div>
            { children }
          </div>
      }
    </Container>
  )
}

export default withUAL(Page)
