import React, { Component, Fragment } from "react";
import { omit , isEqual, pick } from "lodash";
import applyFilters from "_helpers/functions/filters";

export default class widget extends Component {
  render() {
    const { MasterComponent, gs={}, picks=[], comps } = this.props;
    return (
      <MasterComponent {...gs} gs={gs} comps={comps} {...pick(this.props, picks)}></MasterComponent>
    );
  }
}
