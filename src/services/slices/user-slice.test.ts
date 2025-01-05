import {
  getUser,
  loginUser,
  logOutUser,
  registerUser,
  updateUserData,
  userSlice
} from './user-slice';

const getUserTestData = {
  success: true,
  user: {
    email: 'name@domain.dot',
    name: 'name'
  }
};

const loginUserTestData = {
  success: true,
  user: {
    email: 'name@domain.dot',
    name: 'name'
  },
  refreshToken: 'refreshAccess',
  accessToken: 'access'
};

const errorMessage = 'Test Error';

describe('User Slice Tests', () => {
  describe('Update & Log-out tests', () => {
    const initialState = {
      isAuthed: true,
      isAuthChecked: true,
      user: {
        name: 'testName',
        email: 'testEmail'
      },
      loginError: null,
      loginRequest: false
    };

    test('Log-out test', () => {
      const state = userSlice.reducer(initialState, {
        type: logOutUser.fulfilled.type,
        payload: null
      });
      expect(state.isAuthed).toBe(false);
      expect(state.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('User data update test', () => {
      const newUserData = {
        name: 'newTestName',
        email: 'newTestEmail'
      };
      const state = userSlice.reducer(initialState, {
        type: updateUserData.fulfilled.type,
        payload: { user: newUserData }
      });
      expect(state.user).toEqual(newUserData);
    });
  });

  describe('Registration tests', () => {
    test('User registration test', () => {
      const state = userSlice.reducer(undefined, { type: '@@INIT' });
      expect(state.isAuthed).toBe(false);
      expect(state.user).toEqual({ email: '', name: '' });

      const newState = userSlice.reducer(state, {
        type: registerUser.fulfilled.type,
        payload: loginUserTestData.user
      });
      expect(newState.isAuthed).toBe(true);
      expect(newState.user).toEqual(loginUserTestData.user);
    });

    test('User registration error catch', () => {
      const state = userSlice.reducer(undefined, { type: '@@INIT' });
      expect(state.isAuthed).toBe(false);
      expect(state.user).toEqual({ email: '', name: '' });

      const newState = userSlice.reducer(state, {
        type: registerUser.rejected.type,
        error: new Error(errorMessage)
      });
      expect(newState.isAuthed).toBe(false);
      expect(newState.loginError).toEqual(errorMessage);
    });
  });

  describe('Auth tests', () => {
    test('Token-based auth', () => {
      const state = userSlice.reducer(undefined, { type: '@@INIT' });
      expect(state.isAuthed).toBe(false);

      const newState = userSlice.reducer(state, {
        type: getUser.fulfilled.type,
        payload: getUserTestData.user
      });
      expect(newState.isAuthed).toBe(true);
    });

    test('Login/password-based auth', () => {
      const state = userSlice.reducer(undefined, { type: '@@INIT' });
      expect(state.isAuthed).toBe(false);
      expect(state.user).toEqual({ email: '', name: '' });

      const newState = userSlice.reducer(state, {
        type: loginUser.fulfilled.type,
        payload: loginUserTestData.user
      });
      expect(newState.isAuthed).toBe(true);
      expect(newState.user).toEqual(loginUserTestData.user);
    });

    test('Auth error catch', () => {
      const state = userSlice.reducer(undefined, { type: '@@INIT' });
      expect(state.isAuthed).toBe(false);
      expect(state.user).toEqual({ email: '', name: '' });

      const newState = userSlice.reducer(state, {
        type: loginUser.rejected.type,
        error: new Error(errorMessage)
      });
      expect(newState.isAuthed).toBe(false);
      expect(newState.loginError).toBe(errorMessage);
    });
  });
});
