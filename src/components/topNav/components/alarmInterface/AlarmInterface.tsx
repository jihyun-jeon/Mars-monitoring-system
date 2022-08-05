import { BsFillBellFill } from 'react-icons/bs'
import { FaRegUserCircle } from 'react-icons/fa'

type Props = {
  handleToggle: () => void
}

const AlarmInterface = ({ handleToggle }: Props) => {
  return (
    <div className="relative left-4 flex items-center">
      <p className="text-lg font-semibold text-dot4"></p>
      <div className="relative">
        <BsFillBellFill onClick={handleToggle} className="ml-4 cursor-pointer text-2xl" />
        {/* boolean값 자리에 message 유무 변수 */}
        {false && (
          <button
            onClick={handleToggle}
            className="absolute -top-2 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-dot4 text-lg text-bgPaper"
          >
            1
          </button>
        )}
      </div>
      <FaRegUserCircle className="ml-4 text-3xl" />
    </div>
  )
}

export default AlarmInterface
