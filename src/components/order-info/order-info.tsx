import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { selectIngredients } from '../../services/slices/dataSlice';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const number = Number(useParams().number);
  const ingredientSelecot = useSelector(selectIngredients);
  const [orderData, setOrderData] = useState({
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: ['']
  });

  const ingredients: TIngredient[] = [
    ...ingredientSelecot.bun,
    ...ingredientSelecot.main,
    ...ingredientSelecot.sauce
  ];

  useEffect(() => {
    console.log(number);
    getOrderByNumberApi(number).then((data) => setOrderData(data.orders[0]));
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
