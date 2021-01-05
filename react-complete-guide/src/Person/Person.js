import React from 'react';

import styled from 'styled-components';

const StyleDiv = styled.div` // already return a React component, đây là chúng ta đang tạo ra một React component
  {
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
  }

  @media (min-width: 500px) {
    width: 450px;
  }
`;

const person = (props) => { // tên param ở đây là up to you, tuy nhiên nên để là props, đây chính là object có các attribute tương ứng là name của các attribute chúng ta truyền vào lúc gọi components
  // đây là jsx syntax, chúng ta cần import React module để sử dụng
  // props.children ở đây sẽ là bất cứ elements nào nằm giữa opening và closing tag, không chỉ là text mà có thể là các complex HTML
  return (
    // <div className="Person" style={style}>
    <StyleDiv>
      <p onClick={props.clickName}>I'm a {props.name} and I'm {props.age} years old</p>
      <p>{props.children}</p>
      <input
        type="text"
        onChange={props.changeName}
        value={props.name}/>
    </StyleDiv>
  )
  // đối với class-based components, chúng ta sẽ dùng this.props trong JSX code để get value của các attribute này.
}

export default person; // dùng được với functional-based component
