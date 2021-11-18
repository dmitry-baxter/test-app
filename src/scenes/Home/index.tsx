import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'
import { withUAL } from 'ual-reactjs-renderer'
import { UAL } from '../../types/ual.module'
import { Loading } from '../../components'

import "./style.css"

const demoTransaction = {
  actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
      actor: '',
      permission: 'active',
    }],
    data: {
      from: '',
      to: 'eosio',
      quantity: '0.0000 WAX',
      memo: 'Blacklusion frontend challenge',
    },
  }],
}

const Home: React.FC<UAL> = ({ ual, children }) => {
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showMessage, setShowMessage] = useState(false)

  const navigate = useNavigate()

  const getAccountBalance = async () => {
    try {
      const { core_liquid_balance} = await ual.activeUser.rpc.get_account(ual.activeUser.accountName)
      core_liquid_balance && setBalance(core_liquid_balance)
    } catch (e) {
      console.warn(e)
    }
  }

  useEffect(() => {
    getAccountBalance()
      .finally(() => setLoading(false))
  })

  const handleSentTransaction = async () => {
    const activeUser = ual.activeUser
    const accountName = ual.activeUser.accountName
    demoTransaction.actions[0].authorization[0].actor = accountName
    demoTransaction.actions[0].data.from = accountName
    setShowMessage(true)
    try {
      await activeUser.signTransaction(demoTransaction, { blocksBehind: 3, expireSeconds: 120 })
        .finally(() => setShowMessage(false))
      await getAccountBalance()
    } catch (error) {
      console.warn(error)
      setShowMessage(false)
    }
  }

  const handleLogout = () => {
    ual.logout()
    navigate('/')
  }

  return (
    <div className="HomeScene">
      { loading ?
          <Loading/>
        :
        <>
          <Container fluid className="header pt-3">
            <Row className="align-items-center">
              <Col>
                { ual.activeUser.accountName }
              </Col>
              <Col className="text-center">
                { balance }
              </Col>
              <Col className="text-end">
                <Button onClick={handleLogout}>Logout</Button>
              </Col>
            </Row>
            { showMessage &&
              <Row className="mt-2">
                <Col className="text-center" md={{ span: 6, offset: 3 }}>
                  <Alert variant="primary">
                    Transaction could be executed successfully or not
                  </Alert>
                </Col>
              </Row>
            }
          </Container>
          <Container fluid className="layout">
            <Button onClick={handleSentTransaction}>
              Send transaction
            </Button>
          </Container>
          <Confetti height={ window.innerHeight } recycle={ false } numberOfPieces={ 600 }/>
        </>
      }
    </div>
  )
}

export default withUAL(Home)
