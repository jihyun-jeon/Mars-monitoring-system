const equipmentOptionData = [
  {
    title: 'Equipment List',
    name: 'EquipmentType',
    selectTitle: 'Equipment Type',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Aerial Equipment',
      },
      {
        queryTitle: 2,
        optionTitle: 'Assistance Equipment',
      },
      {
        queryTitle: 3,
        optionTitle: 'Lifting Equipment',
      },
      {
        queryTitle: 4,
        optionTitle: 'Transportation Equipment',
      },
      {
        queryTitle: 5,
        optionTitle: 'Concrete Equipment',
      },
      {
        queryTitle: 6,
        optionTitle: 'Earth Work Equipment',
      },
      {
        queryTitle: 7,
        optionTitle: 'Pavement Equipment',
      },
      {
        queryTitle: 8,
        optionTitle: 'Piling/Digging Equipment',
      },
    ],
  },
  {
    selectTitle: 'Power Status',
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
    selectTitle: 'Device Status',
    name: 'DeviceStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Network On',
      },
      {
        queryTitle: 2,
        optionTitle: 'Network Off',
      },
      {
        queryTitle: 3,
        optionTitle: 'Network Error',
      },
    ],
  },

  {
    selectTitle: 'Battery Status',
    name: 'BatteryPercentage',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 'battrey=20',
        optionTitle: 'Less than 20%',
      },
    ],
  },

  {
    selectTitle: 'Matched Status',
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
