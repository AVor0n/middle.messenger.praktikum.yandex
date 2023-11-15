import { type MessageDto } from 'services';

export const datetimeFormatter = (dateString: string) =>
  new Date(dateString).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

export const messageDtoToMessageProps = (message: MessageDto, memberNames: Record<string, string>) => ({
  authorId: message.user_id,
  authorName: memberNames[message.user_id],
  content: message.content,
  time: datetimeFormatter(message.time),
});
