import React from 'react';

export default function SelectedFoods(props) {
  return (
    <table className='ui selectable structured large table'>
      <thead>
        <tr>
          <th colSpan='5'>
            <h3>Selected foods</h3>
          </th>
        </tr>
        <tr>
          <th className='eight wide'>Description</th>
          <th>Kcal</th>
          <th>Protein (g)</th>
          <th>Fat (g)</th>
          <th>Carbs (g)</th>
        </tr>
      </thead>
      <tbody>
        {
          props.foods.map((food, idx) => (
            <tr
              key={idx}
              onClick={() => props.onFoodClick(idx)}
            >
              <td>{food.description}</td>
              <td className='right aligned'>{food.kcal}</td>
              <td className='right aligned'>{food.protein_g}</td>
              <td className='right aligned'>{food.fat_g}</td>
              <td className='right aligned'>{food.carbohydrate_g}</td>
            </tr>
          ))
        }
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th
            className='right aligned'
            id='total-kcal'
          >
            {sum(props.foods, 'kcal')}
          </th>
          <th
            className='right aligned'
            id='total-protein_g'
          >
            {sum(props.foods, 'protein_g')}
          </th>
          <th
            className='right aligned'
            id='total-fat_g'
          >
            {sum(props.foods, 'fat_g')}
          </th>
          <th
            className='right aligned'
            id='total-carbohydrate_g'
          >
            {sum(props.foods, 'carbohydrate_g')}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

// Good example of a helper function specific to this module
// that is inaccessible from outside this module.
function sum(foods, prop) {
  return foods.reduce((memo, food) => (
    parseInt(food[prop], 10) + memo
  ), 0.0).toFixed(2);
}
