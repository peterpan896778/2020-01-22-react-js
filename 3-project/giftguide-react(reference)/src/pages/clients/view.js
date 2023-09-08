import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PicturesWall from "../../components/ImageWall";
import {
  Row,
  Col,
  Card,
  CardBody,
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Nav, NavItem, NavLink, TabContent, TabPane,
} from "reactstrap";
import classnames from 'classnames';
import { Typeahead } from "react-bootstrap-typeahead";
import {
  parseISO,
  differenceInCalendarYears,
  addYears
} from "date-fns";
import format from 'date-fns/format';
import { getLoggedInUser } from "../../helpers/authUtils";
import { getClient, addPolicy, getUser, deletePolicy } from "../../redux/actions";
import Loader from "../../components/Loader";
import Input from "../../components/Input";
import { PdfDocument } from "../../components/PdfDocument";
import { Icon } from "antd";
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "c-i",
      user: getLoggedInUser(),
      policyModal: false,
      paymentMethod: false,
      policyDetailModal: false,

      policyName: "",
      policyNumber: "",
      policyType: "",
      company: "",
      policyStartDate: "",
      ageIncepted: 0,
      policyEndAge: 0,
      policyDuration: "",
      premiumSGD: "",
      paymentFrequency: "",
      paymentMethod: "Cash",
      premiumEndAge: "",
      cashValueAmount: 0,
      cashValueAge: 0,
      maturityAmountAge: 0,
      maturityAmount: 0,
      couponPayoutFromAge: 0,
      couponPayoutToAge: 0,
      couponPayoutAnnualAmount: 0,
      investmentValueAge1: 0,
      investmentValueAge2: 0,
      investmentValueAge3: 0,
      investmentValueAmount1: 0,
      investmentValueAmount2: 0,
      investmentValueAmount3: 0,
      remarks: "",

      death: "",
      totalPermanentDisability: "",
      disabilityIncome: "",
      criticalIllness: "",
      earlyCriticalIllness: "",
      accidentalDeath: "",
      accidentalDisability: "",
      accidentalReimbursement: "",
      hospitalization: "",
      hospitalIncome: "",
      other: "",

      policy: "",
      userFinancial: {
        death: 0,
        tpd: 0,
        critical_illness: 0,
        early_critical_illness: 0,
        disability_income: 0,
        accidental_death: 0,
        accidental_disability: 0,
        accidental_reimbursement: 0,
        currentCategory: '',
        data: props.data
      },
      readyPDF: true
    };
    this.SumofFinancialSummary = {};
  }

  initalState = () => {
    this.setState({
      policyName: "",
      policyNumber: "",
      policyType: "",
      company: "",
      policyStartDate: "",
      ageIncepted: 0,
      policyEndAge: 0,
      policyDuration: "",
      premiumSGD: "",
      paymentFrequency: "",
      paymentMethod: "Cash",
      premiumEndAge: "",
      cashValueAmount: "",
      cashValueAge: "",
      maturityAmountAge: "",
      maturityAmount: "",
      couponPayoutFromAge: "",
      couponPayoutToAge: "",
      couponPayoutAnnualAmount: "",
      investmentValueAge1: "",
      investmentValueAge2: "",
      investmentValueAge3: "",
      investmentValueAmount1: "",
      investmentValueAmount2: "",
      investmentValueAmount3: "",
      remarks: "",

      death: "",
      totalPermanentDisability: "",
      disabilityIncome: "",
      criticalIllness: "",
      earlyCriticalIllness: "",
      accidentalDeath: "",
      accidentalDisability: "",
      accidentalReimbursement: "",
      hospitalization: "",
      hospitalIncome: "",
      other: "",

      policy: "",
      userFinancial: {
        death: 0,
        tpd: 0,
        critical_illness: 0,
        early_critical_illness: 0,
        disability_income: 0,
        accidental_death: 0,
        accidental_disability: 0,
        accidental_reimbursement: 0,
        currentCategory: '',
      },
      readyPDF: true
    });
  };

  setActive = active => {
    this.setState({
      active
    });
  };

  componentDidMount() {
    this.props.getUser(this.state.user.id);
    this.props.getClient(this.props.match.params.id);
    
    this.setState({ readyPDF: false });
    setTimeout(()=>{
      this.setState({ readyPDF: true });
    }, 1.5);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({
        userFinancial: {
          death: nextProps.user.financial.death,
          tpd: nextProps.user.financial.tpd,
          critical_illness: nextProps.user.financial.critical_illness,
          early_critical_illness: nextProps.user.financial.early_critical_illness,
          disability_income: nextProps.user.financial.disability_income,
          accidental_death: nextProps.user.financial.accidental_death,
          accidental_disability: nextProps.user.financial.accidental_disability,
          accidental_reimbursement: nextProps.user.financial.accidental_reimbursement,
          categories: nextProps.user.categories
        }
      });
    }
  }

  calcPolicyDuration() {
    if (this.state.policyEndAge !== "" && this.state.ageIncepted !== "") {
      let x = parseInt(this.state.policyEndAge, "10");
      let y = parseInt(this.state.ageIncepted, "10");
      this.setState({
        policyDuration: `${x - y} years`
      });
    }
  }
  togglePolicy() {
    this.initalState();
    this.setState(prevState => ({
      policyModal: !prevState.policyModal
    }));
  }

  toggleBenefits() {
    this.setState(prevState => ({
      benefitModal: !prevState.benefitModal
    }));
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onChangeDecimalHandler = e => {
    if (e.target.value.search(/\D+/) >= 0) {
      return null;
    }
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  handlecompany = e => {
    let x = typeof e[0];
    if (typeof e[0] === 'object') {
      this.setState({ company: e[0].label });
      return null;
    }
    if (e.length) this.setState({ company: e[0] });
  };
  handlePayment = e => {
    this.setState({ paymentMethod: e[0] });
  };

  togglePolicyBox = key => {
    this.setState({ policy: key });
    this.setState(prevState => ({
      policyDetailModal: !prevState.policyDetailModal
    }));
  };

  onSubmitHandler = e => {
    e.preventDefault();

    this.togglePolicy();
    const {
      policyName,
      policyNumber,
      policyType,
      company,
      policyStartDate,
      ageIncepted,
      policyEndAge,
      policyDuration,
      premiumSGD,
      paymentFrequency,
      paymentMethod,
      premiumEndAge,
      remarks,
      death,
      totalPermanentDisability,
      disabilityIncome,
      criticalIllness,
      earlyCriticalIllness,
      accidentalDeath,
      accidentalDisability,
      accidentalReimbursement,
      hospitalization,
      hospitalIncome,
      cashValueAge,
      cashValueAmount,
      maturityAmountAge,
      maturityAmount,
      couponPayoutFromAge,
      couponPayoutToAge,
      couponPayoutAnnualAmount,
      investmentValueAge1,
      investmentValueAge2,
      investmentValueAge3,
      investmentValueAmount1,
      investmentValueAmount2,
      investmentValueAmount3,
      other
    } = this.state;
    this.props.addPolicy(
      this.props.match.params.id,
      policyName,
      policyNumber,
      policyType,
      company,
      policyStartDate,
      ageIncepted,
      policyEndAge,
      policyDuration,
      premiumSGD,
      paymentFrequency,
      paymentMethod,
      premiumEndAge,
      remarks,
      death,
      cashValueAge,
      cashValueAmount,
      maturityAmountAge,
      maturityAmount,
      couponPayoutFromAge,
      couponPayoutToAge,
      couponPayoutAnnualAmount,
      investmentValueAge1,
      investmentValueAge2,
      investmentValueAge3,
      investmentValueAmount1,
      investmentValueAmount2,
      investmentValueAmount3,
      totalPermanentDisability,
      disabilityIncome,
      criticalIllness,
      earlyCriticalIllness,
      accidentalDeath,
      accidentalDisability,
      accidentalReimbursement,
      hospitalization,
      hospitalIncome,
      other
    );
  };

  onSubmitHandlerBenefit = e => {
    e.preventDefault();

    this.toggleBenefits();
  };
  SumUPPoliciesFigures = () => {
    const { client } = this.props;
    let value = {
      accidentalDeath: 0,
      accidentalDisability: 0,
      accidentalReimbursement: 0,
      criticalIllness: 0,
      death: 0,
      disabilityIncome: 0,
      earlyCriticalIllness: 0,
      hospitalIncome: "",
      hospitalization: "",
      other: "",
      totalPermanentDisability: 0
    };
    client.policies.map(item => {
      let benefit = item.benefit;
      value.accidentalDeath += parseInt(benefit.accidentalDeath, 10)
        ? parseInt(benefit.accidentalDeath, 10)
        : 0;
      value.accidentalDisability += parseInt(benefit.accidentalDisability, 10)
        ? parseInt(benefit.accidentalDisability, 10)
        : 0;
      value.accidentalReimbursement += parseInt(
        benefit.accidentalReimbursement,
        10
      )
        ? parseInt(benefit.accidentalReimbursement, 10)
        : 0;
      value.death += parseInt(benefit.death, 10)
        ? parseInt(benefit.death, 10)
        : 0;
      value.disabilityIncome += parseInt(benefit.disabilityIncome, 10)
        ? parseInt(benefit.disabilityIncome, 10)
        : 0;
      value.earlyCriticalIllness += parseInt(benefit.earlyCriticalIllness, 10)
        ? parseInt(benefit.earlyCriticalIllness, 10)
        : 0;
      value.criticalIllness += parseInt(benefit.criticalIllness, 10)
        ? parseInt(benefit.criticalIllness, 10)
        : 0;

      value.hospitalIncome = benefit.hospitalIncome
        ? benefit.hospitalIncome
        : null;
      value.hospitalization =
        benefit.hospitalization !== "" ? benefit.hospitalization : null;
      value.totalPermanentDisability += parseInt(
        benefit.totalPermanentDisability,
        10
      )
        ? parseInt(benefit.totalPermanentDisability, 10)
        : 0;

      //End of Map
      return null;
    });
    this.SumofFinancialSummary = value;
    return null;
  };
  deletePolicy(_id)
  {
    this.props.deletePolicy(_id);
  }
  getPolicyDetailsFiled()
  {
    if (this.props.policyAdded) {
      this.props.getClient(this.props.match.params.id);
    }
    const { client } = this.props;
    if(this.state.policy !== "null" &&
    client.policies &&
    client.policies[this.state.policy] && client.policies[this.state.policy].policyType == "Risk Management")
    {
      return (<Col lg={12}>
        <div className="form-group">
          <label>Coupon Payout</label>
          <Row>
            <Col lg={3}>
              <input
                type="text"
                name="couponPayoutFromAge"
                placeholder="FromAge"
                className="form-control"
                value={client.policies[this.state.policy].couponPayoutFromAge}
                readOnly
              />
            </Col>
            <Col lg={3}>
              <input
                type="text"
                name="couponPayoutToAge"
                placeholder="ToAge"
                className="form-control"
                value={client.policies[this.state.policy].couponPayoutToAge}
                readOnly
              />
            </Col>
            <Col lg={6}>
              <input
                type="text"
                name="couponPayoutAnnualAmount"
                placeholder="AnnualAmount"
                className="form-control"
                value={client.policies[this.state.policy].couponPayoutAnnualAmount}
                readOnly
              />
            </Col>
          </Row>
        </div>
      </Col>);
    }
    else if(this.state.policy !== "null" &&
    client.policies &&
    client.policies[this.state.policy] && client.policies[this.state.policy].policyType == "Wealth Accumulation" || 
    this.state.policy !== "null" &&
    client.policies &&
    client.policies[this.state.policy] && client.policies[this.state.policy].policyType == "Wealth Preservation")
    {
      return (<div style={{width: "100%"}}>
        <Col lg={12}>
          <div className="form-group">
            <label>Maturity Amount</label>
            <Row>
              <Col lg={6}>
                <input
                  type="text"
                  name="maturityAmountAge"
                  placeholder="Age"
                  className="form-control"
                  value={client.policies[this.state.policy].maturityAmountAge}
                  readOnly
                />
              </Col>
              <Col lg={6}>
                <input
                  type="text"
                  name="maturityAmount"
                  placeholder="Amount"
                  className="form-control"
                  value={client.policies[this.state.policy].maturityAmount}
                  readOnly
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={12}>
          <div className="form-group">
            <label>Coupon Payout</label>
            <Row>
              <Col lg={3}>
                <input
                  type="text"
                  name="couponPayoutFromAge"
                  placeholder="FromAge"
                  className="form-control"
                  value={client.policies[this.state.policy].couponPayoutFromAge}
                  readOnly
                />
              </Col>
              <Col lg={3}>
                <input
                  type="text"
                  name="couponPayoutToAge"
                  placeholder="ToAge"
                  className="form-control"
                  value={client.policies[this.state.policy].couponPayoutToAge}
                  readOnly
                />
              </Col>
              <Col lg={6}>
                <input
                  type="text"
                  name="couponPayoutAnnualAmount"
                  placeholder="AnnualAmount"
                  className="form-control"
                  value={client.policies[this.state.policy].couponPayoutAnnualAmount}
                  readOnly
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={12}>
        <div className="form-group">
          <label>Investment Value</label>
          <Row>
            <Col lg={6}>
              <input
                type="text"
                name="investmentValueAge1"
                placeholder="Age"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAge1}
                readOnly
              />
            </Col>
            <Col lg={6}>
              <input
                type="text"
                name="investmentValueAmount1"
                placeholder="Amount"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAmount1}
                readOnly
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={12}>
        <div className="form-group">
          <Row>
            <Col lg={6}>
              <input
                type="text"
                name="investmentValueAge2"
                placeholder="Age"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAge2}
                readOnly
              />
            </Col>
            <Col lg={6}>
              <input
                type="text"
                name="investmentValueAmount2"
                placeholder="Amount"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAmount2}
                readOnly
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={12}>
        <div className="form-group">
          <Row>
          <Col lg={6}>
              <input
                type="text"
                name="investmentValueAge3"
                placeholder="Age"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAge3}
                readOnly
              />
            </Col>
            <Col lg={6}>
              <input
                type="text"
                name="investmentValueAmount3"
                placeholder="Amount"
                className="form-control"
                value={client.policies[this.state.policy].investmentValueAmount3}
                readOnly
              />
            </Col>
          </Row>
        </div>
      </Col>
    </div>);
    }
  }
  getPolicyAddFiled()
  {
    if(this.state.policyType == "Risk Management")
    {
      return (<Col lg={12}>
        <div className="form-group">
          <label>Coupon Payout</label>
          <Row>
            <Col lg={3}>
              <input
                type="number"
                name="couponPayoutFromAge"
                value={this.state.couponPayoutFromAge}
                onChange={this.onChangeHandler}
                placeholder="From Age"
                className="form-control"
                onBlur={e => {
                  this.setState({
                    couponPayoutFromAge: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(0)
                  });
                }}
              />
            </Col>
            <Col lg={3}>
              <input
                type="number"
                name="couponPayoutToAge"
                value={this.state.couponPayoutToAge}
                onChange={this.onChangeHandler}
                placeholder="To Age"
                className="form-control"
                onBlur={e => {
                  this.setState({
                    couponPayoutToAge: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(0)
                  });
                }}
              />
            </Col>
            <Col lg={6}>
              <input
                type="number"
                name="couponPayoutAnnualAmount"
                className="form-control"
                value={this.state.couponPayoutAnnualAmount}
                onChange={this.onChangeHandler}
                onBlur={e => {
                  this.setState({
                    couponPayoutAnnualAmount: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(2)
                  });
                }}
                placeholder="Annual Amount"
              />
            </Col>
          </Row>
        </div>
      </Col>);
    }
    else if(this.state.policyType == "Wealth Accumulation" || this.state.policyType == "Wealth Preservation")
    {
      return (<div style={{width: "100%"}}>
        <Col lg={12}>
          <div className="form-group">
            <label>Maturity Amount</label>
            <Row>
              <Col lg={6}>
                <input
                  type="number"
                  name="maturityAmountAge"
                  value={this.state.maturityAmountAge}
                  onChange={this.onChangeHandler}
                  placeholder="Age"
                  className="form-control"
                  onBlur={e => {
                    this.setState({
                      maturityAmountAge: parseFloat(
                        e.target.value,
                        "10"
                      ).toFixed(0)
                    });
                  }}
                />
              </Col>
              <Col lg={6}>
                <input
                  type="number"
                  name="maturityAmount"
                  className="form-control"
                  value={this.state.maturityAmount}
                  onChange={this.onChangeHandler}
                  onBlur={e => {
                    this.setState({
                      maturityAmount: parseFloat(
                        e.target.value,
                        "10"
                      ).toFixed(2)
                    });
                  }}
                  placeholder="Amount"
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={12}>
          <div className="form-group">
            <label>Coupon Payout</label>
            <Row>
              <Col lg={3}>
                <input
                  type="number"
                  name="couponPayoutFromAge"
                  value={this.state.couponPayoutFromAge}
                  onChange={this.onChangeHandler}
                  placeholder="From Age"
                  className="form-control"
                  onBlur={e => {
                    this.setState({
                      couponPayoutFromAge: parseFloat(
                        e.target.value,
                        "10"
                      ).toFixed(0)
                    });
                  }}
                />
              </Col>
              <Col lg={3}>
                <input
                  type="number"
                  name="couponPayoutToAge"
                  value={this.state.couponPayoutToAge}
                  onChange={this.onChangeHandler}
                  placeholder="To Age"
                  className="form-control"
                  onBlur={e => {
                    this.setState({
                      couponPayoutToAge: parseFloat(
                        e.target.value,
                        "10"
                      ).toFixed(0)
                    });
                  }}
                />
              </Col>
              <Col lg={6}>
                <input
                  type="number"
                  name="couponPayoutAnnualAmount"
                  className="form-control"
                  value={this.state.couponPayoutAnnualAmount}
                  onChange={this.onChangeHandler}
                  onBlur={e => {
                    this.setState({
                      couponPayoutAnnualAmount: parseFloat(
                        e.target.value,
                        "10"
                      ).toFixed(2)
                    });
                  }}
                  placeholder="Annual Amount"
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col lg={12}>
        <div className="form-group">
          <label>Investment Value</label>
          <Row>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAge1"
                value={this.state.investmentValueAge1}
                onChange={this.onChangeHandler}
                placeholder="Age"
                className="form-control"
                onBlur={e => {
                  this.setState({
                    investmentValueAge1: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(0)
                  });
                }}
              />
            </Col>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAmount1"
                className="form-control"
                value={this.state.investmentValueAmount1}
                onChange={this.onChangeHandler}
                onBlur={e => {
                  this.setState({
                    investmentValueAmount1: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(2)
                  });
                }}
                placeholder="Amount"
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={12}>
        <div className="form-group">
          <Row>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAge2"
                value={this.state.investmentValueAge2}
                onChange={this.onChangeHandler}
                placeholder="Age"
                className="form-control"
                onBlur={e => {
                  this.setState({
                    investmentValueAge2: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(0)
                  });
                }}
              />
            </Col>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAmount2"
                className="form-control"
                value={this.state.investmentValueAmount2}
                onChange={this.onChangeHandler}
                onBlur={e => {
                  this.setState({
                    investmentValueAmount2: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(2)
                  });
                }}
                placeholder="Amount"
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col lg={12}>
        <div className="form-group">
          <Row>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAge3"
                value={this.state.investmentValueAge3}
                onChange={this.onChangeHandler}
                placeholder="Age"
                className="form-control"
                onBlur={e => {
                  this.setState({
                    investmentValueAge3: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(0)
                  });
                }}
              />
            </Col>
            <Col lg={6}>
              <input
                type="number"
                name="investmentValueAmount3"
                className="form-control"
                value={this.state.investmentValueAmount3}
                onChange={this.onChangeHandler}
                onBlur={e => {
                  this.setState({
                    investmentValueAmount3: parseFloat(
                      e.target.value,
                      "10"
                    ).toFixed(2)
                  });
                }}
                placeholder="Amount"
              />
            </Col>
          </Row>
        </div>
      </Col>
    </div>);
    }
  }
  render() {
    let images = [];
    let hospitalizationSum = "";
    let hospitalizationIncomeSum = "";

    if (this.props.policyAdded) {
      this.props.getClient(this.props.match.params.id);
    }
    const { client } = this.props;

    if (client.policies) {
      this.SumUPPoliciesFigures();
      images = client.cards.map((item, key) => {
        return { ...item, uid: key };
      });

      for(let i = 0; i < client.policies.length ; i++)  {
          let policy = client.policies[i];
          if(i == client.policies.length - 1) {
            hospitalizationSum += policy.benefit.hospitalization;
            hospitalizationIncomeSum += policy.benefit.hospitalIncome;
          }else {
            hospitalizationSum += policy.benefit.hospitalization + ",";
            hospitalizationIncomeSum += policy.benefit.hospitalIncome + ",";
          }
      }
    }
    const paymentOption = ["Cash", "Medisave", "CPF- OA", "CPF- SA"];
    const companyoption = [
      "AIA",
      "Aviva",
      "AXA Life",
      "China Life",
      "Great Eastern",
      "HSBC",
      "Manulife",
      "NTUC Income",
      "Overseas Assurance",
      "Singapore Life",
      "Transamerica",
      "Prudential",
      "Zurich"
    ];

    let pdfButton;
    
    if (this.state.readyPDF) {
      pdfButton = (<PDFDownloadLink
        document={<PdfDocument data={client} />}
        fileName="FinancialPortfolio.pdf"
      >
        <button className="btn btn-secondary">&nbsp;&nbsp;&nbsp;Print&nbsp;&nbsp;&nbsp;</button>
      </PDFDownloadLink>)
    }else {
      pdfButton = <button className="btn btn-secondary">&nbsp;&nbsp;&nbsp;Print&nbsp;&nbsp;&nbsp;</button>
    }

    return (
      <React.Fragment>
        <div>
          {this.props.loading && <Loader />}
          <Row>
            <Col>
              <div className="page-title-box">
                <Row>
                  <Col lg={7}>
                    <h4 className="page-title">Basic Information</h4>
                  </Col>
                  <Col lg={5} className="mt-lg-3 mt-md-0 text-right">
                    {pdfButton}
                    &nbsp;
                    <Button color="primary" onClick={() => this.togglePolicy()}>
                      Add Policy
                    </Button>
                    <Modal
                      size="lg"
                      isOpen={this.state.policyModal}
                      toggle={() => this.togglePolicy()}
                    >
                      <ModalHeader>Add Policy</ModalHeader>
                      <ModalBody>
                        <form onSubmit={this.onSubmitHandler}>
                          <Row>
                            <Col lg={12}>
                              <Input
                                label="Policy Name"
                                type="text"
                                name="policyName"
                                onChange={this.onChangeHandler}
                                value={this.state.policyName}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Policy Number"
                                type="text"
                                name="policyNumber"
                                onChange={this.onChangeHandler}
                                value={this.state.policyNumber}
                              />
                            </Col>
                            <Col lg={6}>
                              <div className="form-group">
                                <label>Policy Type</label>
                                <select
                                  name="policyType"
                                  className="form-control"
                                  onChange={this.onChangeHandler}
                                  value={this.state.policyType}
                                >
                                  <option value="">Choose type</option>
                                  <option value="Risk Management">
                                    Risk Management
                                  </option>
                                  <option value="Wealth Accumulation">
                                    Wealth Accumulation
                                  </option>
                                  <option value="Wealth Preservation">
                                    Wealth Preservation
                                  </option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div style={{ marginBottom: "15px" }}>
                                <label>Company</label>
                                <Typeahead
                                  allowNew
                                  id="company"
                                  multiple={false}
                                  options={companyoption}
                                  onChange={this.handlecompany}
                                  placeholder="Choose a Company...."
                                />
                              </div>
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy Start Date"
                                type="date"
                                name="policyStartDate"
                                onChange={this.onChangeHandler}
                                value={this.state.policyStartDate}
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Age Incepted"
                                type="text"
                                name="ageIncepted"
                                onChange={e => {
                                  this.onChangeDecimalHandler(e);
                                }}
                                value={this.state.ageIncepted}
                                onBlur={e => this.calcPolicyDuration()}
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy End Age"
                                type="text"
                                name="policyEndAge"
                                onChange={e => {
                                  this.onChangeDecimalHandler(e);
                                }}
                                value={this.state.policyEndAge}
                                onBlur={e => this.calcPolicyDuration()}
                                
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy Duration"
                                type="text"
                                name="policyDuration"
                                onChange={this.onChangeHandler}
                                value={this.state.policyDuration}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Premium (SGD)"
                                type="text"
                                name="premiumSGD"
                                onChange={this.onChangeHandler}
                                value={this.state.premiumSGD}
                              />
                            </Col>
                            <Col lg={6}>
                              <div className="form-group">
                                <label>Payment Frequency</label>
                                <select
                                  name="paymentFrequency"
                                  className="form-control"
                                  onChange={this.onChangeHandler}
                                  value={this.state.paymentFrequency}
                                >
                                  <option value="">Choose type</option>
                                  <option value="Monthly">Monthly</option>
                                  <option value="Quarterly">Quarterly</option>
                                  <option value="Half Yearly">
                                    Half Yearly
                                  </option>
                                  <option value="Annually">Annually</option>
                                  <option value="Single Premium">
                                    Single Premium
                                  </option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={6}>
                              <div style={{ marginBottom: "15px" }}>
                                <label>Payment Method</label>
                                <Typeahead
                                  id="company"
                                  multiple={false}
                                  options={paymentOption}
                                  onChange={this.handlePayment}
                                  placeholder="Choose a Payment Method...."
                                />
                              </div>
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Premium End Age"
                                type="text"
                                name="premiumEndAge"
                                onChange={this.onChangeDecimalHandler}
                                value={this.state.premiumEndAge}
                              />
                            </Col>

                            <Col lg={12}>
                              <div className="form-group">
                                <label>Cash Value</label>
                                <Row>
                                  <Col lg={6}>
                                    <input
                                      type="number"
                                      name="cashValueAge"
                                      value={this.state.cashValueAge}
                                      onChange={this.onChangeHandler}
                                      placeholder="Age"
                                      className="form-control"
                                      onBlur={e => {
                                        this.setState({
                                          cashValueAge: parseFloat(
                                            e.target.value,
                                            "10"
                                          ).toFixed(0)
                                        });
                                      }}
                                    />
                                  </Col>
                                  <Col lg={6}>
                                    <input
                                      type="number"
                                      name="cashValueAmount"
                                      className="form-control"
                                      value={this.state.cashValueAmount}
                                      onChange={this.onChangeHandler}
                                      onBlur={e => {
                                        this.setState({
                                          cashValueAmount: parseFloat(
                                            e.target.value,
                                            "10"
                                          ).toFixed(2)
                                        });
                                      }}
                                      placeholder="Amount"
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                            {
                              this.getPolicyAddFiled()                              
                            }
                            <Col lg={12}>
                              <Input
                                label="Remarks"
                                type="text"
                                name="remarks"
                                onChange={this.onChangeHandler}
                                value={this.state.remarks}
                              />
                            </Col>
                            <Col lg={12} className="text-right">
                              <Button
                                color="success"
                                onClick={() => this.toggleBenefits()}
                              >
                                Add Benefit
                              </Button>
                            </Col>
                            <Col lg={12}>
                              <Button color="primary">Submit</Button>
                              <Button
                                color="secondary"
                                className="ml-1"
                                onClick={() => this.togglePolicy()}
                              >
                                Cancel
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </ModalBody>
                    </Modal>
                    <Modal
                      isOpen={this.state.benefitModal}
                      toggle={() => this.toggleBenefits()}
                    >
                      <ModalHeader>Add Benefit</ModalHeader>
                      <ModalBody>
                        <form
                          onSubmit={this.onSubmitHandlerBenefit}
                          className="form-horizontal"
                        >
                          <Row>
                            <Col lg={6}>
                              <Input
                                label="Death"
                                type="text"
                                name="death"
                                onChange={this.onChangeHandler}
                                value={this.state.death}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Total Permanent Disability"
                                type="text"
                                name="totalPermanentDisability"
                                onChange={this.onChangeHandler}
                                value={this.state.totalPermanentDisability}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Disability Income"
                                type="text"
                                name="disabilityIncome"
                                onChange={this.onChangeHandler}
                                value={this.state.disabilityIncome}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Critical Illness"
                                type="text"
                                name="criticalIllness"
                                onChange={this.onChangeHandler}
                                value={this.state.criticalIllness}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Early Critical Illness"
                                type="text"
                                name="earlyCriticalIllness"
                                onChange={this.onChangeHandler}
                                value={this.state.earlyCriticalIllness}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Accidental Death"
                                type="text"
                                name="accidentalDeath"
                                onChange={this.onChangeHandler}
                                value={this.state.accidentalDeath}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Accidental Disability"
                                type="text"
                                name="accidentalDisability"
                                onChange={this.onChangeHandler}
                                value={this.state.accidentalDisability}
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Accidental Reimbursement"
                                type="text"
                                name="accidentalReimbursement"
                                onChange={this.onChangeHandler}
                                value={this.state.accidentalReimbursement}
                              />
                            </Col>
                            <Col lg={12}>
                              <Input
                                label="Hospitalization"
                                type="text"
                                name="hospitalization"
                                onChange={this.onChangeHandler}
                                value={this.state.hospitalization}
                              />
                            </Col>
                            <Col lg={12}>
                              <Input
                                label="Hospital Income"
                                type="text"
                                name="hospitalIncome"
                                onChange={this.onChangeHandler}
                                value={this.state.hospitalIncome}
                              />
                            </Col>
                            <Col lg={12}>
                              <Input
                                label="Other"
                                type="text"
                                name="other"
                                onChange={this.onChangeHandler}
                                value={this.state.other}
                              />
                            </Col>
                            <Col lg={12}>
                              <Button color="primary">Submit</Button>
                              <Button
                                color="secondary"
                                className="ml-1"
                                onClick={() => this.toggleBenefits()}
                              >
                                Cancel
                              </Button>
                            </Col>
                          </Row>
                        </form>
                      </ModalBody>
                    </Modal>
                    <Modal
                      size="lg"
                      isOpen={this.state.policyDetailModal}
                      toggle={() => this.togglePolicyBox()}
                    >
                      <ModalHeader>Policy Details</ModalHeader>
                      <ModalBody>
                      {this.state.policy !== "null" &&
                          client.policies &&
                          client.policies[this.state.policy] ? (
                        <form onSubmit={this.onSubmitHandler}>
                          <Row>
                            <Col lg={12}>
                              <Input
                                label="Policy Name"
                                type="text"
                                name="policyName"
                                value={client.policies[this.state.policy].policyName}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Policy Number"
                                type="text"
                                name="policyNumber"
                                value={client.policies[this.state.policy].policyNumber}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Policy Type"
                                type="text"
                                name="policyType"
                                value={client.policies[this.state.policy].policyType}
                                readOnly
                              />
                            </Col>
                            <Col lg={12}>
                              <Input
                                label="Company"
                                type="text"
                                name="company"
                                value={client.policies[this.state.policy].company}
                                readOnly
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy Start Date"
                                type="text"
                                name="policyStartDate"
                                value={client.policies[this.state.policy].policyStartDate}
                                readOnly
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Age Incepted"
                                type="text"
                                name="ageIncepted"
                                value={client.policies[this.state.policy].ageIncepted}
                                readOnly
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy End Age"
                                type="text"
                                name="policyEndAge"
                                value={client.policies[this.state.policy].policyEndAge}
                                readOnly
                              />
                            </Col>
                            <Col lg={3}>
                              <Input
                                label="Policy Duration"
                                type="text"
                                name="policyDuration"
                                value={client.policies[this.state.policy].policyDuration}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Premium (SGD)"
                                type="text"
                                name="premiumSGD"
                                value={client.policies[this.state.policy].premiumSGD}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Payment Frequency"
                                type="text"
                                name="paymentFrequency"
                                value={client.policies[this.state.policy].paymentFrequency}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Payment Method"
                                type="text"
                                value={client.policies[this.state.policy].paymentMethod}
                                readOnly
                              />
                            </Col>
                            <Col lg={6}>
                              <Input
                                label="Premium End Age"
                                type="text"
                                name="premiumEndAge"
                                value={client.policies[this.state.policy].premiumEndAge}
                                readOnly
                              />
                            </Col>

                            <Col lg={12}>
                              <div className="form-group">
                                <label>Cash Value</label>
                                <Row>
                                  <Col lg={6}>
                                    <input
                                      type="text"
                                      name="cashValueAge"
                                      placeholder="Age"
                                      className="form-control"
                                      value={client.policies[this.state.policy].cashValueAge}
                                      readOnly
                                    />
                                  </Col>
                                  <Col lg={6}>
                                    <input
                                      type="text"
                                      name="cashValueAmount"
                                      placeholder="Age"
                                      className="form-control"
                                      value={client.policies[this.state.policy].cashValueAmount}
                                      readOnly
                                    />
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                            {
                              this.getPolicyDetailsFiled()                              
                            }
                            <Col lg={12}>
                              <Input
                                label="Remarks"
                                type="text"
                                name="remarks"
                                onChange={this.onChangeHandler}
                                value={client.policies[this.state.policy].remarks}
                              />
                            </Col>
                          </Row>
                        </form>
                        ) : null}
                      </ModalBody>
                    </Modal>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <Card>
                      <CardBody>
                        {this.props.error && (
                          <Alert color="danger" isOpen={!!this.props.error}>
                            <div>{this.props.error}</div>
                          </Alert>
                        )}
                        <p>
                          <strong>Name:</strong> {client.nricName} (
                          {client.preferredName})
                        </p>
                        <p>
                          <strong>Age:</strong>{" "}
                          {client.dob ? differenceInCalendarYears(new Date(),parseISO(client.dob)) : ''}
                        </p>
                        <PicturesWall justDisplay={true} fileList={images} />
                        <br />
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.active === 'c-i' })}
                              onClick={() => this.setActive("c-i")}
                            >
                              <h5>Client Information</h5>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.active === 'i-p' })}
                              onClick={() => this.setActive("i-p")}
                            >
                              <h5>Insurance Policies</h5>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.active} >
                          <TabPane tabId="c-i">
                            <p>
                              <strong>Category: </strong>
                              {client.category}
                            </p>
                            <p>
                              <strong>NRIC / Passport: </strong>
                              {client.nric_passport}
                            </p>
                            <p>
                              <strong>Date of Birth: </strong>
                              {client.dob &&
                                format(parseISO(client.dob), "dd/MM/yyyy")}
                            </p>
                            <p>
                              <strong>Email: </strong>
                              {client.email}
                            </p>
                            <p>
                              <strong>Contact No: </strong>
                              {client.contact}
                            </p>
                            <p>
                              <strong>Contact No 2: </strong>
                              {client.contact2}
                            </p>
                            <p>
                              <strong>Gender: </strong>
                              {client.gender}
                            </p>
                            <p>
                              <strong>Race: </strong>
                              {client.race}
                            </p>
                            <p>
                              <strong>Nationality: </strong>
                              {client.nationality}
                            </p>
                            <p>
                              <strong>Occupation: </strong>
                              {client.occupation}
                            </p>
                            <p>
                              <strong>Company Name: </strong>
                              {client.companyname}
                            </p>
                            <p>
                              <strong>Company Address: </strong>
                              {client.companyaddress}
                            </p> 
                            <p>
                              <strong>Address: </strong>
                              {client.address}
                            </p>
                            <p>
                              <strong>Family: </strong>
                              {client.family && (
                                <Link to={`/clients/${client.family.id}/view`}>{client.family.label}</Link>
                              )}
                            </p>
                            <p>
                              <strong>Family Relationship: </strong>
                              {client.familyrelationship}
                            </p>
                            <p>
                              <strong>Referred Source: </strong>
                              {client.referredsource && (
                                <Link to={`/clients/${client.referredsource.id}/view`}>{client.referredsource.label}</Link>
                              )}
                            </p>
                            <p>
                              <strong>Other Source: </strong>
                              {client.othersource}
                            </p>
                            <p>
                              <strong>Last Purchase: </strong>
                              {client.lastpurchasae &&
                                format(parseISO(client.lastpurchasae), "yyyy/MM/dd")}
                            </p>
                            <p>
                              <strong>Next Followup Date: </strong>
                              {client.nextFollowUpDate &&
                                format(parseISO(client.nextFollowUpDate), "yyyy/MM/dd")}
                            </p>
                            <p>
                              <strong>Remarks: </strong>
                              {client.remarks}
                            </p>
                            <br />
                            <h5>Coverage & Financial Summary</h5>
                            <hr />
                            <p>
                              <strong>Annual Income: $</strong>
                              {client.annualIncome}
                            </p>
                            <br />

                            <Row>
                              <Col lg={3}>Income Protection</Col>
                              <Col lg={2}>Benefit</Col>
                              <Col lg={3}>Optimisation</Col>
                              <Col lg={2}>Met</Col>
                              <Col lg={2} />
                            </Row>

                            <Row>
                              <Col lg={3}>Death</Col>
                              <Col lg={2}>
                                ${this.SumofFinancialSummary.death}
                              </Col>
                              <Col lg={3}>{(client.annualIncome * this.state.userFinancial.death / 100 - this.SumofFinancialSummary.death) > 0 ?
                                'Shortfall: $' + (client.annualIncome * this.state.userFinancial.death / 100 - this.SumofFinancialSummary.death) : 'No Shortfall'}
                              </Col>
                              <Col lg={2}>
                                {(client.annualIncome * this.state.userFinancial.death / 100 - this.SumofFinancialSummary.death) > 0 ?
                                  <i className="fas fa-times"/> : <i className="fas fa-check" style={{'fontSize' : 12}} />}
                              </Col>
                              <Col lg={2}>${client.annualIncome * this.state.userFinancial.death / 100}</Col>
                            </Row>
                            <Row>
                              <Col lg={3}>TPD</Col>
                              <Col lg={2}>
                                $
                                  {
                                  this.SumofFinancialSummary
                                    .totalPermanentDisability
                                }
                              </Col>
                              <Col lg={3}>{(client.annualIncome * this.state.userFinancial.tpd / 100 - this.SumofFinancialSummary.totalPermanentDisability) > 0 ?
                                'Shortfall: $' + (client.annualIncome * this.state.userFinancial.tpd / 100 - this.SumofFinancialSummary.totalPermanentDisability) : 'No Shortfall'}</Col>
                              <Col lg={2}>
                                {(client.annualIncome * this.state.userFinancial.tpd / 100 - this.SumofFinancialSummary.totalPermanentDisability) > 0 ?
                                  <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}}  />}</Col>
                              <Col lg={2}>${client.annualIncome * this.state.userFinancial.tpd / 100}</Col>
                            </Row>
                            <Row>
                              <Col lg={3}>Critical Illness</Col>
                              <Col lg={2}>
                                ${this.SumofFinancialSummary.criticalIllness}
                              </Col>
                              <Col lg={3}>{(client.annualIncome * this.state.userFinancial.critical_illness / 100 - this.SumofFinancialSummary.criticalIllness) > 0 ?
                                'Shortfall: $' + (client.annualIncome * this.state.userFinancial.critical_illness / 100 - this.SumofFinancialSummary.criticalIllness) : 'No Shortfall'}</Col>
                              <Col lg={2}>
                                {(client.annualIncome * this.state.userFinancial.critical_illness / 100 - this.SumofFinancialSummary.criticalIllness) > 0 ?
                                  <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}}  />}
                              </Col>
                              <Col lg={2}>${client.annualIncome * this.state.userFinancial.critical_illness / 100}</Col>
                            </Row>
                            <Row>
                              <Col lg={3}>Early Critical Illness</Col>
                              <Col lg={2}>
                                $
                                  {
                                  this.SumofFinancialSummary
                                    .earlyCriticalIllness
                                }
                              </Col>
                              <Col lg={3}>{(client.annualIncome * this.state.userFinancial.early_critical_illness / 100 - this.SumofFinancialSummary.earlyCriticalIllness) > 0 ?
                                'Shortfall: $' + (client.annualIncome * this.state.userFinancial.early_critical_illness / 100 - this.SumofFinancialSummary.earlyCriticalIllness) : 'No Shortfall'}</Col>
                              <Col lg={2}>{(client.annualIncome * this.state.userFinancial.early_critical_illness / 100 - this.SumofFinancialSummary.earlyCriticalIllness) > 0 ?
                                <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}}  />}</Col>
                              <Col lg={2}>${client.annualIncome * this.state.userFinancial.early_critical_illness / 100}</Col>
                            </Row>
                            <Row>
                              <Col lg={3}>Disability Income</Col>
                              <Col lg={2}>
                                ${this.SumofFinancialSummary.disabilityIncome}
                              </Col>
                              <Col lg={3}>{(client.annualIncome * this.state.userFinancial.disability_income / 100 - this.SumofFinancialSummary.disabilityIncome) > 0 ?
                                'Shortfall: $' + (client.annualIncome * this.state.userFinancial.disability_income / 100 - this.SumofFinancialSummary.disabilityIncome) : 'No Shortfall'}</Col>
                              <Col lg={2}>{(client.annualIncome * this.state.userFinancial.disability_income / 100 - this.SumofFinancialSummary.disabilityIncome) > 0 ?
                                <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}} />}</Col>
                              <Col lg={2}>
                                ${client.annualIncome * this.state.userFinancial.disability_income / 100}
                              </Col>
                            </Row>

                            <br />
                            <h5>Health Protection</h5>
                            <hr />
                            <Row>
                              <Col lg={3}>Hospitalization</Col>
                              <Col lg={8}>
                                {hospitalizationSum}
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={3}>Hospitalization Income</Col>
                              <Col lg={8}>
                                {hospitalizationIncomeSum}
                              </Col>
                            </Row>
                            <br />

                            <h5>Accident Protection</h5>
                            <hr />
                            <Row>
                              <Col lg={3}>Accidental Death</Col>
                              <Col lg={2}>
                                ${this.SumofFinancialSummary.accidentalDeath}
                              </Col>
                              <Col lg={3}>
                                {(this.state.userFinancial.accidental_death - this.SumofFinancialSummary.death) > 0 ?
                                  'Shortfall: $' + (this.state.userFinancial.accidental_death - this.SumofFinancialSummary.accidentalDeath) : 'No Shortfall'}
                              </Col>
                              <Col lg={2}>
                                {(this.state.userFinancial.accidental_death - this.SumofFinancialSummary.death) > 0 ?
                                  <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}}  />}
                              </Col>
                              <Col lg={2}>~${this.state.userFinancial.accidental_death}</Col>
                            </Row>
                            <Row>
                              <Col lg={3}>Accidental Disability</Col>
                              <Col lg={2}>
                                $
                                  {
                                  this.SumofFinancialSummary
                                    .accidentalDisability
                                }
                              </Col>
                              <Col lg={3}>
                                {(this.state.userFinancial.accidental_disability - this.SumofFinancialSummary.death) > 0 ?
                                  'Shortfall: $' + (this.state.userFinancial.accidental_disability - this.SumofFinancialSummary.accidentalDisability) : 'No Shortfall'}
                              </Col>
                              <Col lg={2}>
                              {(this.state.userFinancial.accidental_disability - this.SumofFinancialSummary.death) > 0 ?
                                  <i className="fas fa-times" /> : <i className="fas fa-check" style={{'fontSize' : 12}} />}
                              </Col>
                              <Col lg={2}>~${this.state.userFinancial.accidental_disability} per injury</Col>
                            </Row>
                            <br />
                          </TabPane>
                          <TabPane tabId="i-p">
                            <Row>
                              <Col lg={12}>
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th>Policy</th>
                                      <th>Coverage End Date</th>
                                      <th>Policy Start Date</th>
                                      <th>Total Premium</th>
                                      <th />
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {client.policies &&
                                      client.policies.map((policy, i) => (
                                        <tr key={i}>
                                          <td>{policy.policyName}</td>
                                          <td>
                                            {
                                              policy.ageIncepted &&
                                              policy.policyStartDate &&
                                              policy.policyEndAge &&
                                              format(
                                                addYears(
                                                  parseISO(
                                                    policy.policyStartDate
                                                  ),
                                                  policy.policyEndAge -
                                                  policy.ageIncepted
                                                ),
                                                "MM/dd/yyyy"
                                              )
                                            }
                                          </td>
                                          <td>{
                                            parseISO(policy.policyStartDate).toString() == 'Invalid Date' ? '' :  format(parseISO(policy.policyStartDate), "MM/dd/yyyy")
                                          }</td>
                                          <td>
                                            {policy.premiumSGD}&nbsp;
                                            <span style={{
                                              'marginLeft': '10px'
                                            }}>
                                              {policy.paymentFrequency.toLowerCase()}
                                            </span>
                                          </td>
                                          <td>
                                            <Link
                                              to={`/clients/${this.props.match.params.id}/policy/${policy._id}/update`}
                                              className="btn btn-sm btn-info"
                                              onClick={this.setPolicyBox}
                                            >
                                              Edit
                                            </Link>
                                            &nbsp;&nbsp;
                                            <button
                                              className="btn btn-sm btn-primary"
                                              onClick={() =>
                                                this.togglePolicyBox(i)
                                              }
                                            >
                                              Details
                                            </button>
                                            &nbsp;&nbsp;
                                            <button
                                              className="btn btn-sm btn-danger"
                                              onClick={() =>
                                                this.deletePolicy(policy._id)
                                              }
                                            >
                                              Delete
                                            </button>
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </Col>
                            </Row>
                          </TabPane>
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { client, policyAdded, user, loading, error } = state.User;
  return { client, policyAdded, user, loading, error };
};

export default connect(
  mapStateToProps,
  { getClient, addPolicy, getUser, deletePolicy }
)(View);
