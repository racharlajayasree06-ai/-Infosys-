import React, { useState, useEffect } from 'react';
import { User, EnterpriseRole } from '../types';
import { 
  validatePassword, 
  getPasswordStrengthLabel, 
  hashText, 
  authenticateUser,
  registerUser,
  getStoredUsers,
  resetUserPassword
} from '../utils/authUtils';
import { 
  Shield, 
  KeyRound, 
  UserPlus, 
  LogIn, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Lock,
  Clock
} from 'lucide-react';

interface AuthPortalProps {
  onSuccessLogin: (user: User) => void;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({ onSuccessLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'reset'>('login');

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('infosys@ai');
  const [loginPassword, setLoginPassword] = useState('admin@123');
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [lockCountdown, setLockCountdown] = useState<number | null>(null);

  // OTP Cooldown state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpCooldown, setOtpCooldown] = useState<number>(0);
  const [otpMessage, setOtpMessage] = useState('');

  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPw, setShowRegPw] = useState(false);
  const [regRole, setRegRole] = useState<EnterpriseRole>('Franchise Owner');
  const [regQuestion, setRegQuestion] = useState('What is your pet name?');
  const [regAnswer, setRegAnswer] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Password reset state
  const [resetEmail, setResetEmail] = useState('');
  const [foundQuestion, setFoundQuestion] = useState<string | null>(null);
  const [resetAnswer, setResetAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  // Timer for lockout countdown
  useEffect(() => {
    if (lockCountdown === null || lockCountdown <= 0) return;
    const interval = setInterval(() => {
      setLockCountdown(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setLoginError('');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockCountdown]);

  // Timer for OTP cooldown countdown
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const interval = setInterval(() => {
      setOtpCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCooldown]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpMessage('OTP Sent Successfully');
    setOtpCooldown(30);
  };

  // Password strength checks
  const pwStrength = getPasswordStrengthLabel(regPassword);
  const newPwStrength = getPasswordStrengthLabel(newPassword);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');

    if (!loginIdentifier.trim() || !loginPassword) {
      setLoginError('Please enter both email/username and password.');
      return;
    }

    const result = authenticateUser(loginIdentifier, loginPassword);

    if (result.success && result.user) {
      setLoginSuccess(result.message);
      setTimeout(() => {
        onSuccessLogin(result.user!);
      }, 500);
    } else {
      setLoginError(result.message);
      if (result.remainingLockSeconds) {
        setLockCountdown(result.remainingLockSeconds);
      }
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    if (!regUsername || !regEmail || !regPassword || !regConfirmPassword || !regAnswer) {
      setRegError('Please fill out all registration fields.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    const validationErr = validatePassword(regPassword);
    if (validationErr) {
      setRegError(validationErr);
      return;
    }

    const res = registerUser({
      username: regUsername.trim(),
      email: regEmail.trim(),
      passwordHash: hashText(regPassword),
      securityQuestion: regQuestion,
      securityAnswerHash: hashText(regAnswer.toLowerCase().trim()),
      role: regRole,
      createdAt: new Date().toISOString().split('T')[0]
    });

    if (res.success) {
      setRegSuccess(res.message);
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegAnswer('');
    } else {
      setRegError(res.message);
    }
  };

  const handleFetchQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    setFoundQuestion(null);

    if (!resetEmail) {
      setResetError('Please enter your registered email.');
      return;
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === resetEmail.trim().toLowerCase());
    if (user) {
      setFoundQuestion(user.securityQuestion);
    } else {
      setResetError('Email not found in our user database.');
    }
  };

  const handleConfirmReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!resetAnswer || !newPassword || !confirmNewPassword) {
      setResetError('Please complete all reset fields.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setResetError('Passwords do not match.');
      return;
    }

    const validationErr = validatePassword(newPassword);
    if (validationErr) {
      setResetError(validationErr);
      return;
    }

    const users = getStoredUsers();
    const user = users.find(u => u.email.toLowerCase() === resetEmail.trim().toLowerCase());
    if (!user) {
      setResetError('User account not found.');
      return;
    }

    if (user.securityAnswerHash === hashText(resetAnswer.toLowerCase().trim())) {
      const updated = resetUserPassword(resetEmail.trim(), hashText(newPassword));
      if (updated) {
        setResetSuccess('Password reset successfully! Account unlocked. You can now Sign In.');
        setFoundQuestion(null);
        setResetAnswer('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setResetError('Failed to reset password.');
      }
    } else {
      setResetError('Incorrect security answer.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 text-slate-800 flex flex-col justify-center items-center p-4 sm:p-6">
      
      {/* Top Title & Logo */}
      <div className="text-center max-w-md w-full mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500 text-white text-3xl mb-3 shadow-lg shadow-orange-500/30">
          ⚡
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-1">
          FranchiseOps AI Portal
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          Enterprise Multi-Agent Franchise Intelligence & Control Center
        </p>
      </div>

      {/* Centered Login Card */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-2xl border border-orange-100 shadow-xl shadow-orange-950/5 p-6 sm:p-8">
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-orange-50 p-1.5 rounded-xl mb-6 border border-orange-100 text-xs sm:text-sm font-semibold">
          <button
            onClick={() => { setActiveTab('login'); setLoginError(''); setLoginSuccess(''); }}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'login'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-600 hover:bg-white/80'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            onClick={() => { setActiveTab('register'); setRegError(''); setRegSuccess(''); }}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'register'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-600 hover:bg-white/80'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </button>

          <button
            onClick={() => { setActiveTab('reset'); setResetError(''); setResetSuccess(''); }}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'reset'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:text-orange-600 hover:bg-white/80'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Reset</span>
          </button>
        </div>

        {/* TAB 1: SIGN IN */}
        {activeTab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-start gap-2.5 shadow-sm">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">{loginError}</p>
                  {lockCountdown !== null && lockCountdown > 0 && (
                    <div className="mt-2 flex items-center gap-1.5 text-amber-800 font-mono font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200 w-fit">
                      <Clock className="w-3.5 h-3.5 animate-spin text-amber-600" />
                      <span>Unlock Countdown: {lockCountdown}s</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {loginSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{loginSuccess}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Username or Email Address
              </label>
              <input
                type="text"
                value={loginIdentifier}
                onChange={(e) => setLoginIdentifier(e.target.value)}
                placeholder="infosys@ai"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setActiveTab('reset'); setResetError(''); setResetSuccess(''); }}
                  className="text-[11px] text-orange-600 hover:text-orange-700 font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showLoginPw ? 'text' : 'password'}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw(!showLoginPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showLoginPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={lockCountdown !== null && lockCountdown > 0}
              className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed active:bg-orange-700 text-white font-semibold text-sm rounded-xl shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In to Portal</span>
            </button>

            {/* OTP Verification & Cooldown Section */}
            <div className="pt-3 border-t border-orange-100 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-700">Two-Factor OTP Verification:</span>
                {otpMessage && (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ {otpMessage}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="6-Digit OTP (e.g. 849201)"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpCooldown > 0}
                  className="px-3 py-2 bg-slate-100 hover:bg-orange-50 text-slate-800 hover:text-orange-700 disabled:opacity-50 border border-slate-200 font-semibold text-xs rounded-xl transition-all shrink-0 min-w-[150px] text-center"
                >
                  {otpCooldown > 0 ? (
                    <span className="text-orange-700 font-mono font-bold">Resend OTP in {otpCooldown}s</span>
                  ) : (
                    <span>{otpSent ? 'Resend OTP' : 'Send OTP'}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials */}
            <div className="mt-4 pt-4 border-t border-orange-100 text-center">
              <p className="text-xs text-slate-500 mb-2">Default Admin Account Credentials:</p>
              <div className="bg-orange-50/80 p-2.5 rounded-lg border border-orange-200 text-xs font-mono text-orange-900 flex justify-between items-center">
                <span>Email: <strong className="text-orange-950">infosys@ai</strong></span>
                <span>PW: <strong className="text-orange-950">admin@123</strong></span>
              </div>
            </div>
          </form>
        )}

        {/* TAB 2: REGISTER ACCOUNT */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            {regError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{regError}</span>
              </div>
            )}

            {regSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{regSuccess}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Username</label>
              <input
                type="text"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                placeholder="johndoe"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                placeholder="john@franchise.com"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">Create Password</label>
                {regPassword && (
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${pwStrength.color}`}>
                    {pwStrength.badge}
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showRegPw ? 'text' : 'password'}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPw(!showRegPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showRegPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* Password Validation Rules Guide */}
            <div className="p-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-[11px] text-slate-600 space-y-1">
              <p className="font-semibold text-slate-700">Password Rules:</p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
                <span className={regPassword.length >= 8 ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  ✓ Min 8 characters
                </span>
                <span className={/[A-Z]/.test(regPassword) ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  ✓ Uppercase letter
                </span>
                <span className={/[a-z]/.test(regPassword) ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  ✓ Lowercase letter
                </span>
                <span className={/\d/.test(regPassword) ? 'text-emerald-600 font-semibold' : 'text-slate-400'}>
                  ✓ Number (0-9)
                </span>
                <span className={/[!@#$%^&*(),.?":{}|<>]/.test(regPassword) ? 'text-emerald-600 font-semibold col-span-2' : 'text-slate-400 col-span-2'}>
                  ✓ Special character (!@#$%^&*)
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Enterprise Role</label>
              <select
                value={regRole}
                onChange={(e) => setRegRole(e.target.value as EnterpriseRole)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="Franchise Owner">Franchise Owner</option>
                <option value="Regional Operations Manager">Regional Operations Manager</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Supply Chain Analyst">Supply Chain Analyst</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Security Question</label>
              <select
                value={regQuestion}
                onChange={(e) => setRegQuestion(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              >
                <option value="What is your pet name?">What is your pet name?</option>
                <option value="What city were you born in?">What city were you born in?</option>
                <option value="What is your favorite school teacher's name?">What is your favorite school teacher's name?</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Security Answer</label>
              <input
                type="text"
                value={regAnswer}
                onChange={(e) => setRegAnswer(e.target.value)}
                placeholder="e.g., Buddy"
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Create Account</span>
            </button>
          </form>
        )}

        {/* TAB 3: RESET PASSWORD */}
        {activeTab === 'reset' && (
          <div className="space-y-4">
            {resetError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{resetError}</span>
              </div>
            )}

            {resetSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{resetSuccess}</span>
              </div>
            )}

            <form onSubmit={handleFetchQuestion} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="infosys@ai"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-semibold text-xs rounded-xl transition-all"
              >
                Verify Email & Fetch Security Question
              </button>
            </form>

            {foundQuestion && (
              <form onSubmit={handleConfirmReset} className="space-y-3 pt-3 border-t border-orange-100">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-xs text-orange-900">
                  <span className="font-semibold block text-orange-700 mb-0.5">Security Question:</span>
                  <strong>{foundQuestion}</strong>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enter Security Answer
                  </label>
                  <input
                    type="text"
                    value={resetAnswer}
                    onChange={(e) => setResetAnswer(e.target.value)}
                    placeholder="Your answer"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
                >
                  Confirm Password Reset & Unlock
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
