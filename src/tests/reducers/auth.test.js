import authReducer from '../../reducers/auth'

test('set default state', () => {
  const state = authReducer(undefined, {type: '@@INIT'})
  expect(state).toEqual({})
})
test('should set uid state', () => {
  const action = {
    type: "LOGIN",
    uid: 123
  }
  const state = authReducer({}, action)
  expect(state).toEqual({
    uid: 123
  })
})
test('should remove uid state', () => {
  const action = {type: 'LOGOUT'}
  const state = authReducer({uid: 123}, action)
  expect(state).toEqual({})
})