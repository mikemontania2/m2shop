import usersData from '../data/users.json';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
  role: 'admin' | 'customer';
  documentType: 'ci' | 'ruc' | 'none';
  documentNumber: string;
}

class AuthService {
  private currentUser: User | null = null;
  private getAllUsers(): User[] {
    const saved = localStorage.getItem('allUsers');
    if (saved) {
      try { return JSON.parse(saved) as User[]; } catch { /* ignore */ }
    }
    return usersData as User[];
  }

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  login(email: string, password: string): { success: boolean; user?: User; message?: string } {
    const list = this.getAllUsers();
    const user = list.find(u => u.email === email && u.password === password) as User | undefined;

    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, message: 'Email o contraseña incorrectos' };
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  register(email: string, password: string, name: string): { success: boolean; message?: string } {
    const allUsers = this.getAllUsers();
    const existingUser = allUsers.find((u: User) => u.email === email);
    if (existingUser) {
      return { success: false, message: 'El email ya está registrado' };
    }

    const newUser: User = {
      id: Date.now(),
      email,
      password,
      name,
      phone: '',
      address: '',
      role: 'customer',
      documentType: 'none',
      documentNumber: ''
    };

    const users = [...allUsers, newUser];
    localStorage.setItem('allUsers', JSON.stringify(users));

    this.currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return { success: true };
  }

  updateProfile(updates: Partial<User>): { success: boolean; message?: string } {
    if (!this.currentUser) {
      return { success: false, message: 'No hay usuario autenticado' };
    }

    this.currentUser = { ...this.currentUser, ...updates };
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || JSON.stringify(usersData));
    const userIndex = allUsers.findIndex((u: User) => u.id === this.currentUser!.id);
    if (userIndex !== -1) {
      allUsers[userIndex] = this.currentUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }

    return { success: true };
  }
}

export default new AuthService();
