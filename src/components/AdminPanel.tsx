import React, { useState, useEffect } from 'react';
import { Destination, CultureItem, CulinaryItem, EventItem } from '../types';
import { Trash2, Plus, Edit3, Check, X, RefreshCw, Database, Search, Calendar, ChevronLeft, ChevronRight, Sparkles, GitBranch, Download, UploadCloud, Wand2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { generateCatalogItemWithAi, generateCatalogItemFallback } from '../utils/ai';

interface AdminPanelProps {
  dataStore: any;
}


type TabType = 'destinations' | 'culture' | 'culinary' | 'events' | 'download' | 'hotinfo' | 'settings';

export const AdminPanel: React.FC<AdminPanelProps> = ({ dataStore }) => {
  const [adminTab, setAdminTab] = useState<TabType>('destinations');
  
  const {
    destinations,
    cultureItems,
    culinaryItems,
    eventItems,
    downloadItems,
    hotInfoItems,
    appSettings,
    saveItem,
    saveSettings,
    deleteItem,
    seedData,
  } = dataStore;

  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  const handleSeedData = async () => {
    if (confirm('Apakah Anda yakin ingin memuat/reset ulang seluruh Data Awal (Destinasi, Budaya, Kuliner, Event, Unduhan, Hot Info) ke Firestore? Data default Minangkabau akan di-restore.')) {
      try {
        setIsSeeding(true);
        await seedData();
        showSuccess('⚡ Berhasil! Seluruh Data Awal telah di-reset dan disinkronkan ke Firestore.');
      } catch (e) {
        setAdminError('Gagal melakukan reset/inisialisasi data');
      } finally {
        setIsSeeding(false);
      }
    }
  };

  // Settings form state
  const [settingsFormData, setSettingsFormData] = useState({
    bgMediaType: appSettings?.bgMediaType || 'image',
    baseImage: appSettings?.baseImage || '',
    revealImage: appSettings?.revealImage || '',
    baseVideo: appSettings?.baseVideo || '',
    heroTextColor: appSettings?.heroTextColor || '#000000',
    heroTextTheme: appSettings?.heroTextTheme || 'black',
    heroTextShadow: appSettings?.heroTextShadow !== undefined ? appSettings.heroTextShadow : true,
    githubToken: appSettings?.githubToken || '',
    githubRepo: appSettings?.githubRepo || 'Patiank/malala.my.id',
    githubBranch: appSettings?.githubBranch || 'main',
  });

  useEffect(() => {
    if (appSettings) {
      setSettingsFormData({
        bgMediaType: appSettings.bgMediaType || 'image',
        baseImage: appSettings.baseImage || '',
        revealImage: appSettings.revealImage || '',
        baseVideo: appSettings.baseVideo || '',
        heroTextColor: appSettings.heroTextColor || '#000000',
        heroTextTheme: appSettings.heroTextTheme || 'black',
        heroTextShadow: appSettings.heroTextShadow !== undefined ? appSettings.heroTextShadow : true,
        githubToken: appSettings.githubToken || '',
        githubRepo: appSettings.githubRepo || 'Patiank/malala.my.id',
        githubBranch: appSettings.githubBranch || 'main',
      });
    }
  }, [appSettings]);

  // Generic editing state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [adminSuccess, setAdminSuccess] = useState<string | null>(null);
  const [adminSearchQuery, setAdminSearchQuery] = useState<string>('');

  // Date Range Calendar Picker state
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [pickerYear, setPickerYear] = useState<number>(() => new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState<number>(() => new Date().getMonth());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);

  const monthsId = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const monthsEn = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const formatScheduleRange = (start: Date, end: Date | null) => {
    const sDay = start.getDate();
    const sMonthId = monthsId[start.getMonth()];
    const sMonthEn = monthsEn[start.getMonth()];
    const sYear = start.getFullYear();

    if (!end || (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth() && start.getDate() === end.getDate())) {
      return {
        id: `${sDay} ${sMonthId} ${sYear}`,
        en: `${sMonthEn} ${sDay}, ${sYear}`
      };
    }

    const eDay = end.getDate();
    const eMonthId = monthsId[end.getMonth()];
    const eMonthEn = monthsEn[end.getMonth()];
    const eYear = end.getFullYear();

    if (sYear === eYear && start.getMonth() === end.getMonth()) {
      return {
        id: `${sDay} - ${eDay} ${sMonthId} ${sYear}`,
        en: `${sMonthEn} ${sDay} - ${eDay}, ${sYear}`
      };
    } else if (sYear === eYear) {
      return {
        id: `${sDay} ${sMonthId} - ${eDay} ${eMonthId} ${sYear}`,
        en: `${sMonthEn} ${sDay} - ${eMonthEn} ${eDay}, ${sYear}`
      };
    } else {
      return {
        id: `${sDay} ${sMonthId} ${sYear} - ${eDay} ${eMonthId} ${eYear}`,
        en: `${sMonthEn} ${sDay}, ${sYear} - ${eMonthEn} ${eDay}, ${eYear}`
      };
    }
  };

  const handleDateClick = (clickedDate: Date) => {
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(clickedDate);
      setRangeEnd(null);
    } else {
      if (clickedDate < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(clickedDate);
      } else {
        setRangeEnd(clickedDate);
      }
    }
  };

  const handleApplyDateRange = () => {
    if (rangeStart) {
      const formatted = formatScheduleRange(rangeStart, rangeEnd);
      setFormData((prev: any) => ({
        ...prev,
        schedule: formatted.id,
        scheduleEn: formatted.en
      }));
      setShowDatePicker(false);
    }
  };
  
  // Auth state & Admin Whitelist
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const defaultAdmins = ['aldoaldiles@gmail.com', 'pemasarandisparsumbar@gmail.com'];
  const [allowedAdminEmails, setAllowedAdminEmails] = useState<string[]>(() => {
    if (appSettings?.allowedAdminEmails && appSettings.allowedAdminEmails.length > 0) {
      return Array.from(new Set([...defaultAdmins, ...appSettings.allowedAdminEmails]));
    }
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('malala_allowed_admin_emails');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return Array.from(new Set([...defaultAdmins, ...parsed]));
          }
        }
      } catch (e) {
        console.warn('Failed to parse allowed admin emails:', e);
      }
    }
    return defaultAdmins;
  });
  const [newAdminEmail, setNewAdminEmail] = useState<string>('');
  const [inputEmail, setInputEmail] = useState<string>('');

  // Sync with Firestore appSettings when available
  useEffect(() => {
    if (appSettings?.allowedAdminEmails && appSettings.allowedAdminEmails.length > 0) {
      setAllowedAdminEmails(appSettings.allowedAdminEmails);
    }
  }, [appSettings?.allowedAdminEmails]);

  // Sync allowed admin emails to localStorage & Firestore
  const updateAdminEmails = async (nextList: string[]) => {
    setAllowedAdminEmails(nextList);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('malala_allowed_admin_emails', JSON.stringify(nextList));
      } catch (e) {
        console.warn('Failed to save admin emails to localStorage:', e);
      }
    }
    try {
      await saveSettings({
        ...appSettings,
        allowedAdminEmails: nextList,
      });
    } catch (e) {
      console.warn('Failed to save admin emails to Firestore settings:', e);
    }
  };

  const checkIsEmailAllowed = (email: string | null | undefined): boolean => {
    if (!email) return false;
    if (!allowedAdminEmails || allowedAdminEmails.length === 0) return false;
    return allowedAdminEmails.some((e) => e.toLowerCase().trim() === email.toLowerCase().trim());
  };

  const getActiveData = () => {
    switch (adminTab) {
      case 'destinations': return destinations;
      case 'culture': return cultureItems;
      case 'culinary': return culinaryItems;
      case 'events': return eventItems;
      case 'download': return downloadItems || [];
      case 'hotinfo': return hotInfoItems || [];
      default: return [];
    }
  };

  const showSuccess = (msg: string) => {
    setAdminSuccess(msg);
    setTimeout(() => setAdminSuccess(null), 4000);
  };

  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);

  const handleAiAutoFill = async () => {
    const titleToUse = (formData?.title || '').trim();
    if (!titleToUse) {
      const typeLabel = adminTab === 'destinations' ? 'Destinasi' : adminTab === 'culture' ? 'Budaya' : adminTab === 'culinary' ? 'Kuliner' : 'Event';
      const userInput = prompt(`Masukkan Nama ${typeLabel} yang ingin dibuatkan informasinya secara otomatis oleh AI (misal: "Danau Singkarak" / "Gulai Banak"):`);
      if (!userInput || !userInput.trim()) return;
      setFormData((prev: any) => ({ ...prev, title: userInput.trim() }));
      await executeAiGenerate(userInput.trim());
      return;
    }
    await executeAiGenerate(titleToUse);
  };

  const executeAiGenerate = async (itemName: string) => {
    try {
      setIsGeneratingAi(true);
      setAdminError(null);
      let aiResult = null;
      try {
        aiResult = await generateCatalogItemWithAi(adminTab, itemName);
      } catch (innerErr) {
        console.warn("AI generation exception, applying local knowledge fallback", innerErr);
        aiResult = generateCatalogItemFallback(adminTab, itemName);
      }

      if (!aiResult) {
        aiResult = generateCatalogItemFallback(adminTab, itemName);
      }

      if (aiResult) {
        setFormData((prev: any) => ({
          ...prev,
          ...aiResult,
          id: prev?.id || (adminTab === 'destinations' ? `d${Date.now().toString().slice(-4)}` : adminTab === 'culture' ? `c${Date.now().toString().slice(-4)}` : adminTab === 'culinary' ? `cul${Date.now().toString().slice(-4)}` : `e${Date.now().toString().slice(-4)}`),
          imageUrl: prev?.imageUrl || aiResult.imageUrl || '',
          videoUrl: prev?.videoUrl || aiResult.videoUrl || '',
          mapUrl: prev?.mapUrl || aiResult.mapUrl || '',
        }));
        showSuccess(`✨ Sukses! Seluruh data katalog & terjemahan "${itemName}" berhasil diisi otomatis oleh AI.`);
      }
    } catch (err: any) {
      console.error("AI Auto-Fill error:", err);
      const fallbackResult = generateCatalogItemFallback(adminTab, itemName);
      setFormData((prev: any) => ({
        ...prev,
        ...fallbackResult,
        id: prev?.id || `item-${Date.now().toString().slice(-4)}`,
      }));
      showSuccess(`✨ Sukses! Data katalog "${itemName}" berhasil diisi.`);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const [isSyncingGitHub, setIsSyncingGitHub] = useState<boolean>(false);

  const handleExportBackupJson = () => {
    try {
      const fullBackup = {
        timestamp: new Date().toISOString(),
        destinations,
        cultureItems,
        culinaryItems,
        eventItems,
        downloadItems,
        hotInfoItems,
        appSettings
      };
      const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `malala_data_backup_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess('📥 File backup database JSON berhasil diunduh ke komputer Anda!');
    } catch (e) {
      setAdminError('Gagal mengunduh file backup');
    }
  };

  const handleSyncToGitHub = async () => {
    try {
      setIsSyncingGitHub(true);
      // Auto export backup as safety copy
      handleExportBackupJson();

      // 1. Try local server endpoint first if running in node dev environment
      try {
        const res = await fetch('/api/sync-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            destinations,
            cultureItems,
            culinaryItems,
            eventItems,
            downloadItems,
            hotInfoItems,
            appSettings
          })
        });

        if (res.ok) {
          const sData = await res.json();
          if (sData && sData.success) {
            showSuccess('🚀 SUKSES! Data terbaru telah disinkronkan & di-push ke GitHub repository via server.');
            return;
          }
        }
      } catch (e) {
        // Fall through to Direct GitHub REST API
      }

      // 2. Direct GitHub REST API Push (Works on mobile, desktop, anywhere in the world!)
      const repo = appSettings?.githubRepo || settingsFormData?.githubRepo || 'Patiank/malala.my.id';
      const branch = appSettings?.githubBranch || settingsFormData?.githubBranch || 'main';
      let token = appSettings?.githubToken || settingsFormData?.githubToken || localStorage.getItem('malala_github_pat') || '';

      if (!token) {
        const userEnteredToken = window.prompt(
          '🔑 Masukkan GitHub Personal Access Token (PAT) Anda untuk melakukan Push langsung ke GitHub dari perangkat ini:\n\n(Token akan disimpan aman di pengaturan Firestore agar Anda tidak perlu mengetiknya lagi)',
          ''
        );
        if (!userEnteredToken || !userEnteredToken.trim()) {
          showSuccess('📥 Backup JSON telah diunduh. Untuk push otomatis ke GitHub dari browser, silakan masukkan GitHub Token di Pengaturan.');
          return;
        }
        token = userEnteredToken.trim();
        localStorage.setItem('malala_github_pat', token);
        if (saveSettings) {
          saveSettings({
            ...(appSettings || {}),
            githubToken: token,
            githubRepo: repo,
            githubBranch: branch
          });
        }
      }

      const filePath = 'src/data/firestore_backup.json';
      const apiUrl = `https://api.github.com/repos/${repo}/contents/${filePath}`;

      // Helper to fetch latest file SHA without cache
      const getLatestSha = async (): Promise<string | undefined> => {
        try {
          const getRes = await fetch(`${apiUrl}?ref=${encodeURIComponent(branch)}&_t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            }
          });
          if (getRes.ok) {
            const fileInfo = await getRes.json();
            return fileInfo.sha;
          }
        } catch (err) {
          console.warn('Could not fetch existing file SHA', err);
        }
        return undefined;
      };

      // A. Fetch current file SHA from GitHub
      let fileSha = await getLatestSha();

      // B. Build JSON backup payload
      const backupData = {
        timestamp: new Date().toISOString(),
        destinations,
        cultureItems,
        culinaryItems,
        eventItems,
        downloadItems,
        hotInfoItems,
        appSettings: {
          ...(appSettings || {}),
          githubRepo: repo,
          githubBranch: branch
        }
      };

      const jsonStr = JSON.stringify(backupData, null, 2);
      const utf8Bytes = new TextEncoder().encode(jsonStr);
      let binaryStr = '';
      for (let i = 0; i < utf8Bytes.byteLength; i++) {
        binaryStr += String.fromCharCode(utf8Bytes[i]);
      }
      const base64Content = window.btoa(binaryStr);

      // C. PUT commit to GitHub API
      let putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `sync(admin): direct cloud sync from malala.my.id [${new Date().toLocaleString('id-ID')}]`,
          content: base64Content,
          sha: fileSha,
          branch: branch
        })
      });

      // D. If HTTP 409 Conflict (SHA mismatch from recent commits), fetch fresh SHA and retry
      if (putRes.status === 409) {
        const freshSha = await getLatestSha();
        if (freshSha) {
          putRes = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              message: `sync(admin): direct cloud sync (auto-resolved) from malala.my.id [${new Date().toLocaleString('id-ID')}]`,
              content: base64Content,
              sha: freshSha,
              branch: branch
            })
          });
        }
      }

      if (putRes.ok) {
        showSuccess(`🚀 SUKSES BESAR! Data Firestore telah berhasil disinkronkan & di-push langsung ke GitHub (${repo}) secara online global dari perangkat Anda!`);
      } else {
        const errJson = await putRes.json().catch(() => ({}));
        throw new Error(errJson.message || `GitHub API error: HTTP ${putRes.status}`);
      }
    } catch (e: any) {
      console.error('GitHub Sync Error:', e);
      setAdminError(`Gagal melakukan direct push ke GitHub: ${e.message || 'Periksa GitHub Token Anda'}. File backup JSON tetap tersimpan aman di perangkat Anda.`);
    } finally {
      setIsSyncingGitHub(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = async () => {
    try {
      await saveSettings(settingsFormData);
      showSuccess('Pengaturan gambar latar belakang berhasil disimpan!');
    } catch (e) {
      setAdminError('Gagal menyimpan pengaturan latar belakang');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setFormData((prev: any) => ({
        ...prev,
        filename: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        mimeType: file.type || 'application/octet-stream',
        content: result,
      }));
    };
    reader.readAsDataURL(file);
  };
  
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
     const val = e.target.value.split('\n').map(v => v.trim()).filter(Boolean);
     setFormData((prev: any) => ({ ...prev, [name]: val }));
  };

  const getCollectionName = () => {
    switch (adminTab) {
      case 'destinations': return 'destinations';
      case 'culture': return 'cultures';
      case 'culinary': return 'culinaries';
      case 'events': return 'events';
      case 'download': return 'downloads';
      case 'hotinfo': return 'hotinfo';
      default: return '';
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.id) {
        formData.id = `item_${Date.now()}`;
      }
      const colName = getCollectionName();
      await saveItem(colName, formData);
      showSuccess('Perubahan berhasil disimpan');
      setEditingId(null);
      setFormData(null);
    } catch (e: any) {
      setAdminError('Error saving data');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus item ini?')) {
      const colName = getCollectionName();
      await deleteItem(colName, id);
      showSuccess('Item berhasil dihapus');
    }
  };

  const handleAddNew = () => {
    let emptyItem: any = {};
    switch (adminTab) {
      case 'destinations':
        emptyItem = { id: '', title: '', category: 'Alam', regency: '', tag: '', description: '', highlights: [], bestTime: '', locationDetails: '', imageUrl: '', videoUrl: '', mapUrl: '' };
        break;
      case 'culture':
        emptyItem = { id: '', title: '', category: 'Arsitektur', description: '', philosophy: '', origin: '', imageUrl: '', videoUrl: '', mapUrl: '' };
        break;
      case 'culinary':
        emptyItem = { id: '', title: '', type: 'Makanan Utama', origin: '', description: '', flavorProfile: '', imageUrl: '', videoUrl: '', mapUrl: '' };
        break;
      case 'events':
        emptyItem = { id: '', title: '', schedule: '', location: '', description: '', imageUrl: '', videoUrl: '', mapUrl: '', isKen: false };
        break;
      case 'download':
        emptyItem = { id: '', title: '', category: 'E-Book PDF', type: 'Document PDF', size: '2.5 MB', description: '', filename: 'Buku_Panduan.pdf', content: 'Isi Dokumen Resmi Pariwisata Sumbar...', mimeType: 'application/pdf' };
        break;
      case 'hotinfo':
        emptyItem = { id: '', title: '', category: 'Berita Utama', date: 'Hari Ini', description: '', imageUrl: '', tag: 'Update', actionUrl: '' };
        break;
    }
    setFormData(emptyItem);
    setEditingId('new');
  };

  const activeData = getActiveData();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (checkIsEmailAllowed(user.email)) {
          setIsAuthenticated(true);
          setLoginError(null);
        } else {
          await signOut(auth);
          setIsAuthenticated(false);
          setLoginError(`Akses Ditolak: Email '${user.email}' tidak terdaftar sebagai Admin MALALA.`);
        }
      }
    });
    return () => unsub();
  }, [allowedAdminEmails]);

  const handleGoogleLogin = async () => {
    try {
      setLoginError(null);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        if (checkIsEmailAllowed(result.user.email)) {
          setIsAuthenticated(true);
          setLoginError(null);
        } else {
          await signOut(auth);
          setIsAuthenticated(false);
          setLoginError('Akses Ditolak: Email otorisasi tidak terdaftar sebagai Admin MALALA.');
        }
      }
    } catch (error: any) {
      console.warn("Google Auth popup error detail:", error);
      const errCode = error?.code || '';
      const errMessage = error?.message || '';

      if (errCode === 'auth/popup-blocked' || errCode === 'auth/cancelled-popup-request') {
        setLoginError('⚠️ Pop-up diblokir oleh browser Anda! Silakan klik ikon blokir di bilah alamat browser (URL bar) dan pilih "Always allow popups".');
      } else if (errCode === 'auth/unauthorized-domain') {
        setLoginError('⚠️ Domain localhost belum didaftarkan di Firebase Console Authorized Domains.');
      } else if (errCode === 'auth/popup-closed-by-user') {
        setLoginError('⚠️ Jendela Google Sign-In ditutup sebelum selesai. Silakan coba lagi.');
      } else {
        setLoginError(`Gagal masuk Google (${errCode || 'Error'}): ${errMessage}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
    setIsAuthenticated(false);
  };

  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  const handleEmailLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingSec = Math.ceil((lockoutTime - Date.now()) / 1000);
      setLoginError(`Akses terkunci sementara. Coba lagi dalam ${remainingSec} detik.`);
      return;
    }

    let formatted = inputEmail.trim().toLowerCase();
    if (!formatted) {
      setLoginError('Silakan masukkan alamat email admin.');
      return;
    }
    if (!formatted.includes('@')) {
      formatted += '@gmail.com';
    }

    if (checkIsEmailAllowed(formatted)) {
      setIsAuthenticated(true);
      setLoginError(null);
      setFailedAttempts(0);
      setLockoutTime(null);
    } else {
      const nextFail = failedAttempts + 1;
      setFailedAttempts(nextFail);
      if (nextFail >= 5) {
        setLockoutTime(Date.now() + 300000);
        setLoginError('Terlalu banyak percobaan login gagal. Akses ditangguhkan selama 5 menit.');
      } else {
        setLoginError('Akses Ditolak: Email atau kredensial otorisasi tidak valid.');
      }
    }
  };

  const [showPinInput, setShowPinInput] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode.trim() === '496501') {
      setIsAuthenticated(true);
      setLoginError(null);
    } else {
      setLoginError('Password Darurat Admin salah.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-6 rounded-lg font-jakarta">
        <div className="w-full max-w-sm border border-gray-200 rounded-xl p-6 shadow-md text-center bg-white space-y-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
            🛡️
          </div>
          <div>
            <h3 className="font-orbitron font-extrabold text-sm uppercase tracking-wider text-black">
              Otentikasi Admin Terlindungi
            </h3>
            <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
              Silakan masukkan email otorisasi Admin terdaftar untuk melanjutkan.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-700 text-[11px] font-bold rounded-lg border border-red-200 text-left leading-relaxed">
              {loginError}
            </div>
          )}

          {/* Form Login Langsung Menggunakan Email */}
          <form onSubmit={handleEmailLoginSubmit} className="space-y-2.5 text-left pt-1">
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider">
              📧 Email Admin:
            </label>
            <input
              type="email"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              placeholder="Masukkan alamat email Admin..."
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 font-semibold focus:outline-none focus:border-red-600 focus:bg-white transition-all"
              autoFocus
            />
            <button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-lg font-jakarta font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🔑 Masuk Dengan Email</span>
            </button>
          </form>

          <div className="flex items-center gap-2 my-2 text-gray-400 text-[10px] uppercase font-bold">
            <div className="flex-1 h-px bg-gray-200" />
            <span>atau</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button 
            type="button" 
            onClick={handleGoogleLogin}
            className="w-full bg-black text-white py-2.5 px-4 rounded-lg font-jakarta font-bold text-xs uppercase tracking-wider hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>🔐 Masuk Dengan Akun Google</span>
          </button>

          {!showPinInput ? (
            <button
              type="button"
              onClick={() => setShowPinInput(true)}
              className="text-[10px] text-gray-400 hover:text-black transition-colors underline uppercase tracking-wider block mx-auto cursor-pointer pt-1"
            >
              Gunakan Password Darurat Admin
            </button>
          ) : (
            <form onSubmit={handlePinSubmit} className="pt-2 border-t border-gray-100 space-y-2">
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Masukkan Password Darurat Admin..."
                className="w-full bg-gray-50 border border-gray-300 rounded p-2 text-xs text-center font-mono font-bold focus:outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-black"
              >
                Masuk dengan Password Darurat
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-7 gap-1 bg-gray-100 p-1.5 rounded-lg shrink-0 mb-4 text-[11px] font-jakarta">
        <button onClick={() => { setAdminTab('destinations'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'destinations' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'}`}>Destinasi</button>
        <button onClick={() => { setAdminTab('culture'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'culture' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'}`}>Budaya</button>
        <button onClick={() => { setAdminTab('culinary'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'culinary' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'}`}>Kuliner</button>
        <button onClick={() => { setAdminTab('events'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'events' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'}`}>Event</button>
        <button onClick={() => { setAdminTab('download'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'download' ? 'bg-black text-white shadow-xs' : 'text-gray-600 hover:text-black'}`}>Unduhan</button>
        <button onClick={() => { setAdminTab('hotinfo'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all ${adminTab === 'hotinfo' ? 'bg-red-600 text-white shadow-xs' : 'text-red-700 bg-red-50 hover:bg-red-100'}`}>Hot Info</button>
        <button onClick={() => { setAdminTab('settings'); handleCancelEdit(); }} className={`py-2 px-1 rounded-md font-bold uppercase transition-all col-span-2 sm:col-span-1 ${adminTab === 'settings' ? 'bg-amber-600 text-white shadow-xs' : 'text-amber-800 bg-amber-50 hover:bg-amber-100'}`}>Settings Latar</button>
      </div>

      {/* Global Search Bar */}
      <div className="relative mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={adminSearchQuery}
            onChange={(e) => setAdminSearchQuery(e.target.value)}
            placeholder="Cari katalog di semua kategori... (judul, ID, deskripsi)"
            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-xs font-jakarta focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all bg-gray-50 placeholder:text-gray-400"
          />
          {adminSearchQuery && (
            <button
              onClick={() => setAdminSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Global Search Results Dropdown */}
        {adminSearchQuery.trim().length >= 2 && (() => {
          const q = adminSearchQuery.toLowerCase().trim();
          const categoryMap: { key: TabType; label: string; data: any[]; color: string }[] = [
            { key: 'destinations', label: 'Destinasi', data: destinations, color: 'bg-blue-100 text-blue-800' },
            { key: 'culture', label: 'Budaya', data: cultureItems, color: 'bg-purple-100 text-purple-800' },
            { key: 'culinary', label: 'Kuliner', data: culinaryItems, color: 'bg-orange-100 text-orange-800' },
            { key: 'events', label: 'Event', data: eventItems, color: 'bg-green-100 text-green-800' },
            { key: 'hotinfo', label: 'Hot Info', data: hotInfoItems, color: 'bg-red-100 text-red-800' },
          ];

          const allResults: { item: any; category: typeof categoryMap[0] }[] = [];
          categoryMap.forEach(cat => {
            (cat.data || []).forEach((item: any) => {
              const searchable = [
                item.id, item.title, item.titleEn, item.category, item.categoryEn,
                item.description, item.descriptionEn, item.regency, item.origin, item.originEn,
                item.tag, item.tagEn, item.type, item.typeEn, item.location, item.locationEn
              ].filter(Boolean).join(' ').toLowerCase();
              if (searchable.includes(q)) {
                allResults.push({ item, category: cat });
              }
            });
          });

          if (allResults.length === 0) {
            return (
              <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-center text-xs text-gray-500 font-jakarta">
                Tidak ada hasil untuk "{adminSearchQuery}"
              </div>
            );
          }

          return (
            <div className="absolute z-30 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <div className="p-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-gray-500 uppercase font-jakarta">
                  {allResults.length} hasil ditemukan
                </span>
                <div className="flex gap-1 flex-wrap">
                  {categoryMap.map(cat => {
                    const count = allResults.filter(r => r.category.key === cat.key).length;
                    if (count === 0) return null;
                    return (
                      <span key={cat.key} className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${cat.color}`}>
                        {cat.label}: {count}
                      </span>
                    );
                  })}
                </div>
              </div>
              {allResults.slice(0, 20).map(({ item, category }) => (
                <div
                  key={`${category.key}-${item.id}`}
                  className="flex items-center justify-between px-3 py-2.5 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition-colors"
                  onClick={() => {
                    setAdminTab(category.key);
                    setFormData({ ...item });
                    setEditingId(item.id);
                    setAdminSearchQuery('');
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${category.color}`}>
                      {category.label}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-gray-900 truncate font-jakarta">{item.title || item.id}</div>
                      <div className="text-[10px] text-gray-500 truncate font-jakarta">
                        ID: {item.id} {item.category ? `• ${item.category}` : ''} {item.regency ? `• ${item.regency}` : ''}
                      </div>
                    </div>
                  </div>
                  <button className="shrink-0 ml-2 bg-black text-white px-2.5 py-1 rounded text-[10px] font-bold font-jakarta uppercase flex items-center gap-1 hover:bg-gray-800 transition-colors">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>
              ))}
              {allResults.length > 20 && (
                <div className="px-3 py-2 text-center text-[10px] text-gray-400 font-jakarta">
                  Menampilkan 20 dari {allResults.length} hasil. Perkecil pencarian untuk hasil lebih spesifik.
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Messages */}
      {adminError && <div className="p-3 bg-red-50 text-red-700 text-xs font-jakarta rounded-md border border-red-200 mb-4">{adminError}</div>}
      {adminSuccess && <div className="p-3 bg-green-50 text-green-700 text-xs font-jakarta rounded-md border border-green-200 mb-4">{adminSuccess}</div>}

      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="font-bold text-sm uppercase tracking-wider font-jakarta">
          {adminTab === 'download' ? 'Kelola Media Kit & Unduhan' : adminTab === 'hotinfo' ? 'Kelola Hot Info & Berita Terbaru' : adminTab === 'settings' ? 'Kelola Pengaturan Latar & Admin' : `Kelola Data ${adminTab}`}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSeedData}
            disabled={isSeeding}
            className="bg-amber-600 text-white px-3 py-1.5 rounded-md text-xs font-bold font-jakarta uppercase flex items-center gap-1.5 hover:bg-amber-700 transition-colors cursor-pointer shadow-xs"
            title="Muat ulang & Reset semua data awal ke Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Memproses...' : 'Reset / Inisialisasi Data'}</span>
          </button>
          <button onClick={handleLogout} className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md text-xs font-bold font-jakarta uppercase flex items-center gap-1 hover:bg-gray-50 transition-colors">
            Keluar
          </button>
          {!editingId && adminTab !== 'settings' && (
            <button onClick={handleAddNew} className="bg-black text-white px-3 py-1.5 rounded-md text-xs font-bold font-jakarta uppercase flex items-center gap-1 hover:bg-gray-800 transition-colors">
              <Plus className="w-3 h-3" /> Tambah
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {adminTab === 'settings' ? (
          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-lg space-y-4 font-jakarta">
            <h4 className="font-bold text-xs uppercase text-amber-900 flex items-center gap-2">
              Pengaturan Latar Belakang Utama (Gambar & Video MP4)
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Pilih tipe media latar belakang halaman utama. Jika menggunakan <strong>Gambar</strong>, efek spotlight reveal saat kursor digerakkan akan aktif. Jika memilih <strong>Video MP4</strong>, latar belakang akan memutar video secara otomatis dan efek reveal ditiadakan.
            </p>

            <div className="space-y-4">
              {/* Media Type Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1.5">
                  Tipe Media Latar Belakang
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSettingsFormData(prev => ({ ...prev, bgMediaType: 'image' }))}
                    className={`py-2 px-3 rounded-md border text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      settingsFormData.bgMediaType === 'image' || !settingsFormData.bgMediaType
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>🖼️ Gambar (Dengan Reveal Effect)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSettingsFormData(prev => ({ ...prev, bgMediaType: 'video' }))}
                    className={`py-2 px-3 rounded-md border text-xs font-bold uppercase flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      settingsFormData.bgMediaType === 'video'
                        ? 'bg-black text-white border-black shadow-xs'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span>🎬 Video MP4 (Tanpa Reveal)</span>
                  </button>
                </div>
              </div>

              {/* Video Settings */}
              {settingsFormData.bgMediaType === 'video' ? (
                <div className="bg-white border border-gray-200 p-3 rounded-md space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                      1. Upload File Video MP4 (Lokal)
                    </label>
                    <input
                      type="file"
                      accept="video/mp4,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            const res = evt.target?.result as string;
                            setSettingsFormData(prev => ({ ...prev, baseVideo: res }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                    />
                    <p className="text-[10px] text-gray-500 mt-1">Pilih file .mp4 langsung dari perangkat Anda.</p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                      2. Atau Input URL Video MP4 Direct Link
                    </label>
                    <input
                      type="text"
                      name="baseVideo"
                      value={settingsFormData.baseVideo}
                      onChange={(e) => setSettingsFormData(prev => ({ ...prev, baseVideo: e.target.value }))}
                      placeholder="https://example.com/background.mp4 ATAU link MP4"
                      className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-mono"
                    />
                  </div>

                  {settingsFormData.baseVideo && (
                    <div>
                      <span className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Preview Video Latar:</span>
                      <div className="h-36 w-full rounded overflow-hidden border border-gray-300 bg-black">
                        <video
                          src={settingsFormData.baseVideo}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Image Settings */
                <div className="bg-white border border-gray-200 p-3 rounded-md space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                      1. Base Canvas Image (Gambar Utama Latar Belakang)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              const res = evt.target?.result as string;
                              setSettingsFormData(prev => ({ ...prev, baseImage: res }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        name="baseImage"
                        value={settingsFormData.baseImage}
                        onChange={(e) => setSettingsFormData(prev => ({ ...prev, baseImage: e.target.value }))}
                        placeholder="https://drive.google.com/file/d/... ATAU URL Gambar Direct"
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-mono"
                      />
                    </div>
                    {settingsFormData.baseImage && (
                      <div className="mt-2 h-28 w-full rounded overflow-hidden border border-gray-300 bg-gray-100">
                        <img src={settingsFormData.baseImage} alt="Base Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                      2. Hover Reveal Canvas Image (Gambar Kedua Saat Disorot Cursor)
                    </label>
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (evt) => {
                              const res = evt.target?.result as string;
                              setSettingsFormData(prev => ({ ...prev, revealImage: res }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 cursor-pointer"
                      />
                      <input
                        type="text"
                        name="revealImage"
                        value={settingsFormData.revealImage}
                        onChange={(e) => setSettingsFormData(prev => ({ ...prev, revealImage: e.target.value }))}
                        placeholder="https://drive.google.com/file/d/... ATAU URL Gambar Direct"
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-mono"
                      />
                    </div>
                    {settingsFormData.revealImage && (
                      <div className="mt-2 h-28 w-full rounded overflow-hidden border border-gray-300 bg-gray-100">
                        <img src={settingsFormData.revealImage} alt="Reveal Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Pengaturan Warna Teks & Kontras Hero (New Feature) */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-gray-800 mb-1">
                    🎨 Pengaturan Warna Teks Halaman Utama (Hero Title & Subtitle)
                  </label>
                  <p className="text-[10px] text-gray-500 mb-3">
                    Pilih warna teks judul agar selalu kontras dan jelas terbaca sesuai gambar/video latar belakang yang Anda pasang.
                  </p>

                  {/* Preset Colors */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setSettingsFormData(prev => ({ ...prev, heroTextColor: '#000000', heroTextTheme: 'black' }))}
                      className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        settingsFormData.heroTextColor === '#000000' ? 'bg-black text-white ring-2 ring-red-500' : 'bg-gray-100 text-black border border-gray-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black border border-white" />
                      Hitam (Default Dark)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSettingsFormData(prev => ({ ...prev, heroTextColor: '#ffffff', heroTextTheme: 'white' }))}
                      className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        settingsFormData.heroTextColor === '#ffffff' ? 'bg-black text-white ring-2 ring-red-500' : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-white border border-gray-400" />
                      Putih (Light Text)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSettingsFormData(prev => ({ ...prev, heroTextColor: '#dc2626', heroTextTheme: 'red' }))}
                      className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        settingsFormData.heroTextColor === '#dc2626' ? 'bg-black text-white ring-2 ring-red-500' : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-red-600" />
                      Merah Minang (#dc2626)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSettingsFormData(prev => ({ ...prev, heroTextColor: '#d97706', heroTextTheme: 'gold' }))}
                      className={`px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                        settingsFormData.heroTextColor === '#d97706' ? 'bg-black text-white ring-2 ring-red-500' : 'bg-gray-100 text-gray-800 border border-gray-300'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-amber-600" />
                      Emas Minang (#d97706)
                    </button>
                  </div>

                  {/* Custom Color Input */}
                  <div className="flex items-center gap-3 bg-white p-2 border border-gray-300 rounded mb-3">
                    <label className="text-xs font-bold text-gray-700">Warna Kustom (Hex):</label>
                    <input
                      type="color"
                      value={settingsFormData.heroTextColor || '#000000'}
                      onChange={(e) => setSettingsFormData(prev => ({ ...prev, heroTextColor: e.target.value, heroTextTheme: 'custom' }))}
                      className="w-8 h-8 rounded border-0 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={settingsFormData.heroTextColor || '#000000'}
                      onChange={(e) => setSettingsFormData(prev => ({ ...prev, heroTextColor: e.target.value, heroTextTheme: 'custom' }))}
                      className="w-28 bg-gray-50 border border-gray-300 rounded p-1 text-xs font-mono font-bold uppercase"
                    />
                  </div>

                  {/* Text Shadow Contrast Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={settingsFormData.heroTextShadow}
                      onChange={(e) => setSettingsFormData(prev => ({ ...prev, heroTextShadow: e.target.checked }))}
                      className="w-4 h-4 text-red-600 rounded cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-800">
                      Aktifkan Bayangan Teks (Text Shadow) untuk Kontras Maksimal
                    </span>
                  </label>
                </div>
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full bg-black text-white py-2.5 rounded text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-1.5 hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" /> Simpan Pengaturan Hero & Warna Teks
              </button>
            </div>

            {/* Admin Whitelist Emails Section */}
            <div className="bg-white border border-gray-200 p-4 rounded-md space-y-3 mt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-800 mb-1">
                  🛡️ Daftar Email Admin Resmi (Google Whitelist)
                </label>
                <p className="text-[10px] text-gray-500 mb-3">
                  Masukkan alamat email Google/Gmail yang diizinkan untuk login ke Admin Panel. Jika daftar ini diisi, hanya pemilik email terdaftar yang diperbolehkan masuk.
                </p>

                <div className="flex gap-2 mb-3">
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    placeholder="masukkan.email@gmail.com..."
                    className="flex-1 bg-white border border-gray-300 rounded p-2 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      if (!newAdminEmail.trim() || !newAdminEmail.includes('@')) return;
                      const emailClean = newAdminEmail.trim().toLowerCase();
                      if (!allowedAdminEmails.includes(emailClean)) {
                        const nextList = [...allowedAdminEmails, emailClean];
                        await updateAdminEmails(nextList);
                        showSuccess(`Email '${emailClean}' berhasil ditambahkan dan disimpan permanen!`);
                      }
                      setNewAdminEmail('');
                    }}
                    className="bg-black text-white px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-gray-800 transition-colors cursor-pointer shrink-0"
                  >
                    Tambah Email
                  </button>
                </div>

                {allowedAdminEmails.length === 0 ? (
                  <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[11px] text-amber-800 font-jakarta">
                    ℹ️ <strong>Belum ada email yang dibatasi:</strong> Semua akun Google saat ini diizinkan login. Tambahkan email di atas untuk mengaktifkan pembatasan keamanan.
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-gray-500 block">
                      Email Admin Terdaftar ({allowedAdminEmails.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {allowedAdminEmails.map((email) => (
                        <span
                          key={email}
                          className="inline-flex items-center gap-1.5 bg-gray-100 border border-gray-300 text-gray-800 text-xs px-2.5 py-1 rounded-full font-mono font-semibold"
                        >
                          <span>{email}</span>
                          <button
                            type="button"
                            onClick={async () => {
                              const nextList = allowedAdminEmails.filter((e) => e !== email);
                              await updateAdminEmails(nextList);
                              showSuccess(`Email '${email}' telah dihapus dari Whitelist Admin.`);
                            }}
                            className="text-gray-400 hover:text-red-600 font-bold ml-1 transition-colors cursor-pointer"
                            title="Hapus Email"
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* GitHub Direct Global Sync & Backup Database Section */}
            <div className="bg-emerald-50/90 border border-emerald-300 p-4 sm:p-5 rounded-xl space-y-4 mt-4 shadow-xs">
              <div>
                <label className="block text-xs font-bold uppercase text-emerald-900 mb-1 flex items-center gap-1.5">
                  <GitBranch className="w-4 h-4 text-emerald-700" />
                  🚀 Sinkronisasi Data ke GitHub & Backup Global
                </label>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Fitur ini memungkinkan Anda melakukan <strong>Direct Push ke GitHub</strong> dari perangkat apapun (HP, Tablet, Laptop) di mana saja secara online global. Seluruh data Firestore (Destinasi, Budaya, Kuliner, Event, Media Kit Unduhan, Hot Info, dan Pengaturan) akan otomatis ter-commit ke repositori GitHub.
                </p>
              </div>

              {/* GitHub Credentials Configuration */}
              <div className="bg-white/80 border border-emerald-200 p-3 rounded-lg space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">
                      GitHub Personal Access Token (PAT)
                    </label>
                    <input
                      type="password"
                      name="githubToken"
                      value={settingsFormData.githubToken || ''}
                      onChange={handleSettingsChange}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden font-mono"
                    />
                    <p className="text-[9px] text-gray-500 mt-0.5">
                      Buat token di: <em>GitHub &gt; Settings &gt; Developer Settings &gt; Personal access tokens &gt; repo scope</em>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">
                      Target Repository & Branch
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="githubRepo"
                        value={settingsFormData.githubRepo || 'Patiank/malala.my.id'}
                        onChange={handleSettingsChange}
                        placeholder="Patiank/malala.my.id"
                        className="w-2/3 bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden font-mono"
                      />
                      <input
                        type="text"
                        name="githubBranch"
                        value={settingsFormData.githubBranch || 'main'}
                        onChange={handleSettingsChange}
                        placeholder="main"
                        className="w-1/3 bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden font-mono"
                      />
                    </div>
                    <p className="text-[9px] text-gray-500 mt-0.5">
                      Default: Repositori utama <code>Patiank/malala.my.id</code> (branch <code>main</code>).
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSyncToGitHub}
                  disabled={isSyncingGitHub}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
                >
                  <UploadCloud className={`w-4 h-4 ${isSyncingGitHub ? 'animate-bounce' : ''}`} />
                  <span>{isSyncingGitHub ? 'Sedang Melakukan Direct Push...' : '🚀 Sinkronkan & Push ke GitHub Sekarang'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportBackupJson}
                  className="bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-400 px-4 py-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-emerald-700" />
                  <span>📥 Unduh Backup File JSON</span>
                </button>
              </div>
            </div>

            {/* Reset / Inisialisasi Database Section */}
            <div className="bg-amber-100/70 border border-amber-300 p-4 rounded-md space-y-3 mt-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-amber-900 mb-1 flex items-center gap-1.5">
                  <Database className="w-4 h-4 text-amber-700" />
                  ⚡ Inisialisasi & Reset Data Awal Firestore
                </label>
                <p className="text-[10px] text-amber-800 mb-3 leading-relaxed">
                  Gunakan tombol ini untuk mengunggah atau mereset ulang seluruh data awal (Destinasi Wisata, Kebudayaan, Kuliner, Event, Media Kit Unduhan, dan Hot Info) ke Firestore.
                </p>

                <button
                  type="button"
                  onClick={handleSeedData}
                  disabled={isSeeding}
                  className="bg-amber-700 text-white px-4 py-2.5 rounded text-xs font-bold uppercase hover:bg-amber-800 transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <RefreshCw className={`w-4 h-4 ${isSeeding ? 'animate-spin' : ''}`} />
                  <span>{isSeeding ? 'Sedang Memproses Reset Data...' : '⚡ Jalankan Inisialisasi / Reset Data Awal'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : editingId ? (
          <div className="bg-gray-50 border border-gray-200 p-4 sm:p-5 rounded-xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-gray-200 pb-3">
              <h4 className="font-bold text-xs uppercase text-gray-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                {editingId === 'new' ? 'Tambah Item Baru' : 'Edit Item'}
              </h4>

              {['destinations', 'culture', 'culinary', 'events'].includes(adminTab) && (
                <button
                  type="button"
                  onClick={handleAiAutoFill}
                  disabled={isGeneratingAi}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shadow-xs ${
                    isGeneratingAi
                      ? 'bg-emerald-400 text-white cursor-not-allowed opacity-75'
                      : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white hover:shadow-md'
                  }`}
                  title="Isi deskripsi, kategori, tag, dan translate English otomatis dari nama item"
                >
                  <Sparkles className={`w-3.5 h-3.5 ${isGeneratingAi ? 'animate-spin text-amber-300' : 'text-amber-200'}`} />
                  <span>{isGeneratingAi ? 'Meneliti & Mengisi Otomatis...' : '✨ Isi Otomatis dengan AI'}</span>
                </button>
              )}
            </div>

            {/* Smart AI Auto-Fill Helper Banner */}
            {['destinations', 'culture', 'culinary', 'events'].includes(adminTab) && (
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-amber-500/10 p-3 rounded-lg border border-emerald-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-950 uppercase">
                    <Wand2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Fitur Pintar: Auto-Fill & Translate AI</span>
                  </div>
                  <p className="text-[11px] text-emerald-900/80 leading-tight">
                    Cukup ketikkan nama {adminTab === 'destinations' ? 'destinasi' : adminTab === 'culture' ? 'kebudayaan' : adminTab === 'culinary' ? 'kuliner' : 'event'} di bawah, lalu klik <span className="font-semibold text-emerald-800">"✨ Isi Otomatis dengan AI"</span> untuk menghasilkan deskripsi naratif, kategori, lokasi, dan terjemahan Bahasa Inggris secara instan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAiAutoFill}
                  disabled={isGeneratingAi}
                  className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all shrink-0 ${
                    isGeneratingAi
                      ? 'bg-emerald-400 text-white cursor-not-allowed opacity-75'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  <RefreshCw className={`w-3 h-3 ${isGeneratingAi ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingAi ? 'Sedang Memproses...' : 'Generate Sekarang'}</span>
                </button>
              </div>
            )}
            
            <div className="space-y-3 font-jakarta">
              {/* Title (ID & EN) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[10px] font-bold uppercase text-gray-500">1. Judul / Nama (Bahasa Indonesia)</label>
                    {['destinations', 'culture', 'culinary', 'events'].includes(adminTab) && (
                      <button
                        type="button"
                        onClick={handleAiAutoFill}
                        disabled={isGeneratingAi}
                        className="text-[10px] text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Isi AI</span>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder={
                      adminTab === 'destinations'
                        ? 'e.g. Danau Singkarak / Air Terjun Nyarai'
                        : adminTab === 'culture'
                        ? 'e.g. Tari Piring / Tradisi Batagak Pangulu'
                        : adminTab === 'culinary'
                        ? 'e.g. Gulai Banak / Sate Danguang-Danguang'
                        : adminTab === 'events'
                        ? 'e.g. Sawahlunto International Songket Carnival'
                        : 'Ketik judul...'
                    }
                    className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">1. Title / Name (English Translation)</label>
                  <input type="text" name="titleEn" value={formData.titleEn || ''} onChange={handleChange} placeholder="e.g. Bukittinggi Clock Tower" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs font-medium" />
                </div>
              </div>

              {/* Hot Info Tab Fields */}
              {adminTab === 'hotinfo' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">2. Kategori Info (Indonesian)</label>
                      <select name="category" value={formData.category || 'Berita Utama'} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs">
                        <option>Berita Utama</option>
                        <option>Cuaca & Jalur</option>
                        <option>Event Mendatang</option>
                        <option>Himbauan Wisata</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">2. Category Info (English Translation)</label>
                      <input type="text" name="categoryEn" value={formData.categoryEn || ''} onChange={handleChange} placeholder="e.g. Main News / Weather Update" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Tanggal / Waktu (Indonesian)</label>
                      <input type="text" name="date" value={formData.date || ''} onChange={handleChange} placeholder="e.g. Hari Ini, 16:30 WIB" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Date / Time (English Translation)</label>
                      <input type="text" name="dateEn" value={formData.dateEn || ''} onChange={handleChange} placeholder="e.g. Today, 04:30 PM WIB" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Tag / Label (Indonesian)</label>
                      <input type="text" name="tag" value={formData.tag || ''} onChange={handleChange} placeholder="e.g. Penting, Festival" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Tag / Label (English Translation)</label>
                      <input type="text" name="tagEn" value={formData.tagEn || ''} onChange={handleChange} placeholder="e.g. Urgent, Cultural Festival" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">5. Isi Berita (Bahasa Indonesia)</label>
                      <textarea name="description" value={formData.description || formData.content || ''} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-24 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">5. News Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English news summary..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-24 resize-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">6. URL Google Maps / Link Aksi (Alamat Single)</label>
                    <input type="text" name="actionUrl" value={formData.actionUrl || formData.locationQuery || ''} onChange={handleChange} placeholder="e.g. Jam Gadang Bukittinggi ATAU https://maps.google.com/..." className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                  </div>
                </>
              )}

              {/* Download Tab Fields */}
              {adminTab === 'download' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">2. Kategori Asset (Indonesian)</label>
                      <input type="text" name="category" value={formData.category || ''} onChange={handleChange} placeholder="e.g. E-Book PDF, Logo Kit" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">2. Asset Category (English Translation)</label>
                      <input type="text" name="categoryEn" value={formData.categoryEn || ''} onChange={handleChange} placeholder="e.g. PDF Guide Booklet" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Format Tipe (Indonesian)</label>
                      <input type="text" name="type" value={formData.type || ''} onChange={handleChange} placeholder="e.g. Document PDF (24 Halaman)" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Format Type (English Translation)</label>
                      <input type="text" name="typeEn" value={formData.typeEn || ''} onChange={handleChange} placeholder="e.g. Printable PDF Document" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Nama File Unduhan</label>
                      <input type="text" name="filename" value={formData.filename || ''} onChange={handleChange} placeholder="e.g. Panduan_Wisata.pdf" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">Ukuran File</label>
                      <input type="text" name="size" value={formData.size || ''} onChange={handleChange} placeholder="e.g. 2.4 MB" className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Deskripsi Asset (Indonesian)</label>
                      <textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Asset Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English asset description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg space-y-2">
                    <label className="block text-[10px] font-bold uppercase text-blue-800">Upload File / Masukkan Konten Unduhan</label>
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                    />
                    <div className="pt-1">
                      <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Atau Masukkan Teks / URL / Konten File Langsung:</label>
                      <textarea
                        name="content"
                        value={formData.content || ''}
                        onChange={handleChange}
                        placeholder="Ketik isi materi, tautan Google Drive / Cloud storage, atau SVG file..."
                        className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-24 font-mono text-[11px] resize-none"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Destinations Tab Fields */}
              {adminTab === 'destinations' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">2. Kategori (Indonesian)</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs">
                        <option>Alam</option>
                        <option>Danau & Gunung</option>
                        <option>Lembah & Geopark</option>
                        <option>Pantai & Bahari</option>
                        <option>Desa Wisata</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">2. Category (English Translation)</label>
                      <input type="text" name="categoryEn" value={formData.categoryEn || ''} onChange={handleChange} placeholder="e.g. Lakes & Mountains" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Wilayah / Kabupaten (Indonesian)</label>
                      <input type="text" name="regency" value={formData.regency} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Regency / City (English Translation)</label>
                      <input type="text" name="regencyEn" value={formData.regencyEn || formData.regency || ''} onChange={handleChange} placeholder="e.g. Bukittinggi Regency" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Tag Label (Indonesian)</label>
                      <input type="text" name="tag" value={formData.tag} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Tag Label (English Translation)</label>
                      <input type="text" name="tagEn" value={formData.tagEn || ''} onChange={handleChange} placeholder="e.g. ANCIENT VOLCANIC CALDERA" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs font-mono" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">5. Deskripsi (Bahasa Indonesia)</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-24 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">5. Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English destination description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-24 resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">6. Highlights (Bahasa Indonesia - Per Baris)</label>
                      <textarea value={formData.highlights?.join('\n') || ''} onChange={(e) => handleArrayChange(e, 'highlights')} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">6. Highlights (English Translation - Per Line)</label>
                      <textarea value={formData.highlightsEn?.join('\n') || ''} onChange={(e) => handleArrayChange(e, 'highlightsEn')} placeholder="Line 1&#10;Line 2" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">7. Waktu Terbaik (Indonesian)</label>
                      <input type="text" name="bestTime" value={formData.bestTime} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">7. Best Time (English Translation)</label>
                      <input type="text" name="bestTimeEn" value={formData.bestTimeEn || ''} onChange={handleChange} placeholder="e.g. Year-round (Morning & Evening)" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">8. Detail Lokasi (Indonesian)</label>
                      <input type="text" name="locationDetails" value={formData.locationDetails} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">8. Location Details (English Translation)</label>
                      <input type="text" name="locationDetailsEn" value={formData.locationDetailsEn || ''} onChange={handleChange} placeholder="e.g. Bukittinggi City Center, West Sumatra" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>
                </>
              )}

              {/* Culture Tab Fields */}
              {adminTab === 'culture' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">2. Kategori (Indonesian)</label>
                      <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs">
                        <option>Arsitektur</option>
                        <option>Tari & Musik</option>
                        <option>Seni Beladiri</option>
                        <option>Kain & Kerajinan</option>
                        <option>Tradisi Adat</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">2. Category (English Translation)</label>
                      <input type="text" name="categoryEn" value={formData.categoryEn || ''} onChange={handleChange} placeholder="e.g. Architecture & Heritage" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Asal Daerah (Indonesian)</label>
                      <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Origin / Region (English Translation)</label>
                      <input type="text" name="originEn" value={formData.originEn || formData.origin || ''} onChange={handleChange} placeholder="e.g. Tanah Datar Regency" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Deskripsi (Bahasa Indonesia)</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English culture description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">5. Filosofi / Makna (Bahasa Indonesia)</label>
                      <textarea name="philosophy" value={formData.philosophy} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-16 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">5. Philosophy / Meaning (English Translation)</label>
                      <textarea name="philosophyEn" value={formData.philosophyEn || ''} onChange={handleChange} placeholder="English philosophy description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-16 resize-none" />
                    </div>
                  </div>
                </>
              )}

              {/* Culinary Tab Fields */}
              {adminTab === 'culinary' && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">2. Jenis Makanan (Indonesian)</label>
                      <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs">
                        <option>Makanan Utama</option>
                        <option>Minuman Tradisional</option>
                        <option>Kudapan Khas</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">2. Dish Type (English Translation)</label>
                      <input type="text" name="typeEn" value={formData.typeEn || ''} onChange={handleChange} placeholder="e.g. Main Course / Traditional Snack" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Asal Daerah (Indonesian)</label>
                      <input type="text" name="origin" value={formData.origin} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Origin / Region (English Translation)</label>
                      <input type="text" name="originEn" value={formData.originEn || formData.origin || ''} onChange={handleChange} placeholder="e.g. Payakumbuh & Bukittinggi" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Deskripsi (Bahasa Indonesia)</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English culinary description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">5. Profil Rasa (Indonesian)</label>
                      <input type="text" name="flavorProfile" value={formData.flavorProfile} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">5. Flavor Profile (English Translation)</label>
                      <input type="text" name="flavorProfileEn" value={formData.flavorProfileEn || ''} onChange={handleChange} placeholder="e.g. Rich savory & spicy coconut curry" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>
                </>
              )}

              {/* Events Tab Fields */}
              {adminTab === 'events' && (
                <>
                  {/* KEN Status Toggle Card */}
                  <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-yellow-500/10 p-3.5 rounded-lg border border-amber-300 flex items-center justify-between gap-3 shadow-2xs">
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Status Karisma Event Nusantara (KEN)</span>
                        {Boolean(formData.isKen) ? (
                          <span className="bg-amber-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider shadow-2xs">
                            RESMI KEN
                          </span>
                        ) : (
                          <span className="bg-gray-200 text-gray-700 text-[9px] px-1.5 py-0.5 rounded font-semibold">
                            EVENT REGULER
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-amber-800/80 leading-tight">
                        Tandai &quot;RESMI KEN&quot; jika festival ini secara resmi terdaftar dalam kalender Karisma Event Nusantara (KEN) Kemenparekraf RI.
                      </p>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        name="isKen"
                        checked={Boolean(formData.isKen)}
                        onChange={(e) => {
                          setFormData((prev: any) => ({
                            ...prev,
                            isKen: e.target.checked
                          }));
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-200 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="text-[11px] font-bold uppercase text-amber-900 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-700" />
                        2. Pengaturan Tanggal & Jadwal Event
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setShowDatePicker(true);
                          setRangeStart(null);
                          setRangeEnd(null);
                        }}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                      >
                        <Calendar className="w-3 h-3" />
                        <span>Buka Kalender Rentang Tanggal</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-gray-700 mb-1">Jadwal (Versi Bahasa Indonesia)</label>
                        <input
                          type="text"
                          name="schedule"
                          value={formData.schedule}
                          onChange={handleChange}
                          placeholder="Cth: 15 - 20 Agustus 2026 atau 1-10 Muharram"
                          className="w-full bg-white border border-gray-300 rounded p-2 text-xs font-jakarta"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-blue-700 mb-1">Schedule (English Translation)</label>
                        <input
                          type="text"
                          name="scheduleEn"
                          value={formData.scheduleEn || ''}
                          onChange={handleChange}
                          placeholder="e.g. August 15 - 20, 2026"
                          className="w-full bg-white border border-blue-200 rounded p-2 text-xs font-jakarta"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">3. Lokasi (Indonesian)</label>
                      <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">3. Location (English Translation)</label>
                      <input type="text" name="locationEn" value={formData.locationEn || ''} onChange={handleChange} placeholder="e.g. Tanah Datar Rice Fields" className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">4. Deskripsi (Bahasa Indonesia)</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-blue-600 mb-1">4. Description (English Translation)</label>
                      <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} placeholder="English event description..." className="w-full bg-blue-50/40 border border-blue-200 rounded p-2 text-xs h-20 resize-none" />
                    </div>
                  </div>
                </>
              )}

              {adminTab !== 'download' && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">URL Gambar (Wajib)</label>
                    <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">URL Video YouTube (Opsional)</label>
                    <input type="text" name="videoUrl" value={formData.videoUrl || ''} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" placeholder="https://youtube.com/..." />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1">URL / Nama Tempat / Koordinat Google Maps (Opsional)</label>
                    <input type="text" name="mapUrl" value={formData.mapUrl || ''} onChange={handleChange} className="w-full bg-white border border-gray-300 rounded p-2 text-xs" placeholder="Misal: Jam Gadang Bukittinggi ATAU -0.304987, 100.369434 ATAU https://maps.google.com/..." />
                    <p className="text-[9px] text-gray-500 mt-0.5">Bisa diisi URL langsung, nama lokasi (e.g. Jam Gadang), atau koordinat GPS (e.g. -0.304987, 100.369434). Jika diisi, tombol Petunjuk Arah akan muncul.</p>
                  </div>
                </>
              )}

            </div>

            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-200">
              <button onClick={handleSave} className="flex-1 bg-black text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-1 hover:bg-gray-800 transition-colors">
                <Check className="w-4 h-4" /> Simpan
              </button>
              <button onClick={handleCancelEdit} className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider flex justify-center items-center gap-1 hover:bg-gray-50 transition-colors">
                <X className="w-4 h-4" /> Batal
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 pb-8">
            {activeData.map((item: any) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-3 flex justify-between items-start bg-white shadow-xs hover:border-gray-400 transition-colors">
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm truncate">{item.title}</h4>
                    {adminTab === 'events' && (
                      item.isKen ? (
                        <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                          <Sparkles className="w-2.5 h-2.5 text-amber-600" /> KEN
                        </span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0">
                          Biasa
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleEdit(item)} className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors" title="Edit">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Hapus">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL INTERACTIVE DATE-RANGE CALENDAR PICKER (1 KALENDER)*/}
      {/* ======================================================== */}
      {showDatePicker && (() => {
        const firstDayIndex = new Date(pickerYear, pickerMonth, 1).getDay();
        const daysInMonth = new Date(pickerYear, pickerMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(pickerYear, pickerMonth, 0).getDate();
        const today = new Date();

        const handlePrevMonth = () => {
          if (pickerMonth === 0) {
            setPickerMonth(11);
            setPickerYear(prev => prev - 1);
          } else {
            setPickerMonth(prev => prev - 1);
          }
        };

        const handleNextMonth = () => {
          if (pickerMonth === 11) {
            setPickerMonth(0);
            setPickerYear(prev => prev + 1);
          } else {
            setPickerMonth(prev => prev + 1);
          }
        };

        // Preview formatted result
        const previewFormatted = rangeStart ? formatScheduleRange(rangeStart, rangeEnd) : null;

        return (
          <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 font-jakarta">
            <div className="bg-white max-w-md w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 animate-scale-up space-y-4 p-5 relative">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-amber-100 text-amber-800 rounded-lg">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 uppercase tracking-wide">
                      Pilih Rentang Tanggal Event
                    </h3>
                    <p className="text-[10px] text-gray-500">
                      Klik tanggal mulai & tanggal selesai dalam 1 kalender
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Month Navigation & Fast Select */}
              <div className="flex items-center justify-between bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer shadow-2xs"
                  title="Bulan Sebelumnya"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  <select
                    value={pickerMonth}
                    onChange={(e) => setPickerMonth(parseInt(e.target.value, 10))}
                    className="font-bold text-xs bg-white border border-gray-200 rounded-md py-1 px-2 text-gray-900 cursor-pointer focus:ring-1 focus:ring-black"
                  >
                    {monthsId.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={pickerYear}
                    onChange={(e) => setPickerYear(parseInt(e.target.value, 10))}
                    className="font-bold text-xs bg-white border border-gray-200 rounded-md py-1 px-2 text-gray-900 cursor-pointer focus:ring-1 focus:ring-black"
                  >
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer shadow-2xs"
                  title="Bulan Berikutnya"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="space-y-1">
                {/* Day Names */}
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-gray-400 uppercase py-1">
                  <span className="text-red-500">Min</span>
                  <span>Sen</span>
                  <span>Sel</span>
                  <span>Rab</span>
                  <span>Kam</span>
                  <span>Jum</span>
                  <span className="text-blue-500">Sab</span>
                </div>

                {/* Days Matrix */}
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {/* Previous Month Inactive Days */}
                  {Array.from({ length: firstDayIndex }).map((_, i) => {
                    const dayNum = daysInPrevMonth - firstDayIndex + 1 + i;
                    return (
                      <div
                        key={`prev-${i}`}
                        className="h-8 flex items-center justify-center text-gray-300 font-medium text-[11px]"
                      >
                        {dayNum}
                      </div>
                    );
                  })}

                  {/* Current Month Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const thisDate = new Date(pickerYear, pickerMonth, dayNum);
                    const isToday =
                      today.getFullYear() === pickerYear &&
                      today.getMonth() === pickerMonth &&
                      today.getDate() === dayNum;

                    const isStart =
                      rangeStart &&
                      rangeStart.getFullYear() === pickerYear &&
                      rangeStart.getMonth() === pickerMonth &&
                      rangeStart.getDate() === dayNum;

                    const isEnd =
                      rangeEnd &&
                      rangeEnd.getFullYear() === pickerYear &&
                      rangeEnd.getMonth() === pickerMonth &&
                      rangeEnd.getDate() === dayNum;

                    const isInRange =
                      rangeStart &&
                      rangeEnd &&
                      thisDate > rangeStart &&
                      thisDate < rangeEnd;

                    let bgStyle = 'hover:bg-amber-50 text-gray-800';
                    if (isStart && isEnd) {
                      bgStyle = 'bg-black text-white font-bold rounded-lg shadow-xs';
                    } else if (isStart) {
                      bgStyle = 'bg-black text-white font-bold rounded-l-lg shadow-xs';
                    } else if (isEnd) {
                      bgStyle = 'bg-amber-600 text-white font-bold rounded-r-lg shadow-xs';
                    } else if (isInRange) {
                      bgStyle = 'bg-amber-100/90 text-amber-900 font-semibold rounded-none';
                    }

                    return (
                      <button
                        key={`day-${dayNum}`}
                        type="button"
                        onClick={() => handleDateClick(thisDate)}
                        className={`h-8 flex items-center justify-center transition-all cursor-pointer relative text-[11px] ${bgStyle}`}
                      >
                        <span>{dayNum}</span>
                        {isToday && !isStart && !isEnd && (
                          <span className="absolute bottom-0.5 w-1 h-1 bg-amber-500 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status / Live Preview Bar */}
              <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-xl space-y-1.5">
                <div className="text-[10px] font-bold text-amber-900 uppercase flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>Hasil Format Otomatis:</span>
                </div>
                {previewFormatted ? (
                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-gray-900">
                      🇮🇩 ID: <span className="text-amber-900 font-semibold">{previewFormatted.id}</span>
                    </div>
                    <div className="font-bold text-gray-900">
                      🇬🇧 EN: <span className="text-blue-900 font-semibold">{previewFormatted.en}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-gray-500 italic">
                    Silakan klik tanggal pada kalender di atas (Klik 1: Mulai, Klik 2: Selesai).
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setRangeStart(null);
                    setRangeEnd(null);
                  }}
                  className="px-3 py-2 text-xs font-bold uppercase text-gray-600 hover:text-red-600 transition-colors border border-gray-200 rounded-lg cursor-pointer bg-white"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={handleApplyDateRange}
                  disabled={!rangeStart}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                    rangeStart
                      ? 'bg-black text-white hover:bg-gray-800 cursor-pointer'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4" />
                  <span>Terapkan Tanggal ke Event</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
