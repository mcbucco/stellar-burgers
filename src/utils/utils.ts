import { deleteCookie, setCookie } from './cookie';

//forward - к началу массива, backward - к концу
type TMoveElementDirection = 'forward' | 'backward';

export function moveElement<T>(
  arr: T[],
  index: number,
  direction: TMoveElementDirection
): T[] {
  let indexToMoveForward = 0;
  let indexToMoveBackward = 0;

  if (direction === 'forward') {
    indexToMoveForward = index - 1;
    indexToMoveBackward = index;
  } else {
    indexToMoveForward = index;
    indexToMoveBackward = index + 1;
  }

  const elementToMoveForward = arr[indexToMoveForward];
  const elementToMoveBackward = arr[indexToMoveBackward];

  const elementsBefore = arr.slice(0, indexToMoveForward);
  const elementsAfter = arr.slice(indexToMoveBackward + 1);

  return [
    ...elementsBefore,
    elementToMoveBackward,
    elementToMoveForward,
    ...elementsAfter
  ];
}

export function setTokens(accessToken: string, refreshToken: string) {
  setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

export function eraseTokens() {
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
}
