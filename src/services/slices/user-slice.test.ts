import {
  getUser,
  initialState,
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
    const state = {
      ...initialState,
      isAuthed: true,
      isAuthChecked: true,
      user: {
        name: 'testName',
        email: 'testEmail'
      }
    };

    test('Log-out test', () => {
      const newState = userSlice.reducer(state, {
        type: logOutUser.fulfilled.type,
        payload: null
      });
      expect(newState.isAuthed).toBe(false);
      expect(newState.user).toEqual({
        name: '',
        email: ''
      });
    });

    test('User data update test', () => {
      const newUserData = {
        name: 'newTestName',
        email: 'newTestEmail'
      };
      const newState = userSlice.reducer(state, {
        type: updateUserData.fulfilled.type,
        payload: { user: newUserData }
      });
      expect(newState.user).toEqual(newUserData);
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
