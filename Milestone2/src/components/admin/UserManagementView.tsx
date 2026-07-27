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
  hashText 
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
  X
} from 'lucide-react';

export const UserManagementView: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState<User | null>(null);

  // Success / Error notification
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New user form state
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newConfirmPassword, setNewConfirmPassword] = useState('');
  const [newRole, setNewRole] = useState<EnterpriseRole>('Store Manager');

  // Password reset form state
  const [resetPw, setResetPw] = useState('');
  const [resetConfirmPw, setResetConfirmPw] = useState('');

  const reloadUsers = () => {
    setUsers(getStoredUsers());
  };

  useEffect(() => {
    reloadUsers();
  }, []);

  const triggerToast = (type: 'success' | 'error', text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUsername || !newEmail || !newPassword || !newConfirmPassword) {
      triggerToast('error', 'Please fill out all user creation fields.');
      return;
    }

    if (newPassword !== newConfirmPassword) {
      triggerToast('error', 'Passwords do not match.');
      return;
    }

    const valErr = validatePassword(newPassword);
    if (valErr) {
      triggerToast('error', valErr);
      return;
    }

    const res = registerUser({
      username: newUsername.trim(),
      email: newEmail.trim(),
      passwordHash: hashText(newPassword),
      securityQuestion: 'What is your pet name?',
      securityAnswerHash: hashText('admin'),
      role: newRole,
      createdAt: new Date().toISOString().split('T')[0]
    });

    if (res.success) {
      triggerToast('success', res.message);
      setShowAddModal(false);
      setNewUsername('');
      setNewEmail('');
      setNewPassword('');
      setNewConfirmPassword('');
      reloadUsers();
    } else {
      triggerToast('error', res.message);
    }
  };

  const handleUnlock = (username: string) => {
    const ok = unlockUserAccount(username);
    if (ok) {
      triggerToast('success', `Unlocked account for user [${username}]. Failed attempts reset to 0.`);
      reloadUsers();
    } else {
      triggerToast('error', 'Failed to unlock account.');
    }
  };

  const handleDelete = (username: string) => {
    if (window.confirm(`Are you sure you want to permanently delete user "${username}"?`)) {
      const ok = deleteUserAccount(username);
      if (ok) {
        triggerToast('success', `User [${username}] deleted successfully.`);
        reloadUsers();
      } else {
        triggerToast('error', 'Failed to delete user.');
      }
    }
  };

  const handleConfirmResetPw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showResetModal) return;

    if (!resetPw || !resetConfirmPw) {
      triggerToast('error', 'Please fill out both password fields.');
      return;
    }

    if (resetPw !== resetConfirmPw) {
      triggerToast('error', 'Passwords do not match.');
      return;
    }

    const valErr = validatePassword(resetPw);
    if (valErr) {
      triggerToast('error', valErr);
      return;
    }

    const ok = resetUserPassword(showResetModal.email, hashText(resetPw));
    if (ok) {
      triggerToast('success', `Password reset successfully for user [${showResetModal.username}].`);
      setShowResetModal(null);
      setResetPw('');
      setResetConfirmPw('');
      reloadUsers();
    } else {
      triggerToast('error', 'Failed to reset password.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between shadow-md animate-fade-in ${
          toastMsg.type === 'success'
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2">
            {toastMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />}
            <span>{toastMsg.text}</span>
          </div>
          <button onClick={() => setToastMsg(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header Controls */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-orange-600" />
            <h2 className="text-xl font-bold text-slate-900">Enterprise User Management</h2>
          </div>
          <p className="text-xs text-slate-500">
            View, create, unlock, and manage system user accounts and security statuses.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Search Field */}
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, role, email..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="py-2 px-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white border border-orange-100 rounded-2xl shadow-sm overflow-x-auto p-4 sm:p-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-orange-100 bg-orange-50/50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-3">Username & Email</th>
              <th className="py-3 px-3">Role</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Failed Attempts</th>
              <th className="py-3 px-3">Account Locked</th>
              <th className="py-3 px-3">Created Date</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 font-medium">
                  No matching user accounts found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => {
                const isCurrentlyLocked = user.status === 'Locked';
                return (
                  <tr key={user.username} className="hover:bg-orange-50/30 transition-all">
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-slate-900">{user.username}</div>
                      <div className="text-[11px] text-slate-500">{user.email}</div>
                    </td>
                    <td className="py-3.5 px-3 font-medium">
                      <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200 font-mono text-[11px]">
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border flex items-center gap-1 w-fit ${
                        isCurrentlyLocked
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        {isCurrentlyLocked ? <Lock className="w-3 h-3 text-rose-600" /> : <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        <span>{user.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-700">
                      {user.failedAttempts} / 3
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-500">
                      {isCurrentlyLocked ? (
                        <span className="text-rose-600 font-bold">Yes (30s Lockout)</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-500">
                      {user.createdAt}
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {isCurrentlyLocked && (
                          <button
                            onClick={() => handleUnlock(user.username)}
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg transition-all"
                            title="Unlock Account"
                          >
                            <Unlock className="w-3.5 h-3.5" />
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
                          onClick={() => handleDelete(user.username)}
                          className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-200 text-slate-500 rounded-lg transition-all"
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

      {/* Add New User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-orange-100 max-w-md w-full rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-orange-600" />
              <span>Create New Enterprise User</span>
            </h3>

            <form onSubmit={handleAddUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="alex_manager"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="alex@franchise.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={newConfirmPassword}
                  onChange={(e) => setNewConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as EnterpriseRole)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Franchise Owner">Franchise Owner</option>
                  <option value="Regional Operations Manager">Regional Operations Manager</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Supply Chain Analyst">Supply Chain Analyst</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-orange-100 max-w-md w-full rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowResetModal(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-orange-600" />
              <span>Reset Password for [{showResetModal.username}]</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Set a new password for user email: {showResetModal.email}</p>

            <form onSubmit={handleConfirmResetPw} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={resetPw}
                  onChange={(e) => setResetPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={resetConfirmPw}
                  onChange={(e) => setResetConfirmPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(null)}
                  className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
