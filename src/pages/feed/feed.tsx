import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrders,
  selectOrders,
  selectIsLoading,
  selectSuccess,
  getIngredients
} from '../../services/slices/dataSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orderSelector = useSelector(selectOrders);
  const orders: TOrder[] = orderSelector.orders;
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getOrders());
      }}
    />
  );
};
