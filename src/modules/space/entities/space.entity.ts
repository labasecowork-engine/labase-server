export interface SpaceEntity {
  id: string;
  name: string;
  description?: string;
  type: "UNIT" | "SHARED_SITE" | "FULL_ROOM";
  capacityMin: number;
  capacityMax: number;
  allowByUnit: boolean;
  allowFullRoom: boolean;
  access: "PUBLIC" | "PRIVATE";
  disabled: boolean;
  prices: Record<string, any>;
}
export interface BenefitEntity {
  id: string;
  name: string;
  description?: string;
}
