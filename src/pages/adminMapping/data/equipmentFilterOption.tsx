const equipmentFilterOption = [
  {
    title: 'Equipment',
    name: 'EquipmentType',
    selectName: 'Equipment Type',
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
    selectName: 'Company',
    name: 'Company',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'AAE',
      },
      {
        queryTitle: 2,
        optionTitle: 'SECL',
      },
    ],
  },
  {
    selectName: 'Matched Status',
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

export default equipmentFilterOption
