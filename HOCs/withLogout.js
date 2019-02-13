import React from "react";

import fetchPost from "../services/fetch";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%"
  },
  containerContent: {
    flex: "1 1 auto",
    overflowY: "auto",
    minHeight: "0px"
  },
  buttonWrapper: {
    zIndex: 1,
    width: "100%",
    flexShrink: 0,
    display: "flex",
    overflow: "visible",
    alignItems: "center",
    justifyContent: "flex-end",
    boxShadow: "0px 6px 27px -1px rgba(181,181,181,1)"
  },
  button: {
    marginRight: "2.5%",
    marginTop: "1vw",
    marginBottom: "1vw"
  }
});
export default WrappedComponent => {
  class withLogout extends React.Component {
    logOut = async () => {
      const { history } = this.props;

      await fetchPost("/session", JSON.stringify({}));
      history.push({
        pathname: "/auth"
      });
    };

    render() {
      const { logOut } = this;
      const {
        classes: { container, button, buttonWrapper },
        ...props
      } = this.props;
      return (
        <div className={container}>
          <div className={buttonWrapper}>
            <Button
              classes={{ root: button }}
              variant="outlined"
              color="primary"
              onClick={logOut}
            >
              Выход
            </Button>
          </div>
          <WrappedComponent {...props} />
        </div>
      );
    }
  }

  return withStyles(styles)(withLogout);
};
