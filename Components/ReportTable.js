import React from "react";
import compose from "recompact/compose";
import fetchPost from "./services/fetch";
import { loadState } from "./services/localStorage";

import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import checkSession from "./HOCs/checkSession";
import withLogout from "./HOCs/withLogout";

import Loading from "./Loading";

const styles = theme => ({
  title: {
    marginTop: "2.5%"
  },
  buttonWrapper: {
    zIndex: 1,
    width: "100%",

    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
    boxShadow: "0px -5px 27px -1px rgba(181,181,181,1)"
  },
  messageWrapper: {
    height: "10%",
    paddingTop: "2.5%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonBack: {
    marginTop: "1vw",
    marginBottom: "1vw"
  },
  root: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 0,
    marginBottom: 0,
    padding: 0
  },
  containerContent: {
    flex: "1 1 auto",
    overflowY: "auto",
    minHeight: "0px"
  },
  table: {
    minWidth: "100%"
  },
  close: {
    position: "absolute",
    top: "4px",
    right: "4px"
  }
});

const renderTableUser = (table, report) => (
  <Table className={table}>
    <TableHead>
      <TableRow>
        <TableCell>Код</TableCell>
        <TableCell>Дата</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {report.map(({ code, date }) => {
        return (
          <TableRow key={code}>
            <TableCell>{code}</TableCell>
            <TableCell>{date}</TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell>Всего:</TableCell>
        <TableCell>{report.length}шт</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);

const renderTableAdmin = (table, report) => (
  <Table className={table}>
    <TableHead>
      <TableRow>
        <TableCell>Название организации</TableCell>
        <TableCell>Количество билетиков</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {report.map(({ organisation, quantity }, index) => {
        return (
          <TableRow key={organisation}>
            <TableCell>{organisation}</TableCell>
            <TableCell>{quantity}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);

const renderToBack = (buttonBack, buttonWrapper, history) => (
  <div className={buttonWrapper}>
    <Button
      classes={{ root: buttonBack }}
      variant="outlined"
      color="primary"
      onClick={() => {
        history.push({
          pathname: "/"
        });
      }}
    >
      Назад
    </Button>
  </div>
);

const emptyReport = (
  title,
  buttonBack,
  root,
  buttonWrapper,
  messageWrapper,
  history
) => (
  <Paper className={root}>
    <div className={messageWrapper}>
      <Typography classes={{ root: title }} variant="title" gutterBottom>
        Нет данных за указанный период.
      </Typography>
      {renderToBack(buttonBack, buttonWrapper, history)}
    </div>
  </Paper>
);

const renderTable = ({ isAdmin, table, report }) =>
  isAdmin ? renderTableAdmin(table, report) : renderTableUser(table, report);

class ReportTable extends React.Component {
  state = {
    reportLoading: true
  };
  async componentDidMount() {
    const { setReport, checkIsAdmin } = this.props;
    const data = {
      from: new Date(loadState("dateFrom")).toLocaleDateString(),
      to: new Date(loadState("dateTo")).toLocaleDateString()
    };

    await checkIsAdmin();

    const { isAdmin } = this.props;
    this.setState({ reportLoading: true });
    const report = await fetchPost(
      "/report",
      JSON.stringify({ ...data, isAdmin })
    );
    this.setState({ reportLoading: false });
    setReport(report);
  }

  render() {
    const { reportLoading } = this.state;
    const {
      sessionChecking,
      history,
      isAdmin,
      report,
      classes: {
        title,
        buttonBack,
        buttonWrapper,
        messageWrapper,
        root,
        containerContent,
        table
      }
    } = this.props;

    if (sessionChecking || reportLoading) {
      return <Loading />;
    }
    if (report.length > 0) {
      return (
        <React.Fragment>
          <div className={containerContent}>
            <Paper className={root}>
              {renderTable({ isAdmin, table, report })}
            </Paper>
          </div>
          {renderToBack(buttonBack, buttonWrapper, history)}
        </React.Fragment>
      );
    }
    return emptyReport(
      title,
      buttonBack,
      root,
      buttonWrapper,
      messageWrapper,
      history
    );
  }
}
export default compose(
  checkSession,
  withLogout,
  withStyles(styles)
)(ReportTable);
