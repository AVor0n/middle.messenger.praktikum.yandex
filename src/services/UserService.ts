import { UserApi, type FindUserRequest } from '@api';

class UserService {
  private userApi = new UserApi();

  public getUserById = (id: number) => this.userApi.userDetail(id);

  public searchUsers = (data: FindUserRequest) => this.userApi.searchCreate(data);

  public updateAvatar = (avatar: File) => this.userApi.profileAvatarUpdate({ avatar });
}

export const userService = new UserService();
