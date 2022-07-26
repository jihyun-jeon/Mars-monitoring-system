import { useState } from 'react'

import { filterDataProps } from '../../EquipmentList'

const FilterSelectBox = ({ data }: { data: filterDataProps }) => {
  const [selectedOption, setSelectedOption] = useState({
    equipmentType: '',
    DeviceStatus: '',
    Battery: '',
    ActiveStatus: '',
  })

  const quarySelect = (event: any) => {
    const { value } = event.target
    setSelectedOption((option) => ({ ...option, [value]: value }))
  }

  // 선택한 옵션이 해당 각 타이틀에 들어가려면??

  console.log(selectedOption)

  return (
    <div>
      <label
        htmlFor="countries"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {data.title}
      </label>
      <select
        onChange={quarySelect}
        id="countries"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      >
        {data.selectOption.map((option: string, idx: number) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FilterSelectBox
