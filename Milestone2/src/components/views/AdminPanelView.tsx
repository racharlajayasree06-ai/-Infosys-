import React, { useState, useEffect } from 'react';
import { User, EnterpriseRole } from '../../types';
import { 
  getStoredUsers, 
  saveUsersToStorage, 
  registerUser, 
  unlockUserAccount, 
  deleteUserAccount, 
  resetUserPassword,
  validatePassword,
  hashText,
  authenticateUser
} from '../../utils/authUtils';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert,
  KeyRound,
  X,
  Activity,
  Brain,
  Download,
  CheckSquare,
  Square,
  Clock,
  Sparkles,
  TrendingUp,
  DollarSign,
  Zap,
  Edit2,
  FileSpreadsheet,
  ShieldCheck,
  ListFilter
} from 'lucide-react';

interface AdminPanelViewProps {
  currentUser: User;
  onShowToast: (message: string, type: 'success' | 'error' | 'warning') => void;
}

interface ActivityLogItem {
  id: string;
  type: 'user_created' | 'user_deleted' | 'user_unlocked' | 'password_reset' | 'model_updated' | 'login_success' | 'login_failure';
  text: string;
  timestamp: string;
}

const INITIAL_LOGS: ActivityLogItem[] = [
  { id: '1', type: 'login_success', text: 'Admin [infosys@ai] logged in successfully.', timestamp: '2026-07-26 09:42:10' },
  { id: '2', type: 'model_updated', text: 'ML Model XGBoost v2.4 re-trained with 97.8% validation accuracy.', timestamp: '2026-07-26 09:15:00' },
  { id: '3', type: 'user_created', text: 'User [sarah_franchise] created with role Franchise Owner.', timestamp: '2026-07-25 18:30:22' },
  { id: '4', type: 'user_unlocked', text: 'Account [marcus_manager] unlocked by Admin.', timestamp: '2026-07-25 14:20:11' },
  { id: '5', type: 'password_reset', text: 'Password reset for user [infosys@ai].', timestamp: '2026-07-24 11:05:00' },
  { id: '6', type: 'login_failure', text: 'Failed login attempt for account [unknown_user].', timestamp: '2026-07-24 08:12:45' }
];

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({ currentUser, onShowToast }) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'users' | 'analytics' | 'security' | 'model' | 'logs'>('users');

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditUser, setShowEditUser] = useState<User | null>(null);
  const [showResetModal, setShowResetModal] = useState<User | null>(null);

  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_LOGS);

  // Add User Form States
  const [addFullName, setAddFullName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPassword, setAddPassword] = useState('');
  const [addConfirmPassword, setAddConfirmPassword] = useState('');
  const [addRole, setAddRole] = useState<EnterpriseRole>('Store Manager');

  // Edit User Form State
  const [editRole, setEditRole] = useState<EnterpriseRole>('Store Manager');

  // Password reset form state
  const [resetPw, setResetPw] = useState('');
  const [resetConfirmPw, setResetConfirmPw] = useState('');

  // Login Security Tester State
  const [testIdentifier, setTestIdentifier] = useState('infosys@ai');
  const [testPassword, setTestPassword] = useState('wrong_password');
  const [failedAttemptsCount, setFailedAttemptsCount] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);
  const [lockTimerSeconds, setLockTimerSeconds] = useState(0);

  const reloadUsers = () => {
    setUsers(getStoredUsers());
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  // Lockout Countdown Timer Effect
  useEffect(() => {
    if (lockTimerSeconds <= 0) {
      if (isLockedOut) {
        setIsLockedOut(false);
        onShowToast('Account unlocked automatically after 30 seconds.', 'success');
        addActivityLog('user_unlocked', 'Account automatically unlocked after 30 seconds lockout.');
      }
      return;
    }

    const interval = setInterval(() => {
      setLockTimerSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [lockTimerSeconds, isLockedOut]);

  const addActivityLog = (type: ActivityLogItem['type'], text: string) => {
    const newLog: ActivityLogItem = {
      id: String(Date.now()),
      type,
      text,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Real-time password validations
  const pwHasMin = addPassword.length >= 8;
  const pwHasUpper = /[A-Z]/.test(addPassword);
  const pwHasLower = /[a-z]/.test(addPassword);
  const pwHasNum = /\d/.test(addPassword);
  const pwHasSpec = /[!@#$%^&*(),.?":{}|<>]/.test(addPassword);
  const pwMatches = addPassword !== '' && addPassword === addConfirmPassword;

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(filteredUsers.map(u => u.username));
    } else {
      setSelectedUserIds([]);
    }
  };

  const handleToggleSelectUser = (username: string) => {
    if (selectedUserIds.includes(username)) {
      setSelectedUserIds(selectedUserIds.filter(id => id !== username));
    } else {
      setSelectedUserIds([...selectedUserIds, username]);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!addFullName.trim() || !addEmail.trim() || !addPassword || !addConfirmPassword) {
      onShowToast('Please fill out all user creation fields.', 'error');
      return;
    }

    if (!pwHasMin || !pwHasUpper || !pwHasLower || !pwHasNum || !pwHasSpec) {
      onShowToast('Password does not satisfy security criteria.', 'error');
      return;
    }

    if (!pwMatches) {
      onShowToast('Confirm Password must exactly match Password.', 'error');
      return;
    }

    const res = registerUser({
      username: addFullName.trim(),
      email: addEmail.trim(),
      passwordHash: hashText(addPassword),
      securityQuestion: 'What is your pet name?',
      securityAnswerHash: hashText('admin'),
      role: addRole,
      createdAt: new Date().toISOString().split('T')[0]
    });

    if (res.success) {
      onShowToast('User Added Successfully', 'success');
      addActivityLog('user_created', `User [${addFullName.trim()}] added successfully with role ${addRole}.`);
      setShowAddModal(false);
      setAddFullName('');
      setAddEmail('');
      setAddPassword('');
      setAddConfirmPassword('');
      reloadUsers();
    } else {
      onShowToast(res.message, 'error');
    }
  };

  const handleDeleteUser = (username: string) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      const ok = deleteUserAccount(username);
      if (ok) {
        onShowToast('User Deleted', 'success');
        addActivityLog('user_deleted', `User [${username}] deleted.`);
        reloadUsers();
      } else {
        onShowToast('Failed to delete user.', 'error');
      }
    }
  };

  const handleDeleteSelected = () => {
    if (selectedUserIds.length === 0) {
      onShowToast('No users selected for deletion.', 'warning');
      return;
    }

    if (window.confirm(`Delete ${selectedUserIds.length} selected user(s)?`)) {
      selectedUserIds.forEach(id => deleteUserAccount(id));
      onShowToast('User Deleted', 'success');
      addActivityLog('user_deleted', `Bulk deleted ${selectedUserIds.length} users.`);
      setSelectedUserIds([]);
      reloadUsers();
    }
  };

  const handleExportUsers = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `franchiseops_users_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onShowToast('Users exported successfully as JSON file.', 'success');
  };

  const handleUnlockUser = (username: string) => {
    const ok = unlockUserAccount(username);
    if (ok) {
      onShowToast('Account Unlocked', 'success');
      addActivityLog('user_unlocked', `Account [${username}] unlocked by admin.`);
      reloadUsers();
    } else {
      onShowToast('Failed to unlock account.', 'error');
    }
  };

  const handleLockUserManually = (username: string) => {
    const allUsers = getStoredUsers();
    const idx = allUsers.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    if (idx !== -1) {
      allUsers[idx].status = 'Locked';
      allUsers[idx].lockUntilTimestamp = Date.now() + 30000;
      saveUsersToStorage(allUsers);
      onShowToast('Account Locked', 'warning');
      addActivityLog('user_unlocked', `Account [${username}] manually locked by admin for 30s.`);
      reloadUsers();
    }
  };

  const handleConfirmResetPw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetModal) return;

    if (!resetPw || !resetConfirmPw) {
      onShowToast('Please fill out both password fields.', 'error');
      return;
    }

    if (resetPw !== resetConfirmPw) {
      onShowToast('Passwords do not match.', 'error');
      return;
    }

    const valErr = validatePassword(resetPw);
    if (valErr) {
      onShowToast(valErr, 'error');
      return;
    }

    const ok = resetUserPassword(showResetModal.email, hashText(resetPw));
    if (ok) {
      onShowToast('Password Updated', 'success');
      addActivityLog('password_reset', `Password updated for user [${showResetModal.username}].`);
      setShowResetModal(null);
      setResetPw('');
      setResetConfirmPw('');
      reloadUsers();
    } else {
      onShowToast('Failed to reset password.', 'error');
    }
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditUser) return;

    const allUsers = getStoredUsers();
    const idx = allUsers.findIndex(u => u.username === showEditUser.username);
    if (idx !== -1) {
      allUsers[idx].role = editRole;
      saveUsersToStorage(allUsers);
      onShowToast('User details updated successfully.', 'success');
      setShowEditUser(null);
      reloadUsers();
    }
  };

  // Login Security Attempt Tester
  const handleTestLoginAttempt = (isCorrect: boolean) => {
    if (isLockedOut) return;

    if (isCorrect) {
      setFailedAttemptsCount(0);
      onShowToast('Login Successful', 'success');
      addActivityLog('login_success', `Login successful for user [${testIdentifier}]. Failed attempts reset.`);
    } else {
      const newCount = failedAttemptsCount + 1;
      setFailedAttemptsCount(newCount);
      addActivityLog('login_failure', `Failed login attempt ${newCount}/5 for user [${testIdentifier}].`);

      if (newCount >= 5) {
        setIsLockedOut(true);
        setLockTimerSeconds(30);
        onShowToast('Account locked. Try again in 30 seconds.', 'error');
      } else {
        const triesLeft = 5 - newCount;
        onShowToast(`Wrong Password! Failed attempt ${newCount}/5. ${triesLeft} attempt(s) left before lockout.`, 'warning');
      }
    }
  };

  // Analytics Metrics Calculations
  const totalUsersCount = users.length;
  const activeUsersCount = users.filter(u => u.status === 'Active').length;
  const lockedUsersCount = users.filter(u => u.status === 'Locked').length;
  const adminUsersCount = users.filter(u => u.role === 'Admin').length;

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 border border-orange-200">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900">FranchiseOps Admin Management Panel</h2>
          </div>
          <p className="text-xs text-slate-500">
            Configure system users, manage authentication security, view ML model card metrics, and inspect operational logs.
          </p>
        </div>

        {/* Sub-tab Switchers */}
        <div className="flex flex-wrap gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setActiveAdminSubTab('users')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeAdminSubTab === 'users' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Management</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeAdminSubTab === 'analytics' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Dashboard Analytics</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('security')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeAdminSubTab === 'security' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Login Security</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('model')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeAdminSubTab === 'model' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>ML Model Card</span>
          </button>

          <button
            onClick={() => setActiveAdminSubTab('logs')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeAdminSubTab === 'logs' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Activity Logs</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: USER MANAGEMENT */}
      {activeAdminSubTab === 'users' && (
        <div className="space-y-6">
          {/* Header Actions */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user ID, name, email, role, status..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => setShowAddModal(true)}
                className="py-2.5 px-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Add User</span>
              </button>

              <button
                onClick={handleDeleteSelected}
                disabled={selectedUserIds.length === 0}
                className="py-2.5 px-3.5 bg-rose-50 hover:bg-rose-100 text-rose-700 disabled:opacity-40 border border-rose-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Selected ({selectedUserIds.length})</span>
              </button>

              <button
                onClick={handleExportUsers}
                className="py-2.5 px-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs rounded-xl transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-orange-600" />
                <span>Export Users</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-x-auto p-4 sm:p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedUserIds.length > 0 && selectedUserIds.length === filteredUsers.length}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="accent-orange-500 cursor-pointer rounded"
                    />
                  </th>
                  <th className="py-3 px-3">User ID & Name</th>
                  <th className="py-3 px-3">Email Address</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Created Date</th>
                  <th className="py-3 px-3">Last Login</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 font-medium">
                      No matching user accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => {
                    const isSelected = selectedUserIds.includes(user.username);
                    const isLocked = user.status === 'Locked';
                    return (
                      <tr key={user.username} className={`hover:bg-orange-50/30 transition-all ${isSelected ? 'bg-orange-50/50' : ''}`}>
                        <td className="py-3.5 px-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelectUser(user.username)}
                            className="accent-orange-500 cursor-pointer rounded"
                          />
                        </td>
                        <td className="py-3.5 px-3">
                          <div className="font-bold text-slate-900">{user.username}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{user.id || 'usr-9021'}</div>
                        </td>
                        <td className="py-3.5 px-3 font-medium text-slate-700">{user.email}</td>
                        <td className="py-3.5 px-3 font-medium">
                          <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-800 border border-orange-200 font-mono text-[11px]">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border inline-flex items-center gap-1 ${
                            isLocked ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {isLocked ? <Lock className="w-3 h-3 text-rose-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            <span>{user.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono text-slate-500">{user.createdAt}</td>
                        <td className="py-3.5 px-3 font-mono text-slate-500">2026-07-26 09:12</td>
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => { setShowEditUser(user); setEditRole(user.role); }}
                              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                              title="Edit User"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            {isLocked ? (
                              <button
                                onClick={() => handleUnlockUser(user.username)}
                                className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-all"
                                title="Unlock Account"
                              >
                                <Unlock className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleLockUserManually(user.username)}
                                className="p-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-lg transition-all"
                                title="Lock Account (30s)"
                              >
                                <Lock className="w-3.5 h-3.5" />
                              </button>
                            )}

                            <button
                              onClick={() => setShowResetModal(user)}
                              className="p-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg transition-all"
                              title="Reset Password"
                            >
                              <KeyRound className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteUser(user.username)}
                              className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 text-slate-500 rounded-lg transition-all"
                              title="Delete User"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 2: DASHBOARD ANALYTICS */}
      {activeAdminSubTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Registered Users */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-orange-100 uppercase">Total Registered Users</span>
                <Users className="w-5 h-5 text-orange-200" />
              </div>
              <div className="text-3xl font-black font-mono">{totalUsersCount}</div>
              <span className="text-[11px] text-orange-100 font-medium block">+3 new registrations this week</span>
            </div>

            {/* Active Users */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-100 uppercase">Active Users</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-200" />
              </div>
              <div className="text-3xl font-black font-mono">{activeUsersCount}</div>
              <span className="text-[11px] text-emerald-100 font-medium block">All permissions validated</span>
            </div>

            {/* Locked Users */}
            <div className="bg-gradient-to-br from-rose-600 to-red-700 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-rose-100 uppercase">Locked Users</span>
                <Lock className="w-5 h-5 text-rose-200" />
              </div>
              <div className="text-3xl font-black font-mono">{lockedUsersCount}</div>
              <span className="text-[11px] text-rose-100 font-medium block">30s security lockout threshold</span>
            </div>

            {/* Admin Count */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-purple-100 uppercase">Admin Count</span>
                <ShieldCheck className="w-5 h-5 text-purple-200" />
              </div>
              <div className="text-3xl font-black font-mono">{adminUsersCount}</div>
              <span className="text-[11px] text-purple-100 font-medium block">Full system access permissions</span>
            </div>

            {/* Total Predictions */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-700 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-blue-100 uppercase">Total Predictions</span>
                <Zap className="w-5 h-5 text-blue-200" />
              </div>
              <div className="text-3xl font-black font-mono">14,280</div>
              <span className="text-[11px] text-blue-100 font-medium block">Inferences processed today</span>
            </div>

            {/* Average Model Accuracy */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-100 uppercase">Average Model Accuracy</span>
                <Brain className="w-5 h-5 text-amber-200" />
              </div>
              <div className="text-3xl font-black font-mono">96.4%</div>
              <span className="text-[11px] text-amber-100 font-medium block">XGBoost & K-Means benchmark</span>
            </div>

            {/* Total Revenue */}
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-teal-100 uppercase">Total Revenue</span>
                <DollarSign className="w-5 h-5 text-teal-200" />
              </div>
              <div className="text-3xl font-black font-mono">₹6,68,00,000</div>
              <span className="text-[11px] text-teal-100 font-medium block">Cumulative Indian franchise gross</span>
            </div>

            {/* API Response Time */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl p-5 shadow-md space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-300 uppercase">API Response Time</span>
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div className="text-3xl font-black font-mono">18 ms</div>
              <span className="text-[11px] text-slate-300 font-medium block">Sub-20ms edge latency</span>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: LOGIN SECURITY TESTER & ACCOUNT LOCK MONITOR */}
      {activeAdminSubTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" />
              <span>Login Security & 30s Account Lock Simulator</span>
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Test failed login attempts. On 5 consecutive failed attempts, the account will lock for <strong>30 seconds</strong>, the Login button will be disabled, and a live countdown timer will display.
            </p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Test Username/Email</label>
                <input
                  type="text"
                  value={testIdentifier}
                  onChange={(e) => setTestIdentifier(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Failed Attempts Counter</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        failedAttemptsCount >= 5 ? 'bg-rose-600' : failedAttemptsCount >= 3 ? 'bg-amber-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${(failedAttemptsCount / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900">{failedAttemptsCount} / 5</span>
                </div>
              </div>

              {isLockedOut ? (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Account locked. Try again in 30 seconds.</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-rose-800 text-center py-2 bg-white rounded-lg border border-rose-200 shadow-inner">
                    ⏳ 00:{lockTimerSeconds < 10 ? `0${lockTimerSeconds}` : lockTimerSeconds}
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleTestLoginAttempt(false)}
                    disabled={isLockedOut}
                    className="flex-1 py-2.5 px-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Simulate Wrong Password
                  </button>

                  <button
                    onClick={() => handleTestLoginAttempt(true)}
                    disabled={isLockedOut}
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Simulate Correct Login
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-orange-600" />
              <span>Active Security Rule Policies</span>
            </h3>
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">1. Consecutive Fail Threshold</strong>
                5 wrong password attempts trigger an immediate account lockout.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">2. Lock Duration</strong>
                Accounts unlock automatically after 30 seconds.
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <strong className="text-slate-900 block mb-1">3. Password Complexity Requirement</strong>
                Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ML MODEL CARD */}
      {activeAdminSubTab === 'model' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-bold mb-1">
                <Brain className="w-3.5 h-3.5 text-purple-600" />
                <span>Production Machine Learning Card</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">Franchise-Yield-XGBoost</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              Deployment Status: Active / Deployed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Model Name</span>
              <span className="text-sm font-bold text-slate-900">FranchiseOps AI Yield</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Training Accuracy</span>
              <span className="text-sm font-bold text-emerald-700 font-mono">97.8%</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Validation Accuracy</span>
              <span className="text-sm font-bold text-emerald-700 font-mono">96.4%</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">R² Score</span>
              <span className="text-sm font-bold text-blue-700 font-mono">0.948</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">RMSE Error</span>
              <span className="text-sm font-bold text-slate-900 font-mono">0.042</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">MAE Error</span>
              <span className="text-sm font-bold text-slate-900 font-mono">0.028</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Precision</span>
              <span className="text-sm font-bold text-purple-700 font-mono">0.961</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Recall</span>
              <span className="text-sm font-bold text-purple-700 font-mono">0.955</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">F1 Score</span>
              <span className="text-sm font-bold text-purple-700 font-mono">0.958</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Last Trained Date</span>
              <span className="text-sm font-bold text-slate-900 font-mono">2026-07-24</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Model Version</span>
              <span className="text-sm font-bold text-orange-700 font-mono">v2.4.1-prod</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Inference Time</span>
              <span className="text-sm font-bold text-emerald-700 font-mono">18 ms</span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: ACTIVITY LOGS */}
      {activeAdminSubTab === 'logs' && (
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>Recent System Activity Audit Logs</span>
          </h3>

          <div className="space-y-2.5">
            {activityLogs.map(log => (
              <div key={log.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-semibold text-slate-800">{log.text}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px] shrink-0">{log.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-orange-100 max-w-md w-full rounded-2xl shadow-xl p-6 relative animate-fade-in">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-orange-600" />
              <span>Add New Enterprise User</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (Username)</label>
                <input
                  type="text"
                  value={addFullName}
                  onChange={(e) => setAddFullName(e.target.value)}
                  placeholder="Rahul Sharma"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="rahul@franchise.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={addPassword}
                  onChange={(e) => setAddPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={addConfirmPassword}
                  onChange={(e) => setAddConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Real-time Password Rules Validation Indicator */}
              <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-[11px] space-y-1">
                <span className="font-bold text-slate-700 block">Real-time Password Validation:</span>
                <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                  <span className={pwHasMin ? 'text-emerald-700 font-bold' : 'text-slate-400'}>✓ Min 8 characters</span>
                  <span className={pwHasUpper ? 'text-emerald-700 font-bold' : 'text-slate-400'}>✓ Uppercase letter</span>
                  <span className={pwHasLower ? 'text-emerald-700 font-bold' : 'text-slate-400'}>✓ Lowercase letter</span>
                  <span className={pwHasNum ? 'text-emerald-700 font-bold' : 'text-slate-400'}>✓ Number (0-9)</span>
                  <span className={pwHasSpec ? 'text-emerald-700 font-bold col-span-2' : 'text-slate-400 col-span-2'}>✓ Special character (!@#$%^&*)</span>
                  <span className={pwMatches ? 'text-emerald-700 font-bold col-span-2' : 'text-rose-600 font-bold col-span-2'}>
                    {addConfirmPassword === '' ? '• Confirm Password matching' : pwMatches ? '✓ Passwords match!' : '✕ Passwords do not match'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={addRole}
                  onChange={(e) => setAddRole(e.target.value as EnterpriseRole)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Store Manager">Manager (Store Manager)</option>
                  <option value="Regional Operations Manager">Regional Operations Manager</option>
                  <option value="Franchise Owner">Franchise Owner</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUser && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-orange-100 max-w-md w-full rounded-2xl shadow-xl p-6 relative">
            <button onClick={() => setShowEditUser(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Edit Role for [{showEditUser.username}]</h3>
            <form onSubmit={handleSaveEditUser} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as EnterpriseRole)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                >
                  <option value="Admin">Admin</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Regional Operations Manager">Regional Operations Manager</option>
                  <option value="Franchise Owner">Franchise Owner</option>
                </select>
              </div>
              <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-orange-100 max-w-md w-full rounded-2xl shadow-xl p-6 relative">
            <button onClick={() => setShowResetModal(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Reset Password for [{showResetModal.username}]</h3>
            <form onSubmit={handleConfirmResetPw} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="New Password"
                value={resetPw}
                onChange={(e) => setResetPw(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={resetConfirmPw}
                onChange={(e) => setResetConfirmPw(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
              <button type="submit" className="w-full py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md">
                Confirm Reset Password
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
