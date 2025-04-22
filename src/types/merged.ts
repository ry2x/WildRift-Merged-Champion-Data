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

export type Lanes = 'Mid' | 'Jungle' | 'Top' | 'Support' | 'AD';
export type Roles = 'Fighter' | 'Mage' | 'Assassin' | 'Marksman' | 'Support' | 'Tank';
