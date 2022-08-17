import { observable } from 'mobx'

const messageId = observable({
  _messageSendId: '',

  get messageSendId() {
    return this._messageSendId
  },

  setMessageSendId(value: string) {
    return (this._messageSendId = value)
  },
})

export { messageId }
