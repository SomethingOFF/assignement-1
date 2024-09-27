export interface UserTypes {
  id: string;
  name: string;
  email: string;
  password?: string;
  files: File[];
  role: "user" | "admin";
  createdAt: Date;
}

interface File {
  _id: string;
  filename: string;
  public_id: string;
  filetype: string;
  url: string;
  uploadedAt: string;
}
