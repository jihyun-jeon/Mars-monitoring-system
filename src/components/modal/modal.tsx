const Modal = ({ contents }): React.ReactElement => {
  return (
    <div className="flexCenter fixed  top-0 left-0 right-0 z-10 h-screen w-screen bg-[rgba(0,0,0,0.51)]">
      {/* 갈아낄 내용 */}
      {contents}
    </div>
  )
}

export default Modal
