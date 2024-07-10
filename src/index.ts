import { Context, Logger, Schema, Session } from "koishi";
import {} from "koishi-plugin-adapter-onebot";

export const name = "auto-group-del";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  const logger = new Logger("auto-group-del");

  // This event is not defined
  // Should be investigated
  // @ts-ignore
  ctx.on("guild-member", async (session: Session) => {
    if (session.platform !== "onebot" || session.subtype !== "ban") return;

    logger.debug("SelfId:", session.selfId);
    logger.debug("UserId:", session.userId);
    logger.debug("GuildId:", session.guildId);

    if (session.selfId !== session.userId) return;
    logger.debug("Self mute detected in group:", session.guildId);

    // Lagrange.Onebot uses strict type when parsing requests
    await session.onebot.setGroupLeave(parseInt(session.guildId));
  });
}
