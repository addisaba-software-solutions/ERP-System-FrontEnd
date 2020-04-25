import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import history from "../../../../Routes/history";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from "prop-types";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import API from "../../../../api/API";
import { connect } from "react-redux";
import actions from "../../../../store/hr/action";
import Error from "../../../../error/error";

const styles = (theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      depValue: "",
      rolValue: "",
      levValue: "",
      deps: [],
      rol: [],
      lev: [],
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
      termOfEmployment: "",
      country: "",
      city: "",
      region: "",
      birthDate: "",
      hiredDate: "",
    };
    this.submit = this.submit.bind(this);
    this.departmentDropDown = this.departmentDropDown.bind(this);
    this.levelDropDown = this.levelDropDown.bind(this);
    this.roleDropDown = this.roleDropDown.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.countryChange = this.countryChange.bind(this);
    this.regionChange = this.regionChange.bind(this);
    this.termofEmploymentChange = this.termofEmploymentChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.telephoneChange = this.telephoneChange.bind(this);
  }
  componentDidMount() {
    this.props.getDepartment();
  }

  submit = () => {
    this.props.addNewEmployee(this.state);
  };

  departmentDropDown(e) {
    this.setState({
      depValue: e.target.value,
    });
    this.props.department.map((value, index) => {
      if (
        value.departmentId == e.target.value &&
        value.department_roles != null
      ) {
        this.setState({
          rol: value.department_roles,
        });
      }
    });
  }
  roleDropDown(e) {
    this.setState({
      rolValue: e.target.value,
    });
    this.state.rol.map((value) => {
      if (value.roleId === e.target.value && value.role_levels != null) {
        console.log(value.role_levels);
        this.setState({
          lev: value.role_levels,
        });
      }
    });
  }

  countryChange(e) {
    this.setState({
      levValue: e.target.value,
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
   
    const { error, newEmployeeInfo, deps, rol, lev, empId } = this.state;
    const { classes } = this.props;
    var depValue = this.state.depValue;
    var rolValue = this.state.rolValue;
    var levValue = this.state.levValue;
    var regionValue = this.state.regionValue;
    var cityValue = this.state.cityValue;
    var countryValue = this.state.countryValue;
    var termofEmploymentValue = this.state.termofEmploymentValue;
    var telephoneValue = this.state.telephoneValue;
    var emailValue = this.state.emailValue;
    var lastValue = this.state.lastValue;
    var firstValue = this.state.firstValue;

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      
 

    return (
      <React.Fragment>
        <CssBaseline />

        <main className={classes.layout}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Employee Registration
              </Typography>

              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Employee Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="First name"
                      fullWidth
                      autoComplete="fname"
                      onChange={this.handleChange}
                      value={firstValue}
                      // value={this.state.newEmployeeInfo.firstName}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.firstName = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.firstNameChange}
                      value={firstValue}
                    />

                    <Error
                      error={
                        this.props.errors.firstName
                          ? this.props.errors.firstName
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Last name"
                      fullWidth
                      autoComplete="lname"
                      // value={this.state.newEmployeeInfo.lastName}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.lastName = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.lastNameChange}
                      value={lastValue}
                    />
                    <Error
                      error={
                        this.props.errors.lastName
                          ? this.props.errors.lastName
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="Email"
                      // value={this.state.newEmployeeInfo.email}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.email = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}

                      onChange={this.emailChange}
                      value={emailValue}
                    />
                    <Error
                      error={
                        this.props.errors.email ? this.props.errors.email : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="telephone"
                      name="telephone"
                      label="Phone Number"
                      fullWidth
                      autoComplete="PhoneNumber"
                      // value={this.state.newEmployeeInfo.telephone}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.telephone = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.telephoneChange}
                      value={telephoneValue}
                    />

                    <Error
                      error={
                        this.props.errors.telephone
                          ? this.props.errors.telephone
                          : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Term Of Employment
                      </InputLabel>
                      <Select
                        native
                        defaultValue=""
                        id="grouped-native-select"
                        name="termOfEmployment"
                        onChange={this.handleChange}
                        value={termofEmploymentValue}
                      >
                        <option aria-label="None" value="" />
                        <option>Permanent</option>
                        <option>Contract</option>
                        <option>Hourly</option>
                      </Select>

                      <Error
                        error={
                          this.props.errors.termOfEmployment
                            ? this.props.errors.termOfEmployment
                            : null
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="country"
                      name="country"
                      label="Country"
                      fullWidth
                      autoComplete="country"
                      // value={this.state.newEmployeeInfo.country}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.country = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.countryChange}
                      value={countryValue}
                    />

                    <Error
                      error={
                        this.props.errors.country
                          ? this.props.errors.country
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Department
                      </InputLabel>
                      <Select
                        onChange={this.departmentDropDown}
                        value={depValue}
                        native
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="" />
                        {this.props.department.map((dep) => (
                          <option value={dep.departmentId}>
                            {dep.departmentName}
                          </option>
                        ))}
                      </Select>

                      <Error
                        error={
                          this.props.errors.department
                            ? this.props.errors.department
                            : null
                        }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Role
                      </InputLabel>
                      <Select
                        onChange={this.roleDropDown}
                        value={rolValue}
                        native
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="" />
                        {this.state.rol.map((rols) => (
                          <option value={rols.roleId} key={rols.roleId}>
                            {rols.role}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <Error
                      error={
                        this.props.errors.roles ? this.props.errors.roles : null
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <FormControl className={classes.formControl} fullWidth>
                      <InputLabel htmlFor="grouped-native-select">
                        Level
                      </InputLabel>
                      <Select
                        onChange={this.levelDropDown}
                        value={levValue}
                        native
                        id="grouped-native-select"
                      >
                        <option aria-label="None" value="" />
                        {this.state.lev.map((levs) => (
                          <option value={levs.levelId} key={levs.levelId}>
                            {levs.level}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <Error
                      error={
                        this.props.errors.level ? this.props.errors.level : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      autoComplete="city"
                      // value={this.state.newEmployeeInfo.city}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.city = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.cityChange}
                      value={cityValue}
                    />

                    <Error
                      error={
                        this.props.errors.city ? this.props.errors.city : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="region"
                      name="region"
                      label="Region"
                      fullWidth
                      autoComplete="region"
                      // value={this.state.newEmployeeInfo.region}
                      // onChange={(e) => {
                      //   let { newEmployeeInfo } = this.state;
                      //   newEmployeeInfo.region = e.target.value;
                      //   this.setState({ newEmployeeInfo });
                      // }}
                      onChange={this.regionChange}
                      value={regionValue}
                    />

                    <Error
                      error={
                        this.props.errors.region
                          ? this.props.errors.region
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <form className={classes.container} noValidate>
                      <TextField
                        fullWidth
                        id="date"
                        name="birthDate"
                        label="BirthDate"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.handleChange}
                      />
                    </form>

                    <Error
                      error={
                        this.props.errors.birthDate
                          ? this.props.errors.birthDate
                          : null
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <form className={classes.container} noValidate>
                      <TextField
                        fullWidth
                        id="date"
                        label="Hired Date"
                        name="hiredDate"
                        type="date"
                        className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={this.handleChange}
                      />
                    </form>

                    <Error
                      error={
                        this.props.errors.hiredDate
                          ? this.props.errors.hiredDate
                          : null
                      }
                    />
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.submit}
                  className={classes.button}
                >
                  Register
                </Button>
              </React.Fragment>
            </Paper>
          </MuiPickersUtilsProvider>
        </main>

        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </React.Fragment>
    );
  }


function mapStateToProps(state) {
  return {
    loading: state.hrReducer.loading,
    users: state.hrReducer.users,
    errors: state.hrReducer.errors,
    department: state.hrReducer.department,
  };
}
const mapDispatchToProps = {
  addNewEmployee: actions.addNewEmployee,
  getDepartment: actions.getDepartment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserProfile));
