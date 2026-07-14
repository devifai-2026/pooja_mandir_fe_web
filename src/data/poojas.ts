export interface PoojaType {
  id: string;
  name: string;
  description: string;
  symbol: string;
  basePrice: number;
  perPersonPrice: number;
  duration: string;
}

export const poojaPricing: Record<string, { base: number; perPerson: number }> = {
  'Ganesha Pooja': { base: 1100, perPerson: 500 },
  'Shiva Pooja': { base: 1500, perPerson: 500 },
  'Vishnu Pooja': { base: 2100, perPerson: 500 },
  'Durga Pooja': { base: 3100, perPerson: 500 },
  'Lakshmi Pooja': { base: 2100, perPerson: 500 },
  'Saraswati Pooja': { base: 2100, perPerson: 500 },
  'Navagraha Pooja': { base: 5100, perPerson: 500 },
  'Satyanarayana Pooja': { base: 3100, perPerson: 500 },
  'Custom Pooja': { base: 2500, perPerson: 500 },
};

export const poojaTypes: PoojaType[] = [
  {
    id: 'ganesha',
    name: 'Ganesha Pooja',
    description: 'Invoke the remover of obstacles for new beginnings and prosperity.',
    symbol: 'ॐ',
    basePrice: 1100,
    perPersonPrice: 500,
    duration: '45 mins',
  },
  {
    id: 'shiva',
    name: 'Shiva Pooja',
    description: 'A sacred rudrabhishek for inner peace, strength, and transformation.',
    symbol: '☾',
    basePrice: 1500,
    perPersonPrice: 500,
    duration: '60 mins',
  },
  {
    id: 'vishnu',
    name: 'Vishnu Pooja',
    description: 'Seek the preserver’s blessing for harmony and protection.',
    symbol: '☸',
    basePrice: 2100,
    perPersonPrice: 500,
    duration: '75 mins',
  },
  {
    id: 'durga',
    name: 'Durga Pooja',
    description: 'Honor the divine mother for courage, protection, and victory.',
    symbol: '🔱',
    basePrice: 3100,
    perPersonPrice: 500,
    duration: '90 mins',
  },
  {
    id: 'lakshmi',
    name: 'Lakshmi Pooja',
    description: 'Invite abundance, wealth, and prosperity into your home.',
    symbol: '❁',
    basePrice: 2100,
    perPersonPrice: 500,
    duration: '60 mins',
  },
  {
    id: 'saraswati',
    name: 'Saraswati Pooja',
    description: 'Seek blessings of wisdom, knowledge, and the arts.',
    symbol: '✦',
    basePrice: 2100,
    perPersonPrice: 500,
    duration: '60 mins',
  },
  {
    id: 'navagraha',
    name: 'Navagraha Pooja',
    description: 'Balance the nine celestial forces influencing your destiny.',
    symbol: '☉',
    basePrice: 5100,
    perPersonPrice: 500,
    duration: '120 mins',
  },
  {
    id: 'satyanarayana',
    name: 'Satyanarayana Pooja',
    description: 'A powerful ritual for truth, well-being, and family harmony.',
    symbol: 'ॐ',
    basePrice: 3100,
    perPersonPrice: 500,
    duration: '90 mins',
  },
];

export const gotraOptions = [
  'Vashishtha',
  'Vishwamitra',
  'Kashyapa',
  'Atri',
  'Bharadwaja',
  'Gautama',
  'Jamadagni',
  'Other',
];

export const poojaTypeOptions = [
  'Ganesha Pooja',
  'Shiva Pooja',
  'Vishnu Pooja',
  'Durga Pooja',
  'Lakshmi Pooja',
  'Saraswati Pooja',
  'Navagraha Pooja',
  'Satyanarayana Pooja',
  'Custom Pooja',
];
