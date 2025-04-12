import React, { useState } from "react";
import { Configure } from "./Components/Configure";
import { AddCompany } from "./Components/AddCompany";
import { Done } from "./Components/Done";
import Request from "../../../requests/Request";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setVal } from "../../../store/action";

const AuthInfo = ({ user, _setVal }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    auth__user: {
      id: user?.id,
      first_name: "",
      last_name: "",
      phone: "",
    },
    Product__company: {
      user: user?.id,
      name: "",
      registry_number: "",
      country: "",
      city: "",
      industries: "",
      financial_end: "",
      currency: "",
      start_date: "",
      tax_rate: "",
    },
    loading: true,
    error: null,
  });
  const submit = (data) => {
    Request.sendRequest("update_models/", data)
      .then((res) => {
        setFormData({
          ...formData,
          loading: false,
        });
        _setVal("SETVALUE", { user: res?.data?.auth__user[0] });
      })
      .catch((err) => {
        setFormData({
          ...formData,
          error: err?.data?.msg,
        });
      });
  };
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);
  switch (step) {
    case 1:
      return (
        <Configure
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <AddCompany
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      );
    default:
      return <Done formData={formData} prevStep={prevStep} submit={submit} />;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    _setVal: (type, value) => {
      dispatch(setVal(type, value));
    },
  };
};
export default connect(null, mapDispatchToProps)(withTranslation()(AuthInfo));
