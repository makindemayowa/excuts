import React from 'react';

export default props => {
  return (
    <div className="col s12 m4 l2 searchForm">
      <div className="bottom_margin" />
      <div className="flex">
        <div className="form-fields">
          <label>Interested in</label>
          <select name="sex" onChange={props.onSexStateChange} className="size1">
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="others">others</option>
          </select>
        </div>
        <div className="form-fields">
          <label>Country</label>
          <select
            name="country"
            onChange={props.onChange}
            className="size1"
          >
            <option
              key="Nigeria"
              value="Nigeria"
            >
              Nigeria
          </option>
            {
              props.countriesWithStates.countries.map((country) =>
                <option
                  key={country.country}
                  value={country.country}
                >
                  {country.country}
                </option>
              )
            }
          </select>
        </div>

        <div className="form-fields">
          <label>State</label>
          <select
            name="state"
            onChange={props.onSexStateChange}
            className="size1 browser-default"
          >
            {
              props.states.map((state) =>
                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>
              )
            }
          </select>
        </div>

        <div className="form-fields">
          <div className="row">
            <div className="col s12">
              <div>
                From
              </div>
            </div>
            <div className="col s12">
              <input onChange={props.onChange} type="date" name="startDate" />
            </div>
          </div>
        </div>

        <div className="row">
          <button
            className="waves-effect right waves-light btn"
            onClick={props.onSearchSubmit}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
};
