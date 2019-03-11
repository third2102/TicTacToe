import React from 'react';
import Square from './index.js';
import "./setupTest.js";
import { mount } from 'enzyme';

// sample unit tests
describe("square", ()=> {
    it("matches the snapshot", ()=>{
        const wrapper = mount(<Square value="test" isZardoz="ZARDOZ" />);
        expect(wrapper).toMatchSnapshot();
    })
    it("attaches classNames from value prop", () => {
        const wrapper = mount(<Square value="test" isZardoz=" " />);
        expect(wrapper.find('div').at(1).hasClass('test')).toBe(true);
    })
    it("attaches classNames from isZardoz", () => {
        const wrapper = mount(<Square value=" " isZardoz="zardoz" />);
        expect(wrapper.find('div').at(1).hasClass('zardoz')).toBe(true);
    })
    it("attaches classNames from isZardoz", () => {
        const mockupdate = jest.fn();
        const wrapper = mount(<Square onClick={mockupdate} value="" isZardoz="" />);
        wrapper.find('div').at(0).simulate('click');
        expect(mockupdate.mock.calls.length).toEqual(1);
    })
});