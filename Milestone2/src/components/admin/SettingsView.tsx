import React, { useState } from 'react';
import { User } from '../../types';
import { 
  getStoredUsers, 
  saveUsersToStorage, 
  updateUserPassword, 
  validatePassword, 
  hashText 
} from '../../utils/authUtils';
import { 
  Settings, 
  KeyRound, 
  UserCheck, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Shield, 
  FileSpreadsheet,
  FileText
} from 'lucide-react';

interface SettingsViewProps {
  currentUser: User;
  onUpdateCurrentUser: (user: User) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ currentUser, onUpdateCurrentUser }) => {
  // Toast alert
  const [toastMsg, setToastMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile Form State
  const [username, setUsername] = useState(currentUser.username);
  const [email, setEmail] = useState(currentUser.email);

  // Password Form State
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmNewPw, setConfirmNewPw] = useState('');

  // Import JSON State
  const [importJsonRaw, setImportJsonRaw] = useState('');

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMsg({ type, text });
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) {
      showToast('error', 'Username and email cannot be empty.');
      return;
    }

    const users = getStoredUsers();
    const index = users.findIndex(u => u.username === currentUser.username || u.email === currentUser.email);
    if (index !== -1) {
      users[index].username = username.trim();
      users[index].email = email.trim();
      saveUsersToStorage(users);
      onUpdateCurrentUser(users[index]);
      showToast('success', 'Admin profile updated successfully.');
    } else {
      showToast('error', 'Failed to update profile.');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPw || !newPw || !confirmNewPw) {
      showToast('error', 'Please fill out all password fields.');
      return;
    }

    if (hashText(currentPw) !== currentUser.passwordHash) {
      showToast('error', 'Current password is incorrect.');
      return;
    }

    if (newPw !== confirmNewPw) {
      showToast('error', 'New passwords do not match.');
      return;
    }

    const valErr = validatePassword(newPw);
    if (valErr) {
      showToast('error', valErr);
      return;
    }

    const ok = updateUserPassword(currentUser.email, hashText(newPw));
    if (ok) {
      showToast('success', 'Admin password changed successfully!');
      setCurrentPw('');
      setNewPw('');
      setConfirmNewPw('');
    } else {
      showToast('error', 'Failed to update password.');
    }
  };

  // Export Users as JSON file
  const handleExportJSON = () => {
    const users = getStoredUsers();
    const jsonStr = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `franchiseops_users_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Exported users to JSON file successfully.');
  };

  // Export Users as CSV file
  const handleExportCSV = () => {
    const users = getStoredUsers();
    const headers = ['Username', 'Email', 'Role', 'Status', 'FailedAttempts', 'CreatedDate'];
    const rows = users.map(u => [u.username, u.email, u.role, u.status, u.failedAttempts, u.createdAt]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const a = document.createElement('a');
    a.href = encodedUri;
    a.download = `franchiseops_users_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('success', 'Exported users to CSV file successfully.');
  };

  // Import JSON Users
  const handleImportJSON = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importJsonRaw.trim()) {
      showToast('error', 'Please paste valid JSON formatted user records.');
      return;
    }

    try {
      const parsed = JSON.parse(importJsonRaw);
      if (Array.isArray(parsed)) {
        saveUsersToStorage(parsed);
        showToast('success', `Imported ${parsed.length} user accounts successfully!`);
        setImportJsonRaw('');
      } else {
        showToast('error', 'JSON format must be an array of user objects.');
      }
    } catch (err) {
      showToast('error', 'Invalid JSON syntax. Please check formatting.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className={`p-4 rounded-xl border text-xs sm:text-sm font-medium flex items-center justify-between shadow-xl animate-fade-in ${
          toastMsg.type === 'success'
            ? 'bg-emerald-950/90 border-emerald-500/60 text-emerald-200'
            : 'bg-rose-950/90 border-rose-500/60 text-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {toastMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> : <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            <span>{toastMsg.text}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm flex items-center gap-3">
        <Settings className="w-6 h-6 text-orange-600" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">System Settings & Data Backup</h2>
          <p className="text-xs text-slate-500">
            Configure admin security profile, credentials, and export/import system user databases.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Settings */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-orange-600" />
            <span>Admin Profile Configuration</span>
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Password Security */}
        <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-orange-600" />
            <span>Change Admin Password</span>
          </h3>

          <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Current Password</label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmNewPw}
                onChange={(e) => setConfirmNewPw(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all"
            >
              Update Admin Password
            </button>
          </form>
        </div>

      </div>

      {/* Export & Import Data Section */}
      <div className="bg-white border border-orange-100 rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Download className="w-5 h-5 text-orange-600" />
          <span>User Database Export & Import Management</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Export Actions */}
          <div className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Export User Accounts</h4>
            <p className="text-xs text-slate-500">
              Download complete user account records, roles, and status metadata for external backup or reporting.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleExportJSON}
                className="py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Export JSON File</span>
              </button>

              <button
                onClick={handleExportCSV}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Export CSV File</span>
              </button>
            </div>
          </div>

          {/* Import JSON Action */}
          <form onSubmit={handleImportJSON} className="bg-orange-50/50 p-5 rounded-xl border border-orange-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Import Users from JSON</h4>
            <textarea
              rows={3}
              value={importJsonRaw}
              onChange={(e) => setImportJsonRaw(e.target.value)}
              placeholder='Paste user JSON array e.g. [{"username": "alex", "email": "alex@ai", ...}]'
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 font-mono focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <Upload className="w-4 h-4 text-orange-400" />
              <span>Import & Replace Database</span>
            </button>
          </form>

        </div>
      </div>

    </div>
  );
};
