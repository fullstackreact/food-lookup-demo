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

    /*
    * The describe-block below unabashedly "knows" about `foods`.
    * If `foods` were to be changed (say, we wanted to have three items)
    * then the spec below would have to be updated.
    *
    * For larger test suites, it's a good idea to keep specs as generic
    * as possible to avoid these issues. You might have a global generator
    * for food arrays that you rely on for all your test suites. You'd want
    * your specs to be resilient to the details of this generator changing.
    *
    * For instance, we could have first declared the variable `idx`
    * at the top like this:
    *
    * ```
    * describe('and then `SelectedFoods` invokes `onFoodClick`', () => {
    *   const idx = 0;
    *
    *   beforeEach(() => {
    *     wrapper.find('SelectedFoods').props().onFoodClick(idx)
    *   });
    *
    *  // ...
    * ```
    *
    * Then we could pluck out the food at `idx`, exactly as `onFoodClick()` might:
    *
    * ```
    * expect(
    *    wrapper.state().selectedFoods
    *  ).toEqual([
    *    ...foods.slice(0, idx),
    *    ...foods.slice(idx + 1, foods.length),
    *  ]);
    * ```
    *
    * But we're keeping things simple for now.
    *
    */
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
