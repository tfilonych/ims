import {randomArrayItem, randomId, randomTraderName} from '@mui/x-data-grid-generator';

const randomRole = () => randomArrayItem(category);

export const category = ['Market', 'Finance', 'Development'];
export const categories = [
  { id: randomId(), name: 'Market' },
  { id: randomId(), name: 'Finance' },
  { id: randomId(), name: 'Development' },

]
export const initialRows = [
  { id: randomId(), name: randomTraderName(), category: randomRole(), price: 64, quantity: 65 },
  { id: randomId(), name: randomTraderName(), category: randomRole(), price: 123, quantity: 3 },
  { id: randomId(), name: randomTraderName(), category: randomRole(), price: 654, quantity: 2 },
  { id: randomId(), name: randomTraderName(), category: randomRole(), price: 290, quantity: 15 },
  { id: randomId(), name: randomTraderName(), category: randomRole(), price: 450, quantity: 12 },
];