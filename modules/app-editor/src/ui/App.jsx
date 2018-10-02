import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SetEditor = () => <div>Set editor</div>;

const App = ({ audiosets }) => (
  <div className="App">
    <h1>
      <Link to="/">Audiosets</Link>
    </h1>
    <ul>
      {audiosets.map(set => (
        <li key={set.id}>
          <Link to={`/set/${set.id}`}>{set.title}</Link>
        </li>
      ))}
    </ul>
  </div>
);

App.propTypes = {
  audiosets: PropTypes.array
};

const mapStateToProps = ({ audiosets }) => ({ audiosets });

export default connect(mapStateToProps)(App);
