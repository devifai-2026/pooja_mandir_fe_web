import { poojaPricing } from '../data/poojas';

export function calculatePoojaPrice(poojaType: string, numberOfPersons: number): number {
  const pricing = poojaPricing[poojaType];
  if (!pricing) return 0;
  const extraPersons = Math.max(0, numberOfPersons - 1);
  return pricing.base + extraPersons * pricing.perPerson;
}
