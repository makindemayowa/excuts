import React from 'react';

const Signup = () => (
  <div id="signupModal" className="modal authModal">
  <div className="modal-content">
    <div className="row">
      <form className="col s12">
        <div className="input-field col s12">
          <input id="signUpemail" type="email" className="validate" />
          <label htmlFor="signUpemail">Email</label>
        </div>
        <div className="input-field col s12">
          <input id="signUpPassword" type="text" className="validate" />
          <label htmlFor="signUpPassword">Password</label>
        </div>
        <div className="input-field col s12">
          <input id="signUpPassword2" type="text" className="validate" />
          <label htmlFor="signUpPassword2">Confirm Password</label>
        </div>
        <button className="btn waves-effect waves-light col s12" type="submit" name="action">Sign Up
          <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</div>
)

export default Signup;