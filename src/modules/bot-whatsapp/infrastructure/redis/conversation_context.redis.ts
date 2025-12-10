import { redisClient } from "../../../../config/redis";

export type ConversationState = {
  greeted: boolean;
  funnelActive: boolean;
  lastMessageAt: number;
  lastIntent?: string;
  lastCtaAt?: number;
};

const KEY = (chatId: string) => `BOTWA:CTX:${chatId}`;
const TTL_SECONDS = parseInt(process.env.BOTWA_CTX_TTL ?? "900", 10);

export async function getContext(chatId: string): Promise<ConversationState> {
  const str = await redisClient.get(KEY(chatId));
  if (!str) {
    const fresh: ConversationState = {
      greeted: false,
      funnelActive: false,
      lastMessageAt: Date.now(),
    };
    await saveContext(chatId, fresh);
    return fresh;
  }
  return JSON.parse(str) as ConversationState;
}

export async function saveContext(chatId: string, state: ConversationState) {
  await redisClient.set(KEY(chatId), JSON.stringify(state), {
    EX: TTL_SECONDS,
  });
}

export async function touchContext(
  chatId: string,
  patch?: Partial<ConversationState>
) {
  const cur = await getContext(chatId);
  const next = { ...cur, ...patch, lastMessageAt: Date.now() };
  await saveContext(chatId, next);
  return next;
}

export async function resetContext(chatId: string) {
  await redisClient.del(KEY(chatId));
}
