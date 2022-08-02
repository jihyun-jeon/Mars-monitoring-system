type Props = {
  handleToggle: () => void
}

const AlarmModal = ({ handleToggle }: Props) => {
  return (
    <div className="absolute top-20 right-0 h-[30rem] w-[26rem]  overflow-scroll border-2">
      <div className="relative flex h-[96px] items-center justify-between bg-primary px-12">
        <div className="text-bgPaper">전체 알림</div>
        <button className="rounded-md bg-bgPaper px-3 py-1 text-primary">모두 삭제</button>
        <button onClick={handleToggle} className="absolute top-0 right-1 p-3 text-lg text-white">
          X
        </button>
      </div>
      <div className="flex h-[96px] items-center justify-between border-b-2 bg-bgPaper px-8 last:border-b-0">
        <div>
          <span className="mr-2 text-lg">Equipment</span>
          <span className="text-lg">: Error Message</span>
        </div>
        <div>
          <span className="mr-2 text-sm text-[#888888]">보낸 날짜</span>
          <button className="px-2 py-2 text-sm text-[#888888]">X</button>
        </div>
      </div>
    </div>
  )
}

export default AlarmModal
