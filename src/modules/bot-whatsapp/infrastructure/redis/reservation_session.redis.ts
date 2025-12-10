import { redisClient } from "../../../../config/redis";
import type { ReservationLead } from "../../domain/reservation_lead.schema";

type StepKey =
  | "name"
  | "phone"
  | "space"
  | "people"
  | "date"
  | "start_time"
  | "end_time"
  | "purpose";
export type FunnelState = {
  _step: number;
  data: Partial<ReservationLead>;
  startedAt: number;
};
const KEY = (chatId: string) => `BOTWA:FUNNEL:${chatId}`;
const TTL = parseInt(process.env.BOTWA_FUNNEL_TTL ?? "900", 10); // 15 min

export async function getFunnel(chatId: string): Promise<FunnelState | null> {
  const raw = await redisClient.get(KEY(chatId));
  return raw ? (JSON.parse(raw) as FunnelState) : null;
}
export async function saveFunnel(chatId: string, st: FunnelState) {
  await redisClient.set(KEY(chatId), JSON.stringify(st), { EX: TTL });
}
export async function resetFunnel(chatId: string) {
  await redisClient.del(KEY(chatId));
}
export const ORDER: StepKey[] = [
  "name",
  "phone",
  "space",
  "people",
  "date",
  "start_time",
  "end_time",
  "purpose",
];
