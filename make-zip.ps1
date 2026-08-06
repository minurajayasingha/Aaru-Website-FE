Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$root = (Get-Location).Path
$zipPath = Join-Path $root 'next-build-v2.zip'
if (Test-Path $zipPath) { Remove-Item $zipPath }

$archive = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
$baseDir = (Resolve-Path '.next').Path
$files = Get-ChildItem -Path $baseDir -Recurse -File

foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($root.Length + 1)
    $entryName = $relativePath.Replace([System.IO.Path]::DirectorySeparatorChar, '/')
    [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archive, $file.FullName, $entryName, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
}

$archive.Dispose()
Write-Host "Done: $zipPath"
