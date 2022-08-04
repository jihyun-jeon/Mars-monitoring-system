const Modal = ({
  setOnModal,
  contents,
}: {
  setOnModal?: any
  contents: React.ReactElement
}): React.ReactElement => {
  return (
    <div className="flexCenter fixed  top-0 left-0 right-0 z-10 h-screen w-screen bg-[rgba(0,0,0,0.51)]">
      <div className="relative h-[34rem] w-[60rem] rounded-lg  bg-white px-16 pt-5">
        {/* 갈아낄 내용 */}
        {contents}
      </div>
    </div>
  )
}

export default Modal
