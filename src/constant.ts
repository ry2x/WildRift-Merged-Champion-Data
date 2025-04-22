import { Lanes } from './types/merged';

export const LANE_MAPPING: Record<string, Lanes> = {
  中路: 'Mid',
  打野: 'Jungle',
  单人路: 'Top',
  辅助: 'Support',
  射手: 'AD',
} as const;

export const TAG_WORDS = {
  fighter: 'Fighter',
  mage: 'Mage',
  assassin: 'Assassin',
  marksman: 'Marksman',
  support: 'Support',
  tank: 'Tank',
} as const;
