import { observable } from 'mobx'

const enteredUserInfo = observable({
  _enteredUserId: '',
  _enteredUserPw: '',

  get enteredUserId() {
    return this._enteredUserId
  },

  get enteredUserPw() {
    return this._enteredUserPw
  },

  setEnteredUserId(value: string) {
    return (this._enteredUserId = value)
  },

  setEnteredUserPw(value: string) {
    return (this._enteredUserPw = value)
  },
})

export { enteredUserInfo }
