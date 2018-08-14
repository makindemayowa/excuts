import React from 'react'
import SocialLogin from 'react-social-login'

const Button = ({ children, triggerLogin, ...props }) => (
  <a onClick={triggerLogin} {...props}>
    { children }
  </a>
)

export default SocialLogin(Button)