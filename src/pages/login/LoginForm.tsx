import { observer } from 'mobx-react'
import React, { useContext } from 'react'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import { FcHighPriority } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../AppContext'
import { instance } from '../../config'
import useStore from '../../useStore'
import Input from './components/input/Input'

const LoginForm = observer(() => {
  const navigate = useNavigate()

  const appContext = useContext(AppContext)

  const { usersInfo, enteredUserInfo, validMessageToggle, pwVisibilityToggle } = useStore()

  const validator = {
    enabledButtonValid: (value: string) => {
      const userIdValid = /^[a-zA-Z]+[0-9]{3,5}$/g.test(value)
      const userPwValid = enteredUserInfo.enteredUserPw.length > 8
      const result = !(userIdValid && userPwValid)
      return result
    },

    enteredIdValidator: (value: string) => {
      const userIdValid = /^[a-zA-Z]+[0-9]{3,5}$/g.test(value)
      return userIdValid
    },

    enteredPwValidator: (value: string) => {
      const userPwValid = value.length > 8
      return userPwValid
    },
  }

  const handleValidMessage = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const idValid = validator.enteredIdValidator(enteredUserInfo.enteredUserId)
    const pwValid = validator.enteredPwValidator(enteredUserInfo.enteredUserPw)

    const { name } = event.target as HTMLInputElement
    switch (name) {
      case 'userId':
        if (idValid) {
          validMessageToggle.setIsIdValidMessageToggle(false)
        } else if (enteredUserInfo.enteredUserId.length < 1) {
          validMessageToggle.setIsIdValidMessageToggle(false)
        } else {
          validMessageToggle.setIsIdValidMessageToggle(true)
        }
        break
      case 'userPw':
        if (pwValid) {
          validMessageToggle.setIsPwValidMessageToggle(false)
        } else if (enteredUserInfo.enteredUserPw.length < 1) {
          validMessageToggle.setIsPwValidMessageToggle(false)
        } else {
          validMessageToggle.setIsPwValidMessageToggle(true)
        }
        break
    }
  }

  const pwVisibilityToggleIcons = () => {
    pwVisibilityToggle.setPwVisibility()
    if (pwVisibilityToggle.pwType === 'password') {
      pwVisibilityToggle.setPwType('text')
    } else {
      pwVisibilityToggle.setPwType('password')
    }
  }

  const requestUserInfoCheckToServer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const requestUserInfoData = {
      identity: enteredUserInfo.enteredUserId,
      password: enteredUserInfo.enteredUserPw,
    }

    try {
      const response = await instance('user/signin', {
        method: 'post',
        data: requestUserInfoData,
      })

      localStorage.setItem('accessToken', response.data.accessToken)
      usersInfo.getAuthLocation(response.data.isLocationControl)
      usersInfo.getAuthEquipment(response.data.isEquipmentControl)
      usersInfo.getUserName(response.data.name)
      navigate('/home')
    } catch (error) {
      switch (error.message) {
        case 'Request failed with status code 400':
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Request error'])
          break
        default:
          appContext.setToastIcon([<FcHighPriority key="1" className="text-2xl" />])
          appContext.setToastMessage(['Lost connection with server'])
      }
    }
  }

  return (
    <div>
      <form className="relative h-full" onSubmit={requestUserInfoCheckToServer}>
        <h1 className="mb-4 text-xl font-semibold">Login</h1>
        <Input
          labelContent="Id"
          labelId="loginId"
          name="userId"
          type="text"
          placeHolder="ex) Mu001"
          handleValidMessage={handleValidMessage}
        />
        {validMessageToggle.isIdValidMessageToggle && (
          <p className="text-red-700">{`Please set the ID format, ex) Mu001`}</p>
        )}
        <div className="mt-4 mb-2" />
        <div className="relative">
          <Input
            labelContent="Password"
            labelId="loginPw"
            name="userPw"
            type={pwVisibilityToggle.pwType}
            placeHolder="At least 9 characters"
            handleValidMessage={handleValidMessage}
          />
          {pwVisibilityToggle.setPwVisibility() ? (
            <AiFillEye
              onClick={pwVisibilityToggleIcons}
              className="left-30 absolute bottom-[0.6rem] right-[1rem] cursor-pointer text-xl"
            />
          ) : (
            <AiOutlineEye
              onClick={pwVisibilityToggleIcons}
              className="left-30 absolute bottom-[0.6rem] right-[1rem] cursor-pointer text-xl"
            />
          )}
        </div>
        {validMessageToggle.isPwValidMessageToggle && (
          <p className="text-red-700">At least 9 characters</p>
        )}
        <button
          type="submit"
          className="mt-8 w-full border-2 border-solid bg-primary p-3 py-3.5 text-lg text-bgPaper disabled:bg-btnDisabled"
          disabled={validator.enabledButtonValid(enteredUserInfo.enteredUserId)}
        >
          Login
        </button>
      </form>
    </div>
  )
})

export default LoginForm
