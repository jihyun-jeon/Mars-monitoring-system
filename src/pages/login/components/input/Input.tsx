import { observer } from 'mobx-react'

import useStore from '../../../../useStore'

type InputProps = {
  labelContent: string
  labelId: string
  name: string
  type: string
  placeHolder: string
  handleValidMessage: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input = observer(
  ({ labelContent, labelId, name, type, placeHolder, handleValidMessage }: InputProps) => {
    const { enteredUserInfo } = useStore()

    const handleEnteredUserInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target
      switch (name) {
        case 'userId':
          enteredUserInfo.setEnteredUserId(value)
          break
        case 'userPw':
          enteredUserInfo.setEnteredUserPw(value)
          break
      }
    }

    return (
      <>
        <label className="mb-2 block text-lg text-textPrimary" htmlFor={labelId}>
          {labelContent}
        </label>
        <input
          onChange={handleEnteredUserInfo}
          onKeyUp={handleValidMessage}
          id={labelId}
          className="block w-full rounded border-2 border-solid bg-btnActionSelect p-1 py-1.5"
          name={name}
          type={type}
          required
          placeholder={placeHolder}
        />
      </>
    )
  },
)

export default Input
