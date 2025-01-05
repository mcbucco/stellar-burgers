import { rootReducer } from './store';

describe('rootReducer test', () => {
  const expectedResult = {
    ingredients: {
      ingredients: [],
      loading: false,
      error: null
    },
    newOrder: {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      orderRequest: false,
      orderModalData: null,
      error: null
    },
    order: {
      order: null,
      loading: false,
      loadingError: null
    },
    ordersFeed: {
      orders: [],
      total: null,
      totalToday: null,
      loading: false,
      loadingError: null
    },
    userOrders: {
      orders: [],
      loading: false,
      loadingError: null
    },
    user: {
      isAuthed: false,
      isAuthChecked: false,
      user: {
        name: '',
        email: ''
      },
      loginError: null,
      loginRequest: false
    }
  };

  test('Store initial state test', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(expectedResult);
  });
});
