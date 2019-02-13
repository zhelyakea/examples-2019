import React from "react";
import fetchPost from "../services/fetch";

export default WrappedComponent => {
  class checkSession extends React.Component {
    state = {
      sessionChecking: true
    };
    checkIsAdmin = async () => {
      const { history, setIsAdmin } = this.props;
      this.setState({ sessionChecking: true });
      const { validate, isAdmin } = await fetchPost(
        "/session",
        JSON.stringify({})
      );
      this.setState({ sessionChecking: false });
      if (!validate) {
        history.push({
          pathname: "/auth"
        });
      }
      return setIsAdmin(isAdmin);
    };
    render() {
      const { checkIsAdmin } = this;
      const { sessionChecking } = this.state;
      return (
        <WrappedComponent
          {...{ ...this.props, checkIsAdmin, sessionChecking }}
        />
      );
    }
  }

  return checkSession;
};
