import React from 'react';
import {Subject} from 'rxjs';
import {Dashboard} from "./dashboard.component";
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
describe('Dashboard Component', function () {
    let mockDashboard$;
    let sut;
    beforeEach(function () {
        mockDashboard$ = new Subject();
        sut = <Dashboard dashboard$={mockDashboard$}/>;
    });

    it('should render with empty state', function () {
        expect(shallow(sut).state()).toEqual({
            temperature: '--',
            pressure: '--',
            humidity: '--'
        });
    });

    it('should update the state when dashboard emits', function () {
        const newState = {
            temperature: 1,
            humidity: 2,
            pressure: 3
        };

        const wrapper = shallow(sut);
        mockDashboard$.next(newState);
        wrapper.update();
        expect(wrapper.state()).toEqual(newState);
    });
});
