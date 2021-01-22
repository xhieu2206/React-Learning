import React from "react";
import { DEFAULTAVATAR } from "../../../constants/URL";
import { formatISOdate } from '../../../utils/DateUtil';

import Aux from '../../../hoc/Auxiliary/Auxiliary';

const feedAuthor = (props) => {
  return (
    <Aux>
      <a href="/">
        <img
          src={props.image ? props.image : DEFAULTAVATAR}
          alt={DEFAULTAVATAR} />
      </a>
      <div className="info">
        <a href="/" className="author">
          {props.author}
        </a>
        <span className="date">{formatISOdate(props.createdAt)}</span>
      </div>
    </Aux>
  );
};

export default feedAuthor;
