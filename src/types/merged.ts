/**
 * This file contains the types for the merged champion data.
 */
export interface MergedChamp {
  id: string;
  hero_id: number;
  key: number;
  name: string;
  title: string;
  describe: string;
  roles: Roles[];
  type: string;
  is_wr: boolean;
  lanes: Lanes[];
  is_free: boolean;
  difficult: number;
  damage: number;
  survive: number;
  utility: number;
}

/**
 * Literal types for the lanes in RiotAPI.
 */
export type Lanes = 'mid' | 'jungle' | 'top' | 'support' | 'ad';

/**
 * Literal types for the roles in RiotAPI.
 */
export type Roles = 'fighter' | 'mage' | 'assassin' | 'marksman' | 'support' | 'tank';
