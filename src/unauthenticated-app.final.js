/** @jsx jsx */
/** @jsxFrag React.Fragment */
import {jsx} from '@emotion/core'

import React from 'react'
import VisuallyHidden from '@reach/visually-hidden'
import {
  CircleButton,
  Button,
  Spinner,
  FormGroup,
  ErrorMessage,
} from './components/lib'
import {Modal, ModalDismissButton} from './components/modal'
import {Logo} from './components/logo'
import {Input} from './components/lib'
import {AuthContext} from './context/auth-context'
import {useAsync} from './utils/use-async'

function LoginForm({onSubmit, submitButton}) {
  const {isLoading, isError, error, run} = useAsync()
  function handleSubmit(event) {
    event.preventDefault()
    const {username, password} = event.target.elements

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      }),
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        '> div': {
          margin: '10px auto',
          width: '100%',
          maxWidth: '300px',
        },
      }}
    >
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          {type: 'submit'},
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{marginLeft: 5}} /> : null,
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </form>
  )
}

const circleDismissButton = (
  <div css={{display: 'flex', justifyContent: 'flex-end'}}>
    <ModalDismissButton>
      <CircleButton>
        <VisuallyHidden>Close</VisuallyHidden>
        <span aria-hidden>×</span>
      </CircleButton>
    </ModalDismissButton>
  </div>
)

function UnauthenticatedApp() {
  const {login, register} = React.useContext(AuthContext)
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal
          aria-label="Login form"
          button={<Button variant="primary">Login</Button>}
        >
          {circleDismissButton}
          <h3 css={{textAlign: 'center', fontSize: '2em'}}>Login</h3>
          <LoginForm
            onSubmit={login}
            submitButton={<Button variant="primary">Login</Button>}
          />
        </Modal>
        <Modal
          aria-label="Registration form"
          button={<Button variant="secondary">Register</Button>}
        >
          {circleDismissButton}
          <h3 css={{textAlign: 'center', fontSize: '2em'}}>Register</h3>
          <LoginForm
            onSubmit={register}
            submitButton={<Button variant="secondary">Register</Button>}
          />
        </Modal>
      </div>
    </div>
  )
}

export {UnauthenticatedApp}