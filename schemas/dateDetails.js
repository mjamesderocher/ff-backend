import Select from '../components/Select'

export default {
  type: 'object',
  name: 'dateDetails',
  fields: [
  	{
      name: 'time',
      title: 'Time',
      type: 'string',
    },
    {
      name: 'sourcingCircumstances',
      title: 'Sourcing Circumstances',
      type: 'localeString',
    },
    {
      name: 'precision',
      title: 'Precision',
      type: 'number',
      inputComponent: Select,
      options: {
        values: [
          {title: 'Millennium', value: 6},
          {title: 'Century', value: 7},
          {title: 'Decade', value: 8},
          {title: 'Year', value: 9},
          {title: 'Month', value: 10},
          {title: 'Day', value: 11},
          {title: 'Hour', value: 12},
          {title: 'Minute', value: 13}
        ]
      },
      validation: Rule => Rule.min(6).max(13)
    },
    {
      name: 'calendar',
      title: 'Calendar',
      type: 'localeString',
    }
  ]
}