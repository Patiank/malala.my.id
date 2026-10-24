@echo off
:: ================================================================
:: MALALA AUTONOMOUS ENGINE - Windows Task Scheduler Setup
:: Menjalankan malala-autonomous-engine.mjs setiap hari pukul 03:00
:: ================================================================

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  🤖 MALALA AUTONOMOUS ENGINE - Setup Task Scheduler     ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.

:: Set path ke direktori proyek
set PROJECT_DIR=%~dp0..
set NODE_PATH=node
set SCRIPT_PATH=%PROJECT_DIR%\scripts\autonomous-daily-sync.mjs
set LOG_PATH=%PROJECT_DIR%\scripts\autonomous-engine.log

echo [1/3] Menghapus task lama jika ada...
schtasks /delete /tn "Malala Autonomous Engine" /f 2>nul
echo       OK

echo [2/3] Membuat task baru (setiap hari pukul 03:00 WIB)...
schtasks /create ^
  /tn "Malala Autonomous Engine" ^
  /tr "node \"%SCRIPT_PATH%\" >> \"%LOG_PATH%\" 2>&1" ^
  /sc DAILY ^
  /st 03:00 ^
  /ru SYSTEM ^
  /rl HIGHEST ^
  /f

if %errorlevel% == 0 (
  echo       ✅ Task Scheduler berhasil dikonfigurasi!
) else (
  echo       ⚠️  Gagal membuat task. Coba jalankan sebagai Administrator.
)

echo [3/3] Verifikasi task...
schtasks /query /tn "Malala Autonomous Engine" /fo LIST 2>nul

echo.
echo  ╔══════════════════════════════════════════════════════════╗
echo  ║  ✅ SELESAI! Malala Autonomous Engine aktif 24/7        ║
echo  ║                                                          ║
echo  ║  Jadwal: Setiap hari pukul 03:00 WIB                   ║
echo  ║  Log: scripts\autonomous-engine.log                     ║
echo  ║                                                          ║
echo  ║  Jalankan manual: node scripts\malala-autonomous-engine.mjs ║
echo  ╚══════════════════════════════════════════════════════════╝
echo.
pause
