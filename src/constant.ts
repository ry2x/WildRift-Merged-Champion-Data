import { Lanes } from './types/merged';

/**
 * The mapping of lane names from CN API to the corresponding Lanes type.
 */
export const LANE_MAPPING: Record<string, Lanes> = {
  中路: 'Mid',
  打野: 'Jungle',
  单人路: 'Top',
  辅助: 'Support',
  射手: 'AD',
} as const;

/**
 * The mapping of tags(roles) in Riot API.
 */
export const TAG_WORDS = {
  fighter: 'Fighter',
  mage: 'Mage',
  assassin: 'Assassin',
  marksman: 'Marksman',
  support: 'Support',
  tank: 'Tank',
} as const;

/**
 * The mapping of lanes for champions that are not available in Wild Rift.
 */
export const NO_WR_LANE: Record<string, Lanes[]> = {
  Anivia: ['Mid'],
  Aphelios: ['AD'],
  Aurora: ['Mid', 'Top'],
  Azir: ['Mid'],
  Bard: ['Support'],
  Belveth: ['Jungle'],
  Briar: ['Mid', 'Jungle'],
  Cassiopeia: ['Mid', 'Top'],
  Chogath: ['Mid', 'Top'],
  Elise: ['Jungle'],
  Gangplank: ['Mid', 'Top'],
  Hwei: ['Mid', 'Support'],
  Illaoi: ['Top'],
  Ivern: ['Jungle'],
  Karthus: ['Mid', 'Jungle'],
  Kled: ['Top'],
  KogMaw: ['AD'],
  KSante: ['Top'],
  Leblanc: ['Mid'],
  Malzahar: ['Mid'],
  Mel: ['Mid'],
  Naafiri: ['Mid', 'Jungle'],
  Neeko: ['Mid', 'Support'],
  Nidalee: ['Mid', 'Jungle'],
  Nocturne: ['Jungle'],
  Qiyana: ['Mid', 'Jungle'],
  Quinn: ['Top', 'AD'],
  RekSai: ['Jungle'],
  Rell: ['Support'],
  Renata: ['Support'],
  Sejuani: ['Jungle'],
  Shaco: ['Mid', 'Top', 'Jungle'],
  Skarner: ['Jungle'],
  Smolder: ['Top', 'AD'],
  Sylas: ['Mid'],
  TahmKench: ['Top', 'Support'],
  Taliyah: ['Mid'],
  Taric: ['Top', 'Support'],
  Trundle: ['Top', 'Jungle'],
  Udyr: ['Top', 'Jungle'],
  Velkoz: ['Mid', 'Support'],
  Xerath: ['Mid', 'Support'],
  Yorick: ['Top'],
  Zac: ['Top', 'Jungle'],
  Zilean: ['Mid', 'Support'],
};
