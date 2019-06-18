import chai from "chai";
import chaiEnzyme from "chai-enzyme";
import sinonChai from "sinon-chai";

before(() => {
  chai.use(chaiEnzyme());
  chai.use(sinonChai);
});
