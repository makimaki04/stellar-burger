import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  selectIngredients
} from '../../services/slices/dataSlice';
import { TIngredientList } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);
  const ingredientData = findIngredientById(id!, ingredients);

  function findIngredientById(id: string, ingredient: TIngredientList) {
    const { bun, sauce, main } = ingredient;
    return (
      bun.find((item) => item._id === id) ||
      sauce.find((item) => item._id === id) ||
      main.find((item) => item._id === id)
    );
  }

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
