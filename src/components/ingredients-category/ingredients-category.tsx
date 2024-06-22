import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';
import { constructorStateSelector } from '../../services/slices/constructor/burgerConstructorSlice';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients, ...rest }, ref) => {
  /** TODO: взять переменную из стора */
  const selectConstructorState = useSelector(constructorStateSelector);
  const burgerConstructor = {
    bun: selectConstructorState.bun,
    ingredients: selectConstructorState.ingredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructor;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructor]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
      {...rest}
    />
  );
});
