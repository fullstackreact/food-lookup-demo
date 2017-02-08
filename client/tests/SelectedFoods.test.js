import { shallow } from 'enzyme';
import React from 'react';
import SelectedFoods from '../src/SelectedFoods';

describe('SelectedFoods', () => {
  let wrapper;

  describe('when prop `foods` is blank', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SelectedFoods
          foods={[]}
        />,
      );
    });

    it('should not display any rows in body', () => {
      expect(
        wrapper.find('tbody tr').length,
      ).toEqual(0);
    });

    it('should display a zero kcal value', () => {
      expect(
        wrapper.find('#total-kcal').first().text(),
      ).toEqual('0.00');
    });
  });

  describe('when `foods` is populated', () => {
    const foods = [
      {
        description: 'Sample food 1',
        kcal: '100.0',
        protein_g: '11.0',
        fat_g: '21.0',
        carbohydrate_g: '31.0',
      },
      {
        description: 'Sample food 2',
        kcal: '200',
        protein_g: '12',
        fat_g: '22',
        carbohydrate_g: '32',
      },
    ];
    const totalKcals = foods.reduce(
      (memo, f) => parseFloat(f.kcal) + memo, 0.0,
    ).toFixed(2);

    beforeEach(() => {
      wrapper = shallow(
        <SelectedFoods
          foods={foods}
        />,
      );
    });

    it('should display the foods in the table', () => {
      expect(
        wrapper.find('tbody tr').length,
      ).toEqual(foods.length);
    });

    it('should total appropriate kcal', () => {
      expect(
        wrapper.find('#total-kcal').first().text(),
      ).toEqual(
        totalKcals.toString(),
      );
    });
  });
});
