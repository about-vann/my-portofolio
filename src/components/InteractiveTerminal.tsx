import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2, 
  HelpCircle, 
  Sparkles,
  Maximize2,
  Minimize2,
  Upload,
  Play,
  FileCode,
  FileText,
  FileJson,
  FolderOpen,
  Check,
  AlertTriangle,
  Code
} from 'lucide-react';
import { ThemeAccent, Language } from '../types';
import { PERSONAL_INFO, PROJECTS, SKILLS, TERMINAL_COMMANDS_HELP } from '../data/portfolioData';

interface TerminalProps {
  accent: ThemeAccent;
  setAccent: (accent: ThemeAccent) => void;
  lang: Language;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  content: React.ReactNode;
}

interface VirtualFile {
  name: string;
  size: number;
  type: string;
  content: string;
  updatedAt: string;
}

const DEFAULT_FILES: VirtualFile[] = [
  {
    name: 'ignmasvikk.js',
    size: 420,
    type: 'javascript',
    updatedAt: new Date().toLocaleTimeString(),
    content: `// Ignmasvikk System Runner
console.log("⚡ [IGNMASVIKK_CORE]: Booting subsystem...");
console.log("👤 Developer: Ignmasvikk (17 Years Old)");
console.log("📍 Location: Surabaya, Indonesia");
console.log("💡 Focus: Full-Stack Developer");
console.log("🚀 Testing benchmark loop...");

const fibonacci = (n) => {
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let c = a + b;
    a = b;
    b = c;
  }
  return b;
};

console.log("📊 Fibonacci(25):", fibonacci(25));
console.log("✅ All systems nominal. Ready to build!");`,
  },
  {
    name: 'profile.json',
    size: 280,
    type: 'json',
    updatedAt: new Date().toLocaleTimeString(),
    content: JSON.stringify(
      {
        name: PERSONAL_INFO.name,
        role: PERSONAL_INFO.title.en,
        age: PERSONAL_INFO.age,
        location: PERSONAL_INFO.location,
        email: PERSONAL_INFO.email,
        phone: PERSONAL_INFO.phone,
        note: PERSONAL_INFO.note.en,
        skills: ['JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'Vite'],
      },
      null,
      2
    ),
  },
  {
    name: 'readme.txt',
    size: 190,
    type: 'text',
    updatedAt: new Date().toLocaleTimeString(),
    content: `=== IGNMASVIKK CLI RUNNER ===
- Gunakan 'upload' untuk mengunggah file script baru (.js, .json, .txt, .ts).
- Gunakan 'run <filename>' untuk mengeksekusi file JavaScript secara live.
- Gunakan 'cat <filename>' untuk membaca isi file.
- Gunakan 'ls' untuk melihat semua file yang tersedia.`,
  },
];

export const InteractiveTerminal: React.FC<TerminalProps> = ({
  accent,
  setAccent,
  lang,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [files, setFiles] = useState<VirtualFile[]>(DEFAULT_FILES);
  const [isExpanded, setIsExpanded] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isDragging, setIsDragging] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'system',
      content: (
        <div className="space-y-1">
          <div className="text-zinc-400 font-mono">
            Simple Terminal [Codex-x86_64] • Masih Pemula
          </div>
          <div className="text-emerald-400 font-mono text-xs">
            Ketik &apos;<span className="font-bold underline">help</span>&apos; untuk perintah, atau &apos;<span className="font-bold underline">run ignmasvikk.js</span>&apos; untuk menjalankan file!
          </div>
        </div>
      ),
    },
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const getAccentTextClass = () => {
    switch (accent) {
      case 'violet': return 'text-purple-400';
      case 'emerald': return 'text-emerald-400';
      case 'amber': return 'text-amber-400';
      default: return 'text-cyan-400';
    }
  };

  // Safe Javascript in-browser code runner
  const executeCode = (code: string, fileName: string): React.ReactNode => {
    const logs: { type: 'log' | 'info' | 'warn' | 'error'; msg: string }[] = [];
    const startTime = performance.now();

    const customConsole = {
      log: (...args: any[]) => {
        logs.push({ type: 'log', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
      },
      info: (...args: any[]) => {
        logs.push({ type: 'info', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
      },
      warn: (...args: any[]) => {
        logs.push({ type: 'warn', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
      },
      error: (...args: any[]) => {
        logs.push({ type: 'error', msg: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ') });
      },
    };

    let resultValue: any = undefined;
    let hasError = false;
    let errorMessage = '';

    try {
      // Execute in wrapped function
      const runFn = new Function('console', code);
      resultValue = runFn(customConsole);
    } catch (err: any) {
      hasError = true;
      errorMessage = err.message || String(err);
    }

    const elapsed = (performance.now() - startTime).toFixed(2);

    return (
      <div className="space-y-2 py-1 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[11px]">
          <span className="text-emerald-400 font-bold flex items-center gap-1.5">
            <Play className="w-3 h-3" />
            <span>RUNNING: {fileName}</span>
          </span>
          <span className="text-zinc-500">[{elapsed} ms]</span>
        </div>

        {logs.length > 0 && (
          <div className="space-y-1 bg-[#050505] p-2.5 rounded-sm border border-white/5">
            {logs.map((l, idx) => (
              <div 
                key={idx} 
                className={
                  l.type === 'error' 
                    ? 'text-rose-400' 
                    : (l.type === 'warn' ? 'text-amber-400' : 'text-zinc-200')
                }
              >
                &gt; {l.msg}
              </div>
            ))}
          </div>
        )}

        {resultValue !== undefined && (
          <div className="text-cyan-400 text-xs">
            <span className="text-zinc-500">Return:</span> {String(resultValue)}
          </div>
        )}

        {hasError && (
          <div className="p-2 rounded-sm bg-rose-950/30 border border-rose-800/40 text-rose-300">
            [RUNTIME_ERROR]: {errorMessage}
          </div>
        )}

        {!hasError && (
          <div className="text-[10px] text-zinc-500 flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-400" />
            <span>Process finished with exit code 0</span>
          </div>
        )}
      </div>
    );
  };

  const handleFileUpload = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    Array.from(uploadedFiles).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = (e.target?.result as string) || '';
        const newVirtualFile: VirtualFile = {
          name: file.name,
          size: file.size,
          type: file.name.endsWith('.js') 
            ? 'javascript' 
            : (file.name.endsWith('.json') ? 'json' : 'text'),
          content,
          updatedAt: new Date().toLocaleTimeString(),
        };

        setFiles((prev) => {
          const filtered = prev.filter((f) => f.name !== file.name);
          return [...filtered, newVirtualFile];
        });

        setHistory((prev) => [
          ...prev,
          {
            id: `upload-${Date.now()}-${Math.random()}`,
            type: 'system',
            content: (
              <div className="p-2 rounded-sm bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  <span>File <strong>{file.name}</strong> ({file.size} bytes) berhasil diunggah!</span>
                </div>
                <button
                  onClick={() => handleCommand(`run ${file.name}`)}
                  className="px-2 py-0.5 rounded-sm bg-emerald-500 text-black font-bold text-[10px] uppercase hover:bg-emerald-400 cursor-pointer"
                >
                  Run Now
                </button>
              </div>
            ),
          },
        ]);
      };
      reader.readAsText(file);
    });
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const inputEntry: CommandLog = {
      id: `in-${Date.now()}`,
      type: 'input',
      content: (
        <div className="flex items-center gap-2 text-zinc-200">
          <span className="text-zinc-500">ignmasvikk@surabaya:~$</span>
          <span>{cmd}</span>
        </div>
      ),
    };

    let outputEntry: CommandLog | null = null;
    const lower = cmd.toLowerCase();
    const parts = cmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').trim();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'help') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 py-1 text-zinc-300 text-xs font-mono">
            <div className="text-zinc-500">// PERINTAH RUNNER & FILE SYSTEM:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">run &lt;file.js&gt;</span>
                <span className="text-zinc-400">Jalankan file script JS live</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">upload</span>
                <span className="text-zinc-400">Buka dialog unggah file</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">ls / files</span>
                <span className="text-zinc-400">Daftar semua file virtual</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">cat &lt;file&gt;</span>
                <span className="text-zinc-400">Lihat isi/source code file</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">rm &lt;file&gt;</span>
                <span className="text-zinc-400">Hapus file dari memori</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">dino</span>
                <span className="text-zinc-400">Mainkan Dino Mini Game</span>
              </div>
            </div>

            <div className="text-zinc-500 pt-2">// PERINTAH PORTOFOLIO:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">whoami</span>
                <span className="text-zinc-400">Profil & info Ignmasvikk</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">skills</span>
                <span className="text-zinc-400">Daftar tech stack</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">projects</span>
                <span className="text-zinc-400">Daftar proyek unggulan</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">contact</span>
                <span className="text-zinc-400">Email, WA & kontak</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">stats</span>
                <span className="text-zinc-400">Statistik pengembang</span>
              </div>
              <div className="flex gap-2">
                <span className="w-28 font-bold text-white">theme &lt;name&gt;</span>
                <span className="text-zinc-400">cyan, violet, emerald, amber</span>
              </div>
            </div>
          </div>
        ),
      };
    } else if (mainCmd === 'run' || mainCmd === 'node' || mainCmd === 'exec') {
      if (!arg) {
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          content: <div className="text-rose-400 text-xs font-mono">Gunakan format: <strong>run &lt;filename&gt;</strong> (contoh: <code>run ignmasvikk.js</code>)</div>,
        };
      } else {
        const targetFile = files.find((f) => f.name.toLowerCase() === arg.toLowerCase());
        if (!targetFile) {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: <div className="text-rose-400 text-xs font-mono">File &apos;{arg}&apos; tidak ditemukan. Ketik &apos;ls&apos; untuk melihat file yang tersedia.</div>,
          };
        } else {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'output',
            content: executeCode(targetFile.content, targetFile.name),
          };
        }
      }
    } else if (mainCmd === 'ls' || mainCmd === 'dir' || mainCmd === 'files') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 py-1 text-xs font-mono">
            <div className="text-zinc-500">// VIRTUAL MEMORY WORKSPACE ({files.length} files):</div>
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between py-1 border-b border-white/5 hover:bg-white/5 px-1 rounded-sm">
                <div className="flex items-center gap-2">
                  {file.type === 'javascript' && <FileCode className="w-3.5 h-3.5 text-yellow-400" />}
                  {file.type === 'json' && <FileJson className="w-3.5 h-3.5 text-cyan-400" />}
                  {file.type === 'text' && <FileText className="w-3.5 h-3.5 text-zinc-400" />}
                  <span className="font-bold text-white">{file.name}</span>
                </div>
                <div className="flex items-center gap-4 text-zinc-500 text-[11px]">
                  <span>{file.size} B</span>
                  <span>{file.updatedAt}</span>
                  <button
                    onClick={() => handleCommand(`run ${file.name}`)}
                    className="text-emerald-400 hover:underline cursor-pointer"
                  >
                    [run]
                  </button>
                  <button
                    onClick={() => handleCommand(`cat ${file.name}`)}
                    className="text-cyan-400 hover:underline cursor-pointer"
                  >
                    [cat]
                  </button>
                </div>
              </div>
            ))}
          </div>
        ),
      };
    } else if (mainCmd === 'cat') {
      if (!arg) {
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          content: <div className="text-rose-400 text-xs font-mono">Format salah. Gunakan: <strong>cat &lt;filename&gt;</strong></div>,
        };
      } else {
        const targetFile = files.find((f) => f.name.toLowerCase() === arg.toLowerCase());
        if (!targetFile) {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: <div className="text-rose-400 text-xs font-mono">File &apos;{arg}&apos; tidak ditemukan.</div>,
          };
        } else {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'output',
            content: (
              <div className="space-y-2 py-1 font-mono text-xs">
                <div className="text-zinc-500 flex justify-between border-b border-white/10 pb-1">
                  <span>FILE CONTENT: {targetFile.name}</span>
                  <span>{targetFile.size} bytes</span>
                </div>
                <pre className="p-3 bg-[#050505] rounded-sm border border-white/5 text-zinc-200 overflow-x-auto text-[11px] leading-relaxed">
                  {targetFile.content}
                </pre>
              </div>
            ),
          };
        }
      }
    } else if (mainCmd === 'upload') {
      fileInputRef.current?.click();
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'system',
        content: <div className="text-cyan-400 text-xs font-mono">Membuka dialog upload file... Silakan pilih file script (.js, .json, .txt).</div>,
      };
    } else if (mainCmd === 'rm') {
      if (!arg) {
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          content: <div className="text-rose-400 text-xs font-mono">Gunakan format: <strong>rm &lt;filename&gt;</strong></div>,
        };
      } else {
        const exists = files.some((f) => f.name.toLowerCase() === arg.toLowerCase());
        if (!exists) {
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'error',
            content: <div className="text-rose-400 text-xs font-mono">File &apos;{arg}&apos; tidak ditemukan.</div>,
          };
        } else {
          setFiles((prev) => prev.filter((f) => f.name.toLowerCase() !== arg.toLowerCase()));
          outputEntry = {
            id: `out-${Date.now()}`,
            type: 'output',
            content: <div className="text-emerald-400 text-xs font-mono">File &apos;{arg}&apos; berhasil dihapus dari workspace memori.</div>,
          };
        }
      }
    } else if (lower === 'whoami') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 py-1 text-zinc-300 text-xs font-mono">
            <div><span className="text-zinc-500">Nama:</span> {PERSONAL_INFO.name}</div>
            <div><span className="text-zinc-500">Role:</span> {PERSONAL_INFO.title[lang]}</div>
            <div><span className="text-zinc-500">Usia:</span> {PERSONAL_INFO.age}</div>
            <div><span className="text-zinc-500">Alamat:</span> {PERSONAL_INFO.location}</div>
            <div><span className="text-zinc-500">Email:</span> {PERSONAL_INFO.email}</div>
            <div><span className="text-zinc-500">WhatsApp:</span> {PERSONAL_INFO.formattedPhone}</div>
            <div><span className="text-zinc-500">Status:</span> {PERSONAL_INFO.note[lang]}</div>
            <div className="text-zinc-400 pt-1 border-t border-white/5">{PERSONAL_INFO.bio.philosophy[lang]}</div>
          </div>
        ),
      };
    } else if (lower === 'skills') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 py-1 text-zinc-300 text-xs font-mono">
            <div className="text-zinc-500">// CORE STACK & SKILLS:</div>
            {SKILLS.slice(0, 6).map((s, idx) => (
              <div key={idx} className="flex justify-between items-center py-0.5 border-b border-white/5">
                <span className="text-white">{s.name}</span>
                <span className="text-emerald-400 font-bold">{s.level}% [{s.experience}]</span>
              </div>
            ))}
          </div>
        ),
      };
    } else if (lower === 'projects') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 py-1 text-zinc-300 text-xs font-mono">
            <div className="text-zinc-500">// FEATURED PROJECTS:</div>
            {PROJECTS.map((p, idx) => (
              <div key={idx} className="p-2 rounded bg-[#050505] border border-white/5 space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-white">{p.title}</span>
                  <span className="text-zinc-500">{p.year}</span>
                </div>
                <div className="text-zinc-400 text-[11px]">{p.summary[lang]}</div>
                <div className="text-cyan-400">{p.tags.join(' • ')}</div>
              </div>
            ))}
          </div>
        ),
      };
    } else if (lower === 'contact') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 py-1 text-zinc-300 text-xs font-mono">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="underline text-white">{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="underline text-cyan-400">{PERSONAL_INFO.github}</a></div>
            <div>Telegram: <a href={PERSONAL_INFO.telegram} target="_blank" rel="noreferrer" className="underline text-sky-400">{PERSONAL_INFO.telegram}</a></div>
            <div>Instagram: <a href={PERSONAL_INFO.instagram} target="_blank" rel="noreferrer" className="underline text-rose-400">{PERSONAL_INFO.instagram}</a></div>
            <div>WhatsApp: <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noreferrer" className="underline text-emerald-400">{PERSONAL_INFO.formattedPhone}</a></div>
          </div>
        ),
      };
    } else if (lower === 'stats') {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="grid grid-cols-2 gap-2 py-1 text-xs font-mono">
            {PERSONAL_INFO.stats.map((st, idx) => (
              <div key={idx} className="p-2 rounded bg-[#050505] border border-white/5">
                <span className="text-sm font-bold text-white">{st.value}</span>
                <div className="text-zinc-400 text-[11px]">{st.label[lang]}</div>
              </div>
            ))}
          </div>
        ),
      };
    } else if (lower === 'dino') {
      const el = document.getElementById('dino-game');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'system',
        content: <div className="text-emerald-400 text-xs font-mono">Menggeser tampilan ke Cyber Dino Arcade Runner...</div>,
      };
    } else if (lower.startsWith('theme ')) {
      const selectedTheme = lower.split(' ')[1] as ThemeAccent;
      if (['cyan', 'violet', 'emerald', 'amber'].includes(selectedTheme)) {
        setAccent(selectedTheme);
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'output',
          content: <div className="text-emerald-400 text-xs font-mono">Tema diubah ke: {selectedTheme.toUpperCase()}</div>,
        };
      } else {
        outputEntry = {
          id: `out-${Date.now()}`,
          type: 'error',
          content: <div className="text-rose-400 text-xs font-mono">Tema tidak valid. Pilih: cyan, violet, emerald, amber</div>,
        };
      }
    } else {
      outputEntry = {
        id: `out-${Date.now()}`,
        type: 'error',
        content: (
          <div className="text-rose-400 text-xs font-mono">
            Perintah &apos;{cmd}&apos; tidak dikenal. Ketik &apos;help&apos; untuk daftar perintah.
          </div>
        ),
      };
    }

    setHistory((prev) => [...prev, inputEntry, ...(outputEntry ? [outputEntry] : [])]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = ['help', 'whoami', 'skills', 'run ignmasvikk.js', 'ls', 'upload', 'dino', 'clear'];

  return (
    <section 
      id="terminal" 
      className="py-4 px-4 sm:px-6 max-w-[680px] mx-auto relative z-10 font-sans"
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".js,.ts,.json,.txt,.md,.py,.html,.css"
        className="hidden"
        onChange={(e) => handleFileUpload(e.target.files)}
      />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="space-y-3.5"
      >
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#141417] border border-white/10 flex items-center justify-center text-zinc-200 shadow-sm">
              <TerminalIcon className="w-4 h-4 text-zinc-300" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {lang === 'id' ? 'Interactive Terminal' : 'Interactive CLI'}
              </h3>
              <p className="text-xs text-zinc-400">
                {lang === 'id' ? 'Console eksekusi kode & script runner' : 'Node.js interactive script runner'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#141417] hover:bg-zinc-800 border border-white/5 text-zinc-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
              title="Unggah Script"
            >
              <Upload className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'id' ? 'Unggah' : 'Upload'}</span>
            </button>
            <button
              onClick={() => setHistory([])}
              className="p-1.5 rounded-lg bg-[#141417] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Bersihkan Layar"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick chip buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase text-zinc-500 mr-1">Quick:</span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 text-[10px] font-mono rounded-lg bg-[#111113] hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              ${cmd}
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFileUpload(e.dataTransfer.files);
          }}
          className={`rounded-2xl bg-[#111113] border ${isDragging ? 'border-emerald-400 bg-emerald-950/10' : 'border-white/5 hover:border-white/15'} shadow-md overflow-hidden transition-all duration-300 min-h-[300px] flex flex-col`}
        >
          
          {/* Terminal Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0d0f] border-b border-white/5">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              <span className="text-[11px] font-mono text-zinc-400 ml-2">ignmasvikk@runner: ~/workspace</span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title={isExpanded ? 'Kecilkan' : 'Perbesar'}
            >
              {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            </button>
          </div>

          {/* Terminal Output Area */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className={`p-3.5 sm:p-4 overflow-y-auto space-y-2.5 font-mono text-xs flex-1 ${
              isExpanded ? 'max-h-[420px]' : 'max-h-[240px]'
            }`}
          >
            {history.map((entry) => (
              <div key={entry.id} className="leading-relaxed">
                {entry.content}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Prompt */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#0d0d0f] border-t border-white/5">
            <span className="font-mono text-xs font-bold text-cyan-400">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={lang === 'id' ? 'Ketik perintah (help, whoami, run ignmasvikk.js)...' : 'Type command (help, whoami, run ignmasvikk.js)...'}
              className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-zinc-600"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-1 rounded-lg bg-[#18181b] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
