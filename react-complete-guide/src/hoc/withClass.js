import React from 'react';

const withClass = (WrappedComponent, className) => { // WrappedComponent sẽ là một ref đến một component được wrapped bên trong HOC, các args sau sẽ phụ thuộc vào mục đích sử dụng HOC của chúng ta, như ở trường hợp này, chúng ta muốn một DIV với className được truyền vào. Chúng ta sẽ không dùng withClass như là một component, do đó lowerCase first letter (naming convention)
  return props => { // có thể viết gọn return => ( ... ), props ở đây chính là props của WrappedComponent
    return (
      <div className={className}>
        <WrappedComponent {...props} />
      </div>
    )
  }
};

export default withClass;
