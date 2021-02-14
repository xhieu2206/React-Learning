import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }

    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => { // nếu không có lỗi thì set lại giá trị của error = null
        this.setState({
          error: null
        });
        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({
          error: error
        });
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
