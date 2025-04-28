import { Lanes } from './types/merged';

/**
 * The mapping of lane names from CN API to the corresponding Lanes type.
 */
export const LANE_MAPPING: Record<string, Lanes> = {
  中路: 'mid',
  打野: 'jungle',
  单人路: 'top',
  辅助: 'support',
  射手: 'ad',
} as const;

/**
 * The mapping of tags(roles) in Riot API.
 */
export const TAG_WORDS = {
  fighter: 'fighter',
  mage: 'mage',
  assassin: 'assassin',
  marksman: 'marksman',
  support: 'support',
  tank: 'tank',
} as const;

/**
 * The mapping of lanes for champions that are not available in Wild Rift.
 */
export const NO_WR_LANE: Record<string, Lanes[]> = {
  Anivia: ['mid'],
  Aphelios: ['ad'],
  Aurora: ['mid', 'top'],
  Azir: ['mid'],
  Bard: ['support'],
  Belveth: ['jungle'],
  Briar: ['mid', 'jungle'],
  Cassiopeia: ['mid', 'top'],
  Chogath: ['mid', 'top'],
  Elise: ['jungle'],
  Gangplank: ['mid', 'top'],
  Hwei: ['mid', 'support'],
  Illaoi: ['top'],
  Ivern: ['jungle'],
  Karthus: ['mid', 'jungle'],
  Kled: ['top'],
  KogMaw: ['ad'],
  KSante: ['top'],
  Leblanc: ['mid'],
  Malzahar: ['mid'],
  Mel: ['mid'],
  Naafiri: ['mid', 'jungle'],
  Neeko: ['mid', 'support'],
  Nidalee: ['mid', 'jungle'],
  Nocturne: ['jungle'],
  Qiyana: ['mid', 'jungle'],
  Quinn: ['top', 'ad'],
  RekSai: ['jungle'],
  Rell: ['support'],
  Renata: ['support'],
  Sejuani: ['jungle'],
  Shaco: ['mid', 'top', 'jungle'],
  Skarner: ['jungle'],
  Smolder: ['top', 'ad'],
  Sylas: ['mid'],
  TahmKench: ['top', 'support'],
  Taliyah: ['mid'],
  Taric: ['top', 'support'],
  Trundle: ['top', 'jungle'],
  Udyr: ['top', 'jungle'],
  Velkoz: ['mid', 'support'],
  Xerath: ['mid', 'support'],
  Yorick: ['top'],
  Zac: ['top', 'jungle'],
  Zilean: ['mid', 'support'],
};
