import React from "react";
import { Link } from 'react-router-dom';

import { DEFAULTAVATAR } from "../../../constants/URL";
import { formatISOdate } from '../../../utils/DateUtil';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const feedAuthor = (props) => {
  return (
    <Aux>
      <Link to={"/users/" + props.author}>
        <img
          src={props.image ? props.image : DEFAULTAVATAR}
          alt={DEFAULTAVATAR} />
      </Link>
      <div className="info">
        <Link to={"/users/" + props.author} className="author">
          {props.author}
        </Link>
        <span className="date">{formatISOdate(props.createdAt)}</span>
      </div>
    </Aux>
  );
};

export default feedAuthor;
