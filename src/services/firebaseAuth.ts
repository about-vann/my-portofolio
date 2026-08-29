import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App singleton safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.appdata'
];

const provider = new GoogleAuthProvider();
// Attach all drive scopes
DRIVE_SCOPES.forEach(scope => provider.addScope(scope));

// In-memory token management (strictly not stored in localStorage / sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Global auth listeners callback registry
type AuthChangeCallback = (user: User | null, token: string | null) => void;
const authListeners: Set<AuthChangeCallback> = new Set();

export const subscribeToAuth = (callback: AuthChangeCallback): (() => void) => {
  authListeners.add(callback);
  // Send initial state immediately
  callback(auth.currentUser, cachedAccessToken);
  return () => authListeners.delete(callback);
};

// Initialize auth state listener
onAuthStateChanged(auth, async (user: User | null) => {
  if (!user) {
    cachedAccessToken = null;
  }
  authListeners.forEach(cb => cb(user, cachedAccessToken));
});

export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Failed to acquire OAuth access token for Google Drive');
    }

    cachedAccessToken = credential.accessToken;
    authListeners.forEach(cb => cb(result.user, cachedAccessToken));
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const googleSignOut = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
  authListeners.forEach(cb => cb(null, null));
};
