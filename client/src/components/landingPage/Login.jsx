import React from 'react';

const Login = () => (
  <div id="loginModal" className="modal authModal">
    <div className="modal-content">
      <div className="row">
        <form className="col s12">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input id="loginPassword" type="text" className="validate" />
            <label htmlFor="loginPassword">Password</label>
          </div>
          <button className="btn waves-effect waves-light col s12" type="submit" name="action">Login
              <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
)

export default Login;