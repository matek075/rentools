export enum FileType {
  Logo = 'logo',
}

export interface File {
  type: FileType;
  used: boolean;
  path: string;
  id: number;
  order: number;
}
