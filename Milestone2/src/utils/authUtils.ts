import { User, EnterpriseRole } from '../types';

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one number.';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character.';
  }
  return null;
}

export function getPasswordStrengthLabel(password: string): { label: string; color: string; badge: string } {
  if (!password) return { label: 'Empty', color: 'text-slate-400', badge: '⚪ None' };
  
  const hasMin = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNum = /\d/.test(password);
  const hasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const score = [hasMin, hasUpper, hasLower, hasNum, hasSpec].filter(Boolean).length;

  if (score < 3 || password.length < 8) {
    return { label: 'Weak Password', color: 'text-rose-600 bg-rose-50 border-rose-200', badge: '🔴 Weak Password' };
  } else if (score < 5 || password.length < 10) {
    return { label: 'Average Password', color: 'text-amber-600 bg-amber-50 border-amber-200', badge: '🟡 Average Password' };
  } else {
    return { label: 'Strong Password', color: 'text-emerald-600 bg-emerald-50 border-emerald-200', badge: '🟢 Strong Password' };
  }
}

// Bcrypt simulation / secure hash representation
export function hashText(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return '$2b$12$' + Math.abs(hash).toString(16).padStart(12, '0') + '_' + btoa(str).slice(0, 8);
}

const STORAGE_USERS_KEY = 'franchiseops_users_db_v2';

export function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) {
      const parsed: User[] = JSON.parse(raw);
      // Auto-unlock expired accounts on load
      const now = Date.now();
      let modified = false;
      parsed.forEach(u => {
        if (u.status === 'Locked' && u.lockUntilTimestamp && now >= u.lockUntilTimestamp) {
          u.status = 'Active';
          u.failedAttempts = 0;
          u.lockUntilTimestamp = null;
          modified = true;
        }
      });
      if (modified) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(parsed));
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load users from storage', e);
  }

  // Default admin user matching infosys@ai / admin@123
  const defaultAdmin: User = {
    id: 'user-admin-1',
    username: 'Administrator',
    email: 'infosys@ai',
    passwordHash: hashText('admin@123'),
    securityQuestion: 'What is your pet name?',
    securityAnswerHash: hashText('admin'),
    role: 'Admin',
    createdAt: new Date().toISOString().split('T')[0],
    failedAttempts: 0,
    lockUntilTimestamp: null,
    status: 'Active'
  };

  const defaultUsers: User[] = [
    defaultAdmin,
    {
      id: 'user-2',
      username: 'sarah_franchise',
      email: 'sarah@franchise.com',
      passwordHash: hashText('Sarah@1234'),
      securityQuestion: 'What city were you born in?',
      securityAnswerHash: hashText('austin'),
      role: 'Franchise Owner',
      createdAt: '2026-06-15',
      failedAttempts: 0,
      lockUntilTimestamp: null,
      status: 'Active'
    },
    {
      id: 'user-3',
      username: 'marcus_manager',
      email: 'marcus@franchise.com',
      passwordHash: hashText('Marcus@1234'),
      securityQuestion: 'What is your favorite school teacher\'s name?',
      securityAnswerHash: hashText('smith'),
      role: 'Regional Operations Manager',
      createdAt: '2026-07-01',
      failedAttempts: 0,
      lockUntilTimestamp: null,
      status: 'Active'
    }
  ];

  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

export function saveUsersToStorage(users: User[]): void {
  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
}

export interface LoginAttemptResult {
  success: boolean;
  user?: User;
  message: string;
  remainingLockSeconds?: number;
}

export function authenticateUser(identifier: string, passwordInput: string): LoginAttemptResult {
  const users = getStoredUsers();
  const index = users.findIndex(
    u => u.email.toLowerCase() === identifier.trim().toLowerCase() ||
         u.username.toLowerCase() === identifier.trim().toLowerCase()
  );

  if (index === -1) {
    return { success: false, message: 'Invalid email/username or password.' };
  }

  const user = users[index];
  const now = Date.now();

  // Check if locked
  if (user.status === 'Locked' && user.lockUntilTimestamp) {
    if (now < user.lockUntilTimestamp) {
      const remainingSeconds = Math.ceil((user.lockUntilTimestamp - now) / 1000);
      return {
        success: false,
        message: `Too many failed login attempts. Your account has been locked for ${remainingSeconds} seconds.`,
        remainingLockSeconds: remainingSeconds
      };
    } else {
      // Auto unlock after 30 seconds
      user.status = 'Active';
      user.failedAttempts = 0;
      user.lockUntilTimestamp = null;
    }
  }

  // Verify password
  if (user.passwordHash === hashText(passwordInput)) {
    // Reset failed attempts on success
    user.failedAttempts = 0;
    user.lockUntilTimestamp = null;
    user.status = 'Active';
    users[index] = user;
    saveUsersToStorage(users);
    return { success: true, user, message: `Welcome back, ${user.username} [${user.role}]!` };
  } else {
    // Incorrect password
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.status = 'Locked';
      user.lockUntilTimestamp = Date.now() + 30000; // 30 seconds lock
      users[index] = user;
      saveUsersToStorage(users);
      return {
        success: false,
        message: 'Account locked. Try again in 30 seconds.',
        remainingLockSeconds: 30
      };
    } else {
      users[index] = user;
      saveUsersToStorage(users);
      const triesLeft = 5 - user.failedAttempts;
      return {
        success: false,
        message: `Invalid password. Failed attempt ${user.failedAttempts}/5. ${triesLeft} attempt(s) remaining before 30s lockout.`
      };
    }
  }
}

export function registerUser(user: Omit<User, 'failedAttempts' | 'lockUntilTimestamp' | 'status'>): { success: boolean; message: string } {
  const users = getStoredUsers();
  
  // Check duplicates
  const duplicateUser = users.find(u => u.username.toLowerCase() === user.username.toLowerCase());
  if (duplicateUser) {
    return { success: false, message: 'Username already taken. Please choose another username.' };
  }

  const duplicateEmail = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
  if (duplicateEmail) {
    return { success: false, message: 'An account with this email address already exists.' };
  }

  const newUser: User = {
    ...user,
    id: `user-${Date.now()}`,
    failedAttempts: 0,
    lockUntilTimestamp: null,
    status: 'Active'
  };

  users.push(newUser);
  saveUsersToStorage(users);
  return { success: true, message: `Account registered successfully with role [${newUser.role}]!` };
}

export function unlockUserAccount(usernameOrEmail: string): boolean {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase());
  if (index !== -1) {
    users[index].status = 'Active';
    users[index].failedAttempts = 0;
    users[index].lockUntilTimestamp = null;
    saveUsersToStorage(users);
    return true;
  }
  return false;
}

export function deleteUserAccount(usernameOrEmail: string): boolean {
  const users = getStoredUsers();
  const filtered = users.filter(u => u.username.toLowerCase() !== usernameOrEmail.toLowerCase() && u.email.toLowerCase() !== usernameOrEmail.toLowerCase());
  if (filtered.length !== users.length) {
    saveUsersToStorage(filtered);
    return true;
  }
  return false;
}

export function resetUserPassword(email: string, newPasswordHash: string): boolean {
  const users = getStoredUsers();
  const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    users[index].passwordHash = newPasswordHash;
    users[index].failedAttempts = 0;
    users[index].status = 'Active';
    users[index].lockUntilTimestamp = null;
    saveUsersToStorage(users);
    return true;
  }
  return false;
}

export const updateUserPassword = resetUserPassword;
