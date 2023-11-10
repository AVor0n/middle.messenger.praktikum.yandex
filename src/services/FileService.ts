import { ResourcesApi } from '@api';

class FileService {
  private fileApi = new ResourcesApi();

  public getLinkToFile = (path: string) => {
    const normalizedPath = path.replace(/^\//u, '');
    return `${this.fileApi.baseUrl}/resources/${normalizedPath}`;
  };
}

export const fileService = new FileService();
