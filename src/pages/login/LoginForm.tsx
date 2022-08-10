import axios from 'axios'
import React, { useState } from 'react'
import { AiOutlineEye, AiFillEye } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import { SERVER_ADDRESS } from '../../config'
import useStore from '../../useStore'

const LoginForm = () => {
  const { usersInfo } = useStore()

  const [userLoginInfo, setUserLoginInfo] = useState({
    userId: '',
    userPw: '',
  })

  const { userId, userPw } = userLoginInfo

  const [idMessageToggle, setIdMessageToggle] = useState(false)
  const [pwMessageToggle, setPwMessageToggle] = useState(false)

  const handleUserLoginInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserLoginInfo((userLoginInfo) => ({ ...userLoginInfo, [name]: value }))
  }

  const validater = {
    userInfoValid: (value: string) => {
      const userIdValid = /^[a-zA-Z]+[0-9]{3,5}$/g.test(value)
      const userPwValid = userPw.length > 8
      const result = !(userIdValid && userPwValid)
      return result
    },

    idInfoValid: (value: string) => {
      const userIdValid = /^[a-zA-Z]+[0-9]{3,5}$/g.test(value)
      return userIdValid
    },

    pwInfoValid: (value: string) => {
      const userPwValid = value.length > 8
      return userPwValid
    },
  }

  const { userInfoValid, idInfoValid, pwInfoValid } = validater

  const idValid = idInfoValid(userId)
  const pwValid = pwInfoValid(userPw)

  const handleIdMessage = () => {
    if (idValid) {
      setIdMessageToggle(false)
    } else if (userId.length < 1) {
      setIdMessageToggle(false)
    } else {
      setIdMessageToggle(true)
    }
  }

  const handlePwMessage = () => {
    if (pwValid) {
      setPwMessageToggle(false)
    } else if (userPw.length < 1) {
      setPwMessageToggle(false)
    } else {
      setPwMessageToggle(true)
    }
  }

  const [pwViewToggle, setPwViewToggle] = useState(false)
  const [pwType, setPwType] = useState('password')

  const viewEyeToggle = () => {
    setPwViewToggle((prev) => !prev)
    if (pwType === 'password') {
      setPwType('text')
    } else {
      setPwType('password')
    }
  }

  const navigate = useNavigate()

  const goToHome = () => {
    navigate('/home')
  }

  const requestUserInfoCheckToServer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.post(`${SERVER_ADDRESS}user/signin`, {
        identity: userId,
        password: userPw,
      })
      if (response.data.accessToken) {
        localStorage.setItem('accessToken', response.data.accessToken)
        localStorage.setItem('isAuthenticated', 'true')
        usersInfo.getAuthLocation(response.data.isLocationControl)
        usersInfo.getAuthEquipment(response.data.isEquipmentControl)
        usersInfo.getUserName(response.data.name)
        goToHome()
      }
    } catch (error) {
      alert(error.response)
    }
  }

  return (
    <div>
      <form className="relative h-full" onSubmit={requestUserInfoCheckToServer}>
        <h1 className="mb-4 text-xl font-semibold">Login</h1>
        <label className="mb-2 block text-lg text-textPrimary" htmlFor="loginId">
          Id
        </label>
        <input
          onChange={handleUserLoginInfo}
          onKeyUp={handleIdMessage}
          id="loginId"
          className="block w-full rounded border-2 border-solid bg-btnActionSelect p-1 py-1.5"
          name="userId"
          type="text"
          required
          placeholder="ex) Mu001"
        />
        {idMessageToggle && <p className="text-red-700">Please set the ID format, ex&#41; Mu001</p>}
        <label className="mt-4 mb-2 block text-lg text-textPrimary" htmlFor="loginPw">
          Password
        </label>
        <div className="relative">
          <input
            onChange={handleUserLoginInfo}
            onKeyUp={handlePwMessage}
            id="loginPw"
            className="block w-full rounded border-2 border-solid bg-btnActionSelect p-1 py-1.5"
            name="userPw"
            type={pwType}
            required
            placeholder="At least 9 characters"
          />
          {pwViewToggle ? (
            <AiFillEye
              onClick={viewEyeToggle}
              className="left-30 absolute bottom-[0.6rem] right-[1rem] cursor-pointer text-xl"
            />
          ) : (
            <AiOutlineEye
              onClick={viewEyeToggle}
              className="left-30 absolute bottom-[0.6rem] right-[1rem] cursor-pointer text-xl"
            />
          )}
        </div>
        {pwMessageToggle && <p className="text-red-700">At least 9 characters</p>}
        <button
          type="submit"
          className="mt-8 w-full border-2 border-solid bg-primary p-3 py-3.5 text-lg text-bgPaper disabled:bg-btnDisabled"
          disabled={userInfoValid(userId)}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
