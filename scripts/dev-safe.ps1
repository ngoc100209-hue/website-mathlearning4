$port = 3001
$listener = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1

if ($listener) {
  try {
    Stop-Process -Id $listener.OwningProcess -Force -ErrorAction Stop
    Write-Host "Freed port $port (PID $($listener.OwningProcess))."
  } catch {
    Write-Host "Failed to stop PID $($listener.OwningProcess): $($_.Exception.Message)"
  }
} else {
  Write-Host "Port $port is already free."
}

npm.cmd run dev
