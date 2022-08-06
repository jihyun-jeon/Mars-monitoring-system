const equipmentOptionData = [
  {
    title: 'Equipment List',
    name: 'EquipmentType',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: '',
      },
      {
        queryTitle: 2,
        optionTitle: 'Verti Boring Machine',
      },
      {
        queryTitle: 3,
        optionTitle: '',
      },
      {
        queryTitle: 4,
        optionTitle: 'Scissors Lift',
      },
      {
        queryTitle: 5,
        optionTitle: 'Conveyor Belt',
      },
      {
        queryTitle: 6,
        optionTitle: 'Welding Machine',
      },
    ],
  },
  {
    name: 'PowerStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: true,
        optionTitle: 'ON',
      },
      {
        queryTitle: false,
        optionTitle: `OFF`,
      },
    ],
  },
  {
    name: 'DeviceStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Power On',
      },
      {
        queryTitle: 2,
        optionTitle: 'Power Off',
      },
      {
        queryTitle: 3,
        optionTitle: 'Network Error',
      },
    ],
  },

  {
    name: 'BatteryPercentage',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 'battrey=20',
        optionTitle: 'less than 20%',
      },
    ],
  },

  {
    name: 'MatchedStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: true,
        optionTitle: 'Matched',
      },
      {
        queryTitle: false,
        optionTitle: `UnMatched`,
      },
    ],
  },
]

export default equipmentOptionData
