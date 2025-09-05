Param(
  [int]$Port = 8000
)

Add-Type -AssemblyName System.Web
$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Serving $prefix (Ctrl+C to stop) from $((Get-Location).Path)"

# Simple content-type resolver
function Get-MimeType([string]$path) {
  $ext = [System.IO.Path]::GetExtension($path).ToLower()
  switch ($ext) {
    '.html' { 'text/html' }
    '.htm'  { 'text/html' }
    '.css'  { 'text/css' }
    '.js'   { 'application/javascript' }
    '.json' { 'application/json' }
    '.png'  { 'image/png' }
    '.jpg'  { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.svg'  { 'image/svg+xml' }
    '.ico'  { 'image/x-icon' }
    default { 'application/octet-stream' }
  }
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $req = $context.Request
    $path = $req.Url.LocalPath.TrimStart('/')
    if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
    $file = Join-Path (Get-Location) $path
    if (-not (Test-Path -LiteralPath $file)) {
      $context.Response.StatusCode = 404
      $bytes = [System.Text.Encoding]::UTF8.GetBytes("Not found: $path")
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
      $context.Response.Close()
      continue
    }
    try {
      $bytes = [System.IO.File]::ReadAllBytes($file)
      $context.Response.ContentType = Get-MimeType -path $file
      $context.Response.StatusCode = 200
      $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } catch {
      $context.Response.StatusCode = 500
      $err = [System.Text.Encoding]::UTF8.GetBytes($_.Exception.Message)
      $context.Response.OutputStream.Write($err, 0, $err.Length)
    } finally {
      $context.Response.Close()
    }
  }
} finally {
  $listener.Stop()
  $listener.Close()
}
