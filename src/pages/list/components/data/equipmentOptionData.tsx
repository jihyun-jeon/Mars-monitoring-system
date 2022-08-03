const equipmentOptionData = [
  {
    title: 'Equipment List',
    name: 'EquipmentType',
    option: [
      {
        queryTitle: 'All',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Bulldozer',
      },
      {
        queryTitle: 2,
        optionTitle: 'Crane',
      },
      {
        queryTitle: 3,
        optionTitle: 'Fork Crane',
      },
    ],
  },
  {
    name: 'DeviceStatus',
    option: [
      {
        queryTitle: 'All',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Offline',
      },
      {
        queryTitle: 2,
        optionTitle: 'Online',
      },
      {
        queryTitle: 3,
        optionTitle: 'Error',
      },
    ],
  },
  {
    name: 'Battery',
    option: [
      {
        queryTitle: 'All',
        optionTitle: 'All',
      },
      {
        queryTitle: 'battrey=20',
        optionTitle: 'less than 20%',
      },
    ],
  },
  {
    name: 'ActiveStatus',
    option: [
      {
        queryTitle: 'All',
        optionTitle: 'All',
      },
      {
        queryTitle: true,
        optionTitle: 'Active',
      },
      {
        queryTitle: false,
        optionTitle: `InActive`,
      },
    ],
  },
]

export default equipmentOptionData
