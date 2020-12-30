import React, { Component } from 'react';

const person = (props) => { // tên param ở đây là up to you, tuy nhiên nên để là props, đây chính là object có các attribute tương ứng là name của các attribute chúng ta truyền vào lúc gọi components
  // đây là jsx syntax, chúng ta cần import React module để sử dụng
  // props.children ở đây sẽ là bất cứ elements nào nằm giữa opening và closing tag, không chỉ là text mà có thể là các complex HTML
  return (
    <div>
      <p>I'm a {props.name} and I'm {props.age} years old</p>
      <p>{props.children}</p>
    </div>
  )
  // đối với class-based components, chúng ta sẽ dùng this.props trong JSX code để get value của các attribute này.
}

export default person;
