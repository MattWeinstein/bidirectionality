import type { Alert, AlertChannel } from "@/types/alert";

// Notification fan-out. Each channel is a separate implementation behind the
// same interface so the dispatch engine can iterate without knowing what
// transport it's using.

export interface NotificationPayload {
  alert: Alert;
  recipientId: string;
}

export interface NotificationChannel {
  readonly id: AlertChannel;
  send(payload: NotificationPayload): Promise<{ ok: boolean; messageId?: string; error?: string }>;
}

export interface UserNotificationPreferences {
  userId: string;
  channels: AlertChannel[];
  quietHours?: { startHour: number; endHour: number };
}

const channels = new Map<AlertChannel, NotificationChannel>();

export function registerChannel(channel: NotificationChannel): void {
  channels.set(channel.id, channel);
}

export function getChannel(id: AlertChannel): NotificationChannel | undefined {
  return channels.get(id);
}

export async function dispatch(
  alert: Alert,
  recipientId: string,
  prefs: UserNotificationPreferences,
): Promise<void> {
  await Promise.all(
    prefs.channels.map(async (id) => {
      const channel = channels.get(id);
      if (!channel) return;
      await channel.send({ alert, recipientId });
    }),
  );
}
