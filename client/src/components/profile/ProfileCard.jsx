import React from 'react';

export default (props) => {
  const currentId = `${props.id}`;
  return (
    <div className="col s6 m6 l4">
      <div className="card img__card">
        <div className="img__wrap card-image">
          <img alt="" className="profile-image" src={props.img} />
          <a
            href="/"
            onClick={(e) => props.setDp(e, currentId)}
            className="img__description"
          >.</a>
        </div>
        <div className="imageActions">
          <a 
            href=""
            className="hide-on-med-and-up setDp"
            onClick={(e) => props.setDp(e, currentId)}
          >
            <i className="fas fa-upload"></i>
          </a>
          <div>
            <a href="" alt="" onClick={(e) => props.deletePhoto(e, currentId)}>
              <i className="far fa-trash-alt delete" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
};
