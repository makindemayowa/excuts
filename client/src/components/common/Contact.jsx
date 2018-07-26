import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className="contact">
        <div className="">
          <div className="row">
            <h4 className="contactText">
              Send Us A Note
            </h4>
          </div>
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input placeholder="" required id="first_name" type="text" className="validate" />
                <label htmlFor="first_name">First Name</label>
              </div>
              <div className="input-field col s12">
                <input placeholder="" required id="last_name" type="text" className="validate" />
                <label htmlFor="first_name">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input placeholder="" required id="mail" type="email" className="validate" />
                <label htmlFor="mail">Email</label>
              </div>
              <div className="input-field col s12">
                <input placeholder="" required id="phone" type="number" className="validate" />
                <label htmlFor="phone no">Phone Number</label>
              </div>
              <div className="input-field col s12">
                <textarea id="icon_prefix2" required className="materialize-textarea"></textarea>
                <label htmlFor="icon_prefix2">Message</label>
              </div>
            </div>
            <div>
              <button type="submit" className="waves-effect waves-light btn right">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default Contact;
