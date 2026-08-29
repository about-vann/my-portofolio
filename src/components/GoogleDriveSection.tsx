import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HardDrive, 
  Cloud, 
  Search, 
  Upload, 
  FolderPlus, 
  RefreshCw, 
  Trash2, 
  ExternalLink, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  FileCode, 
  Folder, 
  AlertTriangle, 
  CheckCircle2, 
  LogOut, 
  Plus, 
  Database,
  File,
  ShieldCheck,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { User } from 'firebase/auth';
import { ThemeAccent, Language } from '../types';
import { 
  googleSignIn, 
  googleSignOut, 
  subscribeToAuth, 
  getAccessToken 
} from '../services/firebaseAuth';
import { 
  DriveFile, 
  DriveQuota, 
  fetchDriveAbout, 
  listDriveFiles, 
  uploadFileToDrive, 
  createDriveFolder, 
  deleteDriveFile, 
  formatBytes 
} from '../services/googleDriveService';
import { PERSONAL_INFO } from '../data/portfolioData';

interface GoogleDriveSectionProps {
  accent: ThemeAccent;
  lang: Language;
}

export const GoogleDriveSection: React.FC<GoogleDriveSectionProps> = ({ accent, lang }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Drive state
  const [quota, setQuota] = useState<DriveQuota | null>(null);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Modals & Action States
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Deletion Confirmation Dialog State (Mandatory Workspace Skill Rule)
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth((authUser, authToken) => {
      setUser(authUser);
      setToken(authToken);
      if (authToken) {
        loadDriveData(authToken);
      } else {
        setQuota(null);
        setFiles([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadDriveData = async (authToken: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const [aboutData, filesData] = await Promise.all([
        fetchDriveAbout(authToken).catch(err => {
          console.warn('Could not fetch about info:', err);
          return null;
        }),
        listDriveFiles(authToken, { pageSize: 30 })
      ]);

      if (aboutData) setQuota(aboutData);
      setFiles(filesData.files);
    } catch (err: any) {
      console.error('Error loading Google Drive data:', err);
      setAuthError(err.message || 'Gagal memuat berkas dari Google Drive.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      const { accessToken } = await googleSignIn();
      await loadDriveData(accessToken);
    } catch (err: any) {
      console.error('Google Drive sign in failed:', err);
      setAuthError(err.message || 'Otorisasi Google Drive dibatalkan atau gagal.');
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setUser(null);
    setToken(null);
    setQuota(null);
    setFiles([]);
  };

  const handleRefresh = async () => {
    const currentToken = token || (await getAccessToken());
    if (currentToken) {
      await loadDriveData(currentToken);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return;
    const currentToken = token || (await getAccessToken());
    if (!currentToken) return;

    try {
      setIsLoading(true);
      await createDriveFolder(currentToken, folderName.trim());
      setFolderName('');
      setIsCreateFolderModalOpen(false);
      await loadDriveData(currentToken);
    } catch (err: any) {
      alert(`Gagal membuat folder: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;
    const currentToken = token || (await getAccessToken());
    if (!currentToken) return;

    setUploading(true);
    try {
      await uploadFileToDrive(currentToken, fileToUpload, fileToUpload.name, fileToUpload.type || 'application/octet-stream');
      setUploadSuccessMessage(lang === 'id' ? `Berhasil mengunggah ${fileToUpload.name}!` : `Successfully uploaded ${fileToUpload.name}!`);
      setFileToUpload(null);
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadSuccessMessage(null);
      }, 1500);
      await loadDriveData(currentToken);
    } catch (err: any) {
      alert(`Upload error: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  // Quick action: Export Portfolio Dossier to Google Drive
  const handleExportPortfolioDossier = async () => {
    const currentToken = token || (await getAccessToken());
    if (!currentToken) return;

    setIsLoading(true);
    try {
      const dossierContent = `# ${PERSONAL_INFO.name} — Full-Stack Technical Dossier & Portfolio
**Role:** ${PERSONAL_INFO.title.en}
**Email:** ${PERSONAL_INFO.email}
**Location:** ${PERSONAL_INFO.location}
**GitHub:** ${PERSONAL_INFO.github}
**LinkedIn:** ${PERSONAL_INFO.linkedin}

---

## Executive Summary
${PERSONAL_INFO.bio.philosophy.en}

${PERSONAL_INFO.bio.background.en}

---

## Core Competencies & Architecture
- Enterprise Full-Stack Engineering (React, TypeScript, Node.js, Express, Go)
- High-Throughput Cloud & Telemetry Systems
- AI & LLM Systems Integration (Google GenAI, Gemini API, Function Calling)
- Mission-Critical Microservices, PostgreSQL, Firestore & Real-Time WebSockets

---
*Generated via Google Drive Portfolio Integration System on ${new Date().toISOString()}*
`;
      const blob = new Blob([dossierContent], { type: 'text/markdown' });
      await uploadFileToDrive(currentToken, blob, `Raden_Maulana_Portfolio_Dossier_${new Date().getFullYear()}.md`, 'text/markdown');
      await loadDriveData(currentToken);
      alert(lang === 'id' ? 'Dossier portofolio berhasil disimpan ke Google Drive Anda!' : 'Portfolio Dossier successfully saved to your Google Drive!');
    } catch (err: any) {
      alert(`Gagal mengekspor: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Confirmed Deletion (strictly requires user confirmation dialog)
  const confirmDeleteFile = async () => {
    if (!fileToDelete) return;
    const currentToken = token || (await getAccessToken());
    if (!currentToken) return;

    setIsDeleting(true);
    try {
      await deleteDriveFile(currentToken, fileToDelete.id);
      setFiles(prev => prev.filter(f => f.id !== fileToDelete.id));
      setFileToDelete(null);
    } catch (err: any) {
      alert(`Gagal menghapus berkas: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered files logic
  const filteredFiles = files.filter(f => {
    const matchesSearch = !searchQuery.trim() || 
      f.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'documents') {
      return f.mimeType.includes('document') || f.mimeType.includes('text') || f.mimeType.includes('pdf');
    }
    if (activeCategory === 'spreadsheets') {
      return f.mimeType.includes('sheet') || f.mimeType.includes('csv');
    }
    if (activeCategory === 'images') {
      return f.mimeType.includes('image');
    }
    if (activeCategory === 'folders') {
      return f.mimeType === 'application/vnd.google-apps.folder';
    }

    return true;
  });

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-amber-400" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
    }
    if (mimeType.includes('document') || mimeType.includes('pdf') || mimeType.includes('text')) {
      return <FileText className="w-5 h-5 text-sky-400" />;
    }
    if (mimeType.includes('image')) {
      return <FileImage className="w-5 h-5 text-purple-400" />;
    }
    if (mimeType.includes('json') || mimeType.includes('javascript') || mimeType.includes('typescript')) {
      return <FileCode className="w-5 h-5 text-rose-400" />;
    }
    return <File className="w-5 h-5 text-zinc-400" />;
  };

  // Calculate storage usage percentage
  const usageNum = quota?.usage ? parseInt(quota.usage, 10) : 0;
  const limitNum = quota?.limit ? parseInt(quota.limit, 10) : 0;
  const usagePercentage = limitNum > 0 ? Math.min(100, Math.round((usageNum / limitNum) * 100)) : 0;

  return (
    <motion.section 
      id="google-drive"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-6 sm:px-12 max-w-7xl mx-auto relative z-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-500">
              {lang === 'id' ? '07 // INTEGRASI CLOUD GOOGLE DRIVE' : '07 // GOOGLE DRIVE WORKSPACE INTEGRATION'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light font-['Poppins'] text-white">
            {lang === 'id' ? 'Google Drive Cloud Hub' : 'Google Drive Cloud Hub'}
          </h2>
          <div className="h-[1px] w-24 bg-white/20 mt-3" />
        </div>

        <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
          {lang === 'id'
            ? 'Integrasi real-time Google Workspace untuk menjelajahi berkas, mengunggah portofolio dossier, dan mengelola dokumen cloud langsung dari aplikasi.'
            : 'Real-time Google Workspace integration to browse cloud assets, export technical dossiers, and synchronize files directly.'}
        </p>
      </div>

      {/* Unauthenticated State: Sign in with Google */}
      {!user || !token ? (
        <div className="p-8 sm:p-12 rounded-sm bg-[#080808] border border-white/10 text-center space-y-6 max-w-2xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-sm bg-[#050505] border border-white/10 flex items-center justify-center mx-auto text-white">
            <HardDrive className="w-8 h-8 text-zinc-300" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-light text-white font-['Poppins']">
              {lang === 'id' ? 'Hubungkan Akun Google Drive Anda' : 'Connect Your Google Drive'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-lg mx-auto">
              {lang === 'id'
                ? 'Akses berkas Google Drive, sinkronkan materi portofolio, dan kelola dokumen cloud dengan izin otorisasi Google OAuth resmi.'
                : 'Access your Google Drive files, upload technical dossiers, and organize cloud documents with official Google OAuth permission.'}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-sm bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Official Sign in with Google Button */}
          <div className="pt-2 flex justify-center">
            <button 
              id="google-signin-btn"
              onClick={handleSignIn}
              disabled={isSigningIn}
              className="group relative inline-flex items-center gap-3 px-6 py-3 bg-white text-zinc-900 rounded-sm font-medium text-xs sm:text-sm shadow-md hover:bg-zinc-100 hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
            >
              {/* Google G Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              <span className="font-semibold tracking-wide">
                {isSigningIn 
                  ? (lang === 'id' ? 'Menghubungkan Otorisasi...' : 'Connecting OAuth...')
                  : (lang === 'id' ? 'Masuk dengan Google' : 'Sign in with Google')}
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>Secure In-Memory OAuth Flow // No Secret Storage</span>
          </div>
        </div>
      ) : (
        /* Authenticated State: Google Drive Dashboard & Explorer */
        <div className="space-y-6">
          
          {/* User Profile & Quota Telemetry Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Account Info */}
            <div className="p-5 rounded-sm bg-[#080808] border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Google User'} 
                    className="w-10 h-10 rounded-full border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-sm bg-zinc-800 flex items-center justify-center text-white">
                    <UserCheck className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-semibold text-white tracking-wide">{user.displayName || 'Google Account'}</h4>
                  <p className="text-[11px] text-zinc-400 font-mono truncate max-w-[180px]">{user.email}</p>
                </div>
              </div>

              <button
                id="signout-drive-btn"
                onClick={handleSignOut}
                className="p-2 rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title={lang === 'id' ? 'Putus Koneksi Google' : 'Disconnect Google'}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Storage Quota */}
            <div className="p-5 rounded-sm bg-[#080808] border border-white/5 space-y-2 md:col-span-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5">
                  <Cloud className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Google Drive Storage Quota</span>
                </span>
                <span className="text-white font-bold">
                  {formatBytes(quota?.usage)} / {quota?.limit ? formatBytes(quota.limit) : 'Unlimited'} ({usagePercentage}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#050505] rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-white transition-all duration-500"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                <span>In Drive: {formatBytes(quota?.usageInDrive)}</span>
                <span>Trash: {formatBytes(quota?.usageInDriveTrash)}</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar: Search, Filters, Quick Actions */}
          <div className="p-5 rounded-sm bg-[#080808] border border-white/5 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'id' ? 'Cari berkas di Google Drive...' : 'Search Google Drive files...'}
                  className="w-full pl-9 pr-4 py-2 rounded-sm bg-[#050505] border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                  title="Segarkan Berkas"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span className="font-mono text-[10px] uppercase">Refresh</span>
                </button>

                <button
                  onClick={() => setIsCreateFolderModalOpen(true)}
                  className="px-3 py-2 rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase">{lang === 'id' ? 'Folder Baru' : 'New Folder'}</span>
                </button>

                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="px-3 py-2 rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px] uppercase">{lang === 'id' ? 'Unggah Berkas' : 'Upload File'}</span>
                </button>

                <button
                  onClick={handleExportPortfolioDossier}
                  disabled={isLoading}
                  className="px-3.5 py-2 rounded-sm bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="font-mono text-[10px]">{lang === 'id' ? 'Simpan CV Dossier ke Drive' : 'Sync Dossier to Drive'}</span>
                </button>
              </div>
            </div>

            {/* Filter Category Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              {[
                { id: 'all', label: lang === 'id' ? 'Semua Berkas' : 'All Files' },
                { id: 'documents', label: lang === 'id' ? 'Dokumen & PDF' : 'Docs & PDFs' },
                { id: 'spreadsheets', label: lang === 'id' ? 'Spreadsheet' : 'Spreadsheets' },
                { id: 'images', label: lang === 'id' ? 'Gambar' : 'Images' },
                { id: 'folders', label: lang === 'id' ? 'Folder' : 'Folders' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider rounded-sm transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-white text-black font-bold'
                      : 'bg-[#050505] text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Files List Explorer */}
          <div className="rounded-sm bg-[#080808] border border-white/5 overflow-hidden">
            {isLoading ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-mono text-zinc-400">
                  {lang === 'id' ? 'Sinkronisasi berkas Google Drive...' : 'Synchronizing Google Drive files...'}
                </p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Database className="w-8 h-8 text-zinc-600 mx-auto" />
                <p className="text-xs font-mono text-zinc-400">
                  {searchQuery ? (lang === 'id' ? 'Tidak ada berkas yang cocok dengan pencarian.' : 'No files matched your query.') : (lang === 'id' ? 'Tidak ada berkas di kategori ini.' : 'No files found in this category.')}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-4 hover:bg-[#0c0c0c] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="p-2 rounded-sm bg-[#050505] border border-white/5 shrink-0">
                        {getFileIcon(file.mimeType)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-medium text-white truncate max-w-sm sm:max-w-md group-hover:text-zinc-200">
                            {file.name}
                          </h4>
                          {file.shared && (
                            <span className="px-1.5 py-0.5 text-[8px] font-mono bg-zinc-800 text-zinc-400 rounded-sm">
                              SHARED
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-zinc-500 mt-0.5">
                          {file.size && <span>{formatBytes(file.size)}</span>}
                          {file.modifiedTime && (
                            <span>{new Date(file.modifiedTime).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* File Controls */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      {file.webViewLink && (
                        <a
                          href={file.webViewLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="Buka di Google Drive"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Explicit User Confirmation for Deletion (MANDATORY Skill Rule) */}
                      <button
                        onClick={() => setFileToDelete(file)}
                        className="p-2 rounded-sm bg-[#050505] hover:bg-rose-950/60 hover:text-rose-400 border border-white/10 text-zinc-500 transition-colors cursor-pointer"
                        title="Hapus Berkas dari Drive"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* Mandatory User Confirmation Dialog for File Deletion */}
      <AnimatePresence>
        {fileToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-rose-900/50 rounded-sm p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-rose-400">
                <AlertTriangle className="w-6 h-6 shrink-0" />
                <h3 className="text-base font-semibold text-white">
                  {lang === 'id' ? 'Konfirmasi Penghapusan Berkas' : 'Confirm File Deletion'}
                </h3>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {lang === 'id'
                  ? `Apakah Anda yakin ingin menghapus berkas "${fileToDelete.name}" dari Google Drive Anda? Tindakan ini akan memindahkan berkas ke folder sampah Google Drive.`
                  : `Are you sure you want to delete "${fileToDelete.name}" from your Google Drive? This action will move the file to your Google Drive trash.`}
              </p>

              <div className="p-3 rounded-sm bg-[#050505] border border-white/5 font-mono text-[11px] text-zinc-400">
                <span className="block text-white font-medium truncate">{fileToDelete.name}</span>
                <span>ID: {fileToDelete.id}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-300"
                >
                  {lang === 'id' ? 'Batal' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteFile}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold rounded-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 shadow-md disabled:opacity-50"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{lang === 'id' ? 'Menghapus...' : 'Deleting...'}</span>
                    </>
                  ) : (
                    <span>{lang === 'id' ? 'Ya, Hapus' : 'Delete File'}</span>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Upload File Modal */}
      <AnimatePresence>
        {isUploadModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-semibold text-white font-['Poppins'] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-zinc-300" />
                  <span>{lang === 'id' ? 'Unggah Berkas ke Google Drive' : 'Upload File to Google Drive'}</span>
                </h3>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              {uploadSuccessMessage ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-mono text-white">{uploadSuccessMessage}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Dropzone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      if (e.dataTransfer.files?.[0]) {
                        setFileToUpload(e.dataTransfer.files[0]);
                      }
                    }}
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-6 border-2 border-dashed rounded-sm text-center cursor-pointer transition-colors ${
                      dragOver ? 'border-white bg-zinc-900/50' : 'border-white/10 hover:border-white/30 bg-[#050505]'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.[0]) setFileToUpload(e.target.files[0]);
                      }}
                    />
                    <Upload className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
                    <p className="text-xs text-zinc-300 font-medium">
                      {fileToUpload ? fileToUpload.name : (lang === 'id' ? 'Klik atau seret berkas ke sini' : 'Click or drag file here')}
                    </p>
                    {fileToUpload && (
                      <p className="text-[10px] font-mono text-zinc-500 mt-1">
                        {formatBytes(fileToUpload.size)}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsUploadModalOpen(false)}
                      className="px-3.5 py-2 text-xs font-mono uppercase rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-400"
                    >
                      {lang === 'id' ? 'Batal' : 'Cancel'}
                    </button>
                    <button
                      type="button"
                      disabled={!fileToUpload || uploading}
                      onClick={handleFileUpload}
                      className="px-4 py-2 text-xs font-mono uppercase font-bold rounded-sm bg-white hover:bg-zinc-200 text-black shadow-md disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {uploading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>{lang === 'id' ? 'Mengunggah...' : 'Uploading...'}</span>
                        </>
                      ) : (
                        <span>{lang === 'id' ? 'Unggah Sekarang' : 'Upload Now'}</span>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Folder Modal */}
      <AnimatePresence>
        {isCreateFolderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-sm p-6 max-w-md w-full shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <h3 className="text-sm font-semibold text-white font-['Poppins'] flex items-center gap-2">
                  <FolderPlus className="w-4 h-4 text-zinc-300" />
                  <span>{lang === 'id' ? 'Buat Folder Baru di Drive' : 'Create New Folder in Drive'}</span>
                </h3>
                <button
                  onClick={() => setIsCreateFolderModalOpen(false)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                    {lang === 'id' ? 'Nama Folder' : 'Folder Name'}
                  </label>
                  <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="e.g. Portfolio Assets"
                    required
                    className="w-full px-3 py-2 rounded-sm bg-[#050505] border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCreateFolderModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-mono uppercase rounded-sm bg-[#050505] hover:bg-zinc-900 border border-white/10 text-zinc-400"
                  >
                    {lang === 'id' ? 'Batal' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={!folderName.trim()}
                    className="px-4 py-2 text-xs font-mono uppercase font-bold rounded-sm bg-white hover:bg-zinc-200 text-black shadow-md disabled:opacity-50"
                  >
                    {lang === 'id' ? 'Buat Folder' : 'Create Folder'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.section>
  );
};
