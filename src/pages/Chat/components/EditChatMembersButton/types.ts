import { type ChatUserResponse, type UserResponse } from '@api';

export interface UserPreviewData {
  avatar?: string;
  id: number;
  login: string;
  firstName: string;
  secondName: string;
}

export const chatUserResponseToChatPreviewData = (user: ChatUserResponse): UserPreviewData => ({
  id: user.id,
  firstName: user.first_name,
  secondName: user.second_name,
  login: user.login,
  avatar: user.avatar,
});

export const userResponseToChatPreviewData = (user: UserResponse): UserPreviewData => ({
  id: user.id,
  firstName: user.first_name,
  secondName: user.second_name,
  login: user.login,
  avatar: user.avatar,
});
