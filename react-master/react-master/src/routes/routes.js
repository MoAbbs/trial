import SignIn from "views/auth/signin";
import SignUp from "views/auth/signup";
import Home from "views/home";
import AuthInfo from "views/auth/info";
import Company from "views/Company";
import Dashboard from "views/dashboard";
import CompanyInput from "views/features/input";
import Ratios from "views/features/ratios";
import CompanyView from "views/features/view";
import Graphss from "../views/features/Graphss";
import CashFlow from "../views/features/cash_flow_ch";

import CommonSize from "views/features/common_size";
import GrowthRate from "views/features/growth_rate";
import pricing from "../views/features/pricing";
import PricingMethod from "../views/features/pricing/sections/make_method/index"
import Comparing from "../views/features/comparing/index";

export const MainRoutes = [
  {
    path: "/company/input/:company",
    component: CompanyInput,
  },
  {
    path: "/company/view/:company",
    component: CompanyView,
  },
  {
    path: "/company/common-size/:company",
    component: CommonSize,
  },
  {
    path: "/company/growth-rate/:company",
    component: GrowthRate,
  },
  {
    path: "/company/ratios/:company",
    component: Ratios,
  },
  {
    path: "/company/pricing/:company",
    component: pricing,
  },
  {
    path: "/company/:company/pricing/method",
    component: PricingMethod,
  },
  {
    path: "/company/comparing/:company",
    component: Comparing,
  },
  {
    path: "/company/pricing/:company",
    component: pricing,
  },
  {
    path: "/company/graphs/:company",
    component: Graphss,
  },
  {
    path: "/company/cashflow/:company",
    component: CashFlow,
  },
  {
    path: "/company/:company",
    component: Dashboard,
  },
  {
    path: "/",
    component: Company,
    exact: true,
  },
];

export const AuthMainRoutes = [
  {
    path: "/signin/info",
    component: AuthInfo,
  },
];

export const AuthRoutes = [
  {
    path: "/signup",
    component: SignUp,
  },
  {
    path: "/signin",
    component: SignIn,
  },
];
export const WebsiteRoutes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
];
