import React from 'react';

const authContext = React.createContext({ // globally available JS object (or value, array ...), có thể passed vào các component mà không cần dùng đến props, globally available không hoàn toàn chính xác, mà chúng ta có thể decide xem object sẽ available ở những đâu
  authenticated: false,
  login: () => {}
});

export default authContext;
