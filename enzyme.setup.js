import Enzyme from "enzyme";
// import jest from "jest";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });
jest.setTimeout(1000000);