const deviceOptionData = [
  {
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
    name: 'MatchedStatus',
    option: [
      {
        queryTitle: '',
        optionTitle: 'All',
      },
      {
        queryTitle: false,
        optionTitle: 'UnMatched',
      },
      {
        queryTitle: true,
        optionTitle: 'Matched',
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
        optionTitle: 'OFF',
      },
    ],
  },
]

export default deviceOptionData
