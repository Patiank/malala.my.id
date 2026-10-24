$taskName = "MalalaAutonomousEngine"
$scriptPath = "D:\Web Project\Malala\scripts\run-autonomous-engine.bat"
$logPath = "D:\Web Project\Malala\scripts\autonomous-engine.log"

# Remove existing task if any
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Create action
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c `"$scriptPath`""

# Create trigger: daily at 03:00
$trigger = New-ScheduledTaskTrigger -Daily -At "03:00AM"

# Settings
$settings = New-ScheduledTaskSettingsSet -ExecutionTimeLimit (New-TimeSpan -Hours 2) -StartWhenAvailable

# Register task running as SYSTEM
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -RunLevel Highest -Force

Write-Host ""
Write-Host "✅ Malala Autonomous Engine terdaftar di Task Scheduler!"
Write-Host "   Nama Task: $taskName"
Write-Host "   Jadwal: Setiap hari pukul 03:00 WIB"
Write-Host "   Script: $scriptPath"
Write-Host ""

# Show the task
Get-ScheduledTask -TaskName $taskName | Select-Object TaskName, State
