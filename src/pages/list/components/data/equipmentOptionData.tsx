const equipmentOptionData = [
  {
    title: 'Equipment List',
    name: 'Equipment Type',
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
    name: 'Device Status',
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
    name: 'Active Status',
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
  {
    name: 'Matched Status',
    option: [
      {
        queryTitle: 'All',
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
