import React from 'react';

export default (props) => {
  const currentId = `${props.id}`;
  return (
    <div className="col s6 m6 l4">
      <div className="card">
        <div className="img__wrap card-image">
          <img alt="" className="profile-image" src={props.img} />
          <a
            href="/"
            onClick={(e) => props.setDp(e, currentId)}
            className="img__description"
          >Make Profile image.</a>
        </div>
        <div className="">
          <a href="" alt="" onClick={(e) => props.deletePhoto(e, currentId)}>
            <i className="far fa-trash-alt delete" />
          </a>
        </div>
      </div>
    </div>
  )
};
