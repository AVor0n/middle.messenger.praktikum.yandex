import { type ChangePasswordRequest, UserApi, type UserUpdateRequest, type FindUserRequest } from '@api';

class UserService {
  private userApi = new UserApi();

  public getUserById = (id: number) => this.userApi.userDetail(id);

  public searchUsers = (data: FindUserRequest) => this.userApi.searchCreate(data);

  public updatePassword = (data: ChangePasswordRequest) => this.userApi.passwordUpdate(data);

  public updateProfile = (data: UserUpdateRequest) => this.userApi.profileUpdate(data);

  public updateAvatar = (avatar: File) => this.userApi.profileAvatarUpdate({ avatar });
}

export const userService = new UserService();
