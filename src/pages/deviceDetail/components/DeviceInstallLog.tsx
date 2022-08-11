const DeviceInstallLog = () => {
  return (
    <div>
      <table className="w-full table-fixed border-2">
        <colgroup>
          <col span={1} style={{ width: '3%' }} />
          <col span={4} style={{ width: `${100 / 4 - 3}%` }} />
        </colgroup>
        <tbody>
          <tr className="bg-[#EFF2F5]">
            <td className="py-3  pl-3"> </td>
            <td className="py-3  pl-3">Matched Status </td>
            <td className="py-3  pl-3">Device Serial Number</td>
            <td className="py-3  pl-3">matched Equipment</td>
            <td className="py-3  pl-3">Manager</td>
          </tr>

          <tr>
            <td className="py-3  pl-3"> </td>
            <td className="py-3 pl-3">matched</td>
            <td className="py-3 pl-3">dv-1028</td>
            <td className=" py-3 pl-3">eq-2901</td>
            <td className="py-3 pl-3">Martin</td>
          </tr>
        </tbody>
      </table>
      {/* page nation */}
      <div className="flexCenter relative w-full pb-28 pt-10">
        {/* page select */}
        <div className="flex">
          <button type="button" className="mx-5">
            &lt;
          </button>
          <ul className="flex">
            <li className="flexCenter w-5">1</li>
          </ul>
          <button type="button" className="mx-5">
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeviceInstallLog
