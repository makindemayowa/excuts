import React from 'react';

const Signup = props => (
  <div id="signupModal" className="modal authModal">
    <div className="modal-content">
      <div className="row">
        <form className="col s12" onSubmit={props.onSubmit}>
          <div className="input-field col s12">
            <input
              id="signUpemail"
              type="email"
              className="validate"
              name="email"
              required
              onChange={props.onChange}
              value={props.state.email}
            />
            <label htmlFor="signUpemail">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              type="password"
              className="validate"
              name="password"
              required              
              onChange={props.onChange}
              value={props.state.password}
              id="signUpPassword"
            />
            <label htmlFor="signUpPassword">Password</label>
          </div>
          <div className="input-field col s12">
            <input
              id="signUpPassword2"
              className="validate"
              type="password"
              required              
              name="confirmPassword"
              onChange={props.onChange}
              value={props.state.confirmPassword}
            />
            <label htmlFor="signUpPassword2">Confirm Password</label>
          </div>
          <div className="error_message">
            {props.state.error}
          </div>
          <button
            className="btn waves-effect waves-light col s12"
            type="submit"
            name="action"
          >Sign Up
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default Signup;
