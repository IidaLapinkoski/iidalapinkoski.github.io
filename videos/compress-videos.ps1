# Video compression script for portfolio
$outputDir = "optimized"

# Get all mp4 files recursively, excluding the optimized folder
$videos = Get-ChildItem -Recurse -Filter *.mp4 | Where-Object { $_.FullName -notlike "*optimized*" }

foreach ($video in $videos) {
    # Get relative path structure
    $relativePath = $video.DirectoryName.Replace($PWD.Path, "").TrimStart("\")
    $outputPath = Join-Path $outputDir $relativePath
    
    # Create output directory if it doesn't exist
    if (!(Test-Path $outputPath)) {
        New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
    }
    
    $outputFile = Join-Path $outputPath $video.Name
    
    Write-Host "Compressing: $($video.FullName)" -ForegroundColor Cyan
    Write-Host "Output to: $outputFile" -ForegroundColor Gray
    
    # Compress video: 720p, CRF 23 (better quality), medium preset
    & "C:\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe" -i $video.FullName `
        -vf "scale=-2:720" `
        -c:v libx264 `
        -crf 23 `
        -preset medium `
        -c:a aac `
        -b:a 128k `
        -map_metadata -1 `
        $outputFile `
        -y 2>&1 | Out-Null
    
    if (Test-Path $outputFile) {
        $originalSize = [math]::Round($video.Length/1MB, 2)
        $newSize = [math]::Round((Get-Item $outputFile).Length/1MB, 2)
        $savings = [math]::Round((($video.Length - (Get-Item $outputFile).Length) / $video.Length) * 100, 1)
        Write-Host "  Original: $originalSize MB -> Compressed: $newSize MB (Saved $savings%)" -ForegroundColor Green
    }
    
    Write-Host ""
}

Write-Host "Compression complete! Check the 'optimized' folder." -ForegroundColor Green
Write-Host "To use optimized videos, copy them back to their original folders." -ForegroundColor Yellow
