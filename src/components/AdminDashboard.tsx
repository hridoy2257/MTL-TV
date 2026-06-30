import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { Settings, LogOut, Loader2, Save } from 'lucide-react';

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [csvUrl, setCsvUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoadingAuth(false);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (user) {
      // Load current settings
      const loadSettings = async () => {
        try {
          const docSnap = await getDoc(doc(db, 'settings', 'sports'));
          if (docSnap.exists() && docSnap.data().csvUrl) {
            setCsvUrl(docSnap.data().csvUrl);
          }
        } catch (err) {
          console.error("Error loading settings:", err);
        }
      };
      loadSettings();
    }
  }, [user]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to login');
    }
    setIsAuthenticating(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const handleSaveCsv = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      await setDoc(doc(db, 'settings', 'sports'), { csvUrl }, { merge: true });
      setSaveMessage('CSV link updated successfully!');
    } catch (err: any) {
      setSaveMessage('Error saving: ' + err.message);
    }
    setIsSaving(false);
  };

  if (isLoadingAuth) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-cyan-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Admin Login</h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
            </div>
            {authError && <p className="text-red-400 text-sm font-medium">{authError}</p>}
            <button 
              type="submit"
              disabled={isAuthenticating}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAuthenticating && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign In
            </button>
            <p className="text-xs text-slate-500 text-center mt-4">
              Note: You need to create a user in Firebase Authentication manually in the Firebase Console.
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-500" />
            Admin Dashboard
          </h2>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-950"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-200 mb-2">Dynamic Channels Data Source</h3>
            <p className="text-slate-400 text-sm mb-4">
              Update the external Google Sheet CSV URL for live TV channels. The CSV must have the following headers: 
              <code className="text-xs bg-slate-950 px-1.5 py-0.5 rounded text-cyan-400 ml-1">name, url, category, logo</code>.
            </p>
            
            <label className="block text-sm font-medium text-slate-300 mb-1">CSV Google Sheet URL</label>
            <input 
              type="url" 
              value={csvUrl}
              onChange={(e) => setCsvUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/.../pub?output=csv"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-2">To get this URL, go to your Google Sheet -&gt; File -&gt; Share -&gt; Publish to web -&gt; select CSV.</p>
          </div>
          
          <div className="pt-2 flex items-center gap-4">
            <button 
              onClick={handleSaveCsv}
              disabled={isSaving}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Configuration
            </button>
            
            {saveMessage && (
              <p className={`text-sm font-medium ${saveMessage.includes('Error') ? "text-red-400" : "text-green-400"}`}>
                {saveMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
