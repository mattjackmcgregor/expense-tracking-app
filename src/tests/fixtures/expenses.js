import moment from 'moment'

export default [{
  id: '1',
  description: 'food',
  amount: 10000,
  note: '',
  createdAt: 0
}, {
  id: '2',
  description: 'rent',
  amount: 0,
  note: '',
  createdAt: moment(0).subtract(10, 'days').valueOf()
}, {
  id: '3',
  description: 'power',
  amount: 20000,
  note: '',
  createdAt: moment(0).add(10, 'days').valueOf()
}]
