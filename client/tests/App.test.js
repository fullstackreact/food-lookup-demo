/* eslint-disable no-undef */

import { shallow } from 'enzyme';
import React from 'react';
import App from '../src/App';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  });

  it('initializes `selectedFoods` to a blank array', () => {
    expect(
      wrapper.state().selectedFoods
    ).toEqual([])
  });

  describe('when `FoodSearch` invokes `onFoodClick` twice', () => {

    const food1 = {
      description: 'Sample food 1',
      kcal: '100.0',
      protein_g: '11.0',
      fat_g: '21.0',
      carbohydrate_g: '31.0',
    };

    const food2 = {
      description: 'Sample food 2',
      kcal: '200.0',
      protein_g: '12.0',
      fat_g: '22.0',
      carbohydrate_g: '32.0',
    };
    const foods = [ food1, food2 ];

    beforeEach(() => {
      foods.forEach((food) => (
        wrapper.find('FoodSearch').props().onFoodClick(food)
      ));
    });

    it('should add the foods to `selectedFoods`', () => {
      expect(
        wrapper.state().selectedFoods
      ).toEqual(foods);
    });

    describe('and then `SelectedFoods` invokes `onFoodClick`', () => {
      beforeEach(() => {
        wrapper.find('SelectedFoods').props().onFoodClick(0);
      });

      it('removes the food at idx from array', () => {
        expect(
          wrapper.state().selectedFoods
        ).toEqual([ food2 ]);
      });
    });
  });
});
