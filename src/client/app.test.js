import React from 'react';
import { shallow } from "enzyme";
import  App  from "./App.js";

describe('Test App Entry point', function () {
  it('should have a header tag with Welcome to React Boilerplate App', function () {
    const wrapper =  shallow(<App />);
    expect(wrapper.find("h2").text()).toEqual("  Welcome to React Boilerplate App ");
    expect(wrapper).toMatchSnapshot();
  });
});