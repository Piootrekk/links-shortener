import UAParser from "ua-parser-js";

const loadUa = () => {
  const parser = new UAParser();
  return parser.getResult();
};

export default loadUa;
