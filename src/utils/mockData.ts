export const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
  },

  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  }
];

export const mockOrderData = {
  _id: '6777e408750864001d376dc0',
  ingredients: [
    '643d69a5c3f7b9001cfa093c',
    '643d69a5c3f7b9001cfa0941',
    '643d69a5c3f7b9001cfa093f',
    '643d69a5c3f7b9001cfa093c'
  ],
  owner: '6754ce0be367de001daf785c',
  status: 'done',
  name: 'Краторный бессмертный био-марсианский бургер',
  createdAt: '2025-01-03T13:20:08.279Z',
  updatedAt: '2025-01-03T13:20:09.283Z',
  number: 64608
};

export const mockOrdersFeed = [
  {
    _id: '6777e408750864001d376dc0',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    owner: '6754ce0be367de001daf785c',
    status: 'done',
    name: 'Краторный бессмертный био-марсианский бургер',
    createdAt: '2025-01-03T13:20:08.279Z',
    updatedAt: '2025-01-03T13:20:09.283Z',
    number: 64608
  },

  {
    _id: '6777d6d6750864001d376db2',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e'
    ],
    owner: '66da52d4119d45001b504854',
    status: 'done',
    name: 'Флюоресцентный люминесцентный био-марсианский бургер',
    createdAt: '2025-01-03T12:23:50.782Z',
    updatedAt: '2025-01-03T12:23:51.722Z',
    number: 64607
  },

  {
    _id: '6777bdef750864001d376d90',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa093e'
    ],
    owner: '6766d89a750864001d373558',
    status: 'done',
    name: 'Краторный минеральный люминесцентный бургер',
    createdAt: '2025-01-03T10:37:35.218Z',
    updatedAt: '2025-01-03T10:37:36.116Z',
    number: 64604
  }
];
