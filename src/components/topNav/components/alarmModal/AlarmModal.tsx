import './AlarmModal.css'

const AlarmModal = () => {
  return (
    <div className="alarmModalWrapper absolute top-20 right-0 h-[30rem] w-[26rem] overflow-y-scroll border-2 bg-white">
      <div className="flex h-[96px] items-center justify-between bg-primary px-12">
        <div className="text-xl text-bgPaper">전체 알림</div>
        <button className="rounded-md bg-bgPaper px-3 py-1 text-primary">모두 삭제</button>
      </div>
      {/* <div className="flex h-[96px] items-center justify-between border-b-2 bg-bgPaper px-8 last:border-b-0">
        <div>
          <span className="mr-2 text-lg">Equipment</span>
          <span className="text-lg">: Error Message</span>
        </div>
        <div>
          <span className="mr-2 text-sm text-[#888888]">보낸 날짜</span>
          <button className="px-2 py-2 text-sm text-[#888888]">X</button>
        </div>
      </div> */}
      {/* data 유무에 따른 boolean 값 */}
      {true && (
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-[#C4C4C4]">
          No Data
        </div>
      )}
    </div>
  )
}

export default AlarmModal
