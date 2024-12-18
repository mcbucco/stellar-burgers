import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  getOrdersFeed,
  ordersFeedLoadingSelector,
  ordersFeedSelector
} from '../../services/slices/orders-feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersFeed());
  }, []);

  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(ordersFeedSelector);
  const loading = useSelector(ordersFeedLoadingSelector);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => dispatch(getOrdersFeed());

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
