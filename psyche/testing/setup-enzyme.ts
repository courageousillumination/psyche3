import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

before(() => {
  Enzyme.configure({ adapter: new Adapter() });
});
