export interface User {
  id: number;
  email: string;
  name: string; // Name should be required based on signup API
  password: string; // Password is needed for auth
  role: 'USER' | 'ADMIN'; // Role is used in auth flows
  createdAt: Date;
}
