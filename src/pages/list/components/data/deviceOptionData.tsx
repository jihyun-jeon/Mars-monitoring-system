const deviceOptionData = [
  {
    selectTitle: 'Battery Status',
    title: 'Device List',
    name: 'BatteryStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: 1,
        optionTitle: 'Less than 20%',
      },
    ],
  },
  {
    selectTitle: 'Company',
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
    selectTitle: 'Matched Status',
    name: 'MatchedStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: false,
        optionTitle: 'Unmatched',
      },
      {
        queryTitle: true,
        optionTitle: 'Matched',
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
        optionTitle: 'On',
      },
      {
        queryTitle: false,
        optionTitle: 'Off',
      },
    ],
  },
]

export default deviceOptionData
