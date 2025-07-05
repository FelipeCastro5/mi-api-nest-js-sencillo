// src/domain/ActivityDomain/activity.entity.ts
export class Activity {
  id_act: number;
  fk_user: number | null;
  fk_proj: number;
  activity: string; 
  assigned: Date;
}
