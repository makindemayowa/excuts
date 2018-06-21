import React, { Component } from 'react';

class Contact extends Component {
  constructor() {
    super();
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="contact">
        <div className="container">
          <div className="row">
            <h4 className="contactText">
              Send Us A Note
            </h4>
          </div>
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input placeholder="" required id="first_name" type="text" class="validate" />
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s12">
                <input placeholder="" required id="last_name" type="text" class="validate" />
                <label for="first_name">Last Name</label>
              </div>
              <div class="input-field col s12">
                <input placeholder="" required id="mail" type="email" class="validate" />
                <label for="mail">Email</label>
              </div>
              <div class="input-field col s12">
                <input placeholder="" required id="phone" type="number" class="validate" />
                <label for="phone no">Phone Number</label>
              </div>
              <div class="input-field col s12">
                <textarea id="icon_prefix2" required class="materialize-textarea"></textarea>
                <label for="icon_prefix2">Message</label>
              </div>
            </div>
            <div>
              <button type="submit" class="waves-effect waves-light btn right">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default Contact;
