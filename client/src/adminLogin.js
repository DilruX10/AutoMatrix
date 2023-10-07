import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(10),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
    marginTop: theme.spacing(2),
  },
}))

const AdminLogin = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      navigate('/adminHome')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className={classes.root}>
      <h1>Admin Login</h1>
      <form className={classes.form}>
        <TextField
          label='Username'
          value={username}
          onChange={handleUsernameChange}
          className={classes.input}
        />
        <TextField
          label='Password'
          value={password}
          onChange={handlePasswordChange}
          className={classes.input}
        />
        <Button
          variant='contained'
          color='primary'
          onClick={handleLogin}
          className={classes.button}
        >
          Login
        </Button>
      </form>
      {error && <div className={classes.error}>{error}</div>}
    </div>
  )
}

export default AdminLogin
