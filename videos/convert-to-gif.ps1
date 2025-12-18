# Convert videos to optimized GIFs
$baseDir = "D:\Website\IidaPortfolio\public\videos"
$outputDir = Join-Path $baseDir "gifs"

# Get all mp4 files recursively from the base directory
$videos = Get-ChildItem -Path $baseDir -Recurse -Filter *.mp4 | Where-Object { $_.FullName -notlike "*gifs*" -and $_.FullName -notlike "*optimized*" -and $_.FullName -notlike "*originals-backup*" }

Write-Host "Found $($videos.Count) videos to convert" -ForegroundColor Yellow

foreach ($video in $videos) {
    $relativePath = $video.DirectoryName.Replace($baseDir, "").TrimStart("\")
    $outputPath = Join-Path $outputDir $relativePath
    
    if (!(Test-Path $outputPath)) {
        New-Item -ItemType Directory -Path $outputPath -Force | Out-Null
    }
    
    $outputFile = Join-Path $outputPath ($video.BaseName + ".gif")
    
    Write-Host "Converting: $($video.Name)" -ForegroundColor Cyan
    Write-Host "Output to: $outputFile" -ForegroundColor Gray
    
    # Convert to GIF: scale to 720p width, 15fps for smaller size, optimize palette
    & "C:\ffmpeg\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe" -i $video.FullName `
        -vf "fps=15,scale=720:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse" `
        -loop 0 `
        $outputFile `
        -y 2>&1 | Out-Null
    
    if (Test-Path $outputFile) {
        $originalSize = [math]::Round($video.Length/1MB, 2)
        $newSize = [math]::Round((Get-Item $outputFile).Length/1MB, 2)
        Write-Host "  Original MP4: $originalSize MB -> GIF: $newSize MB" -ForegroundColor Green
    }
    
    Write-Host ""
}

Write-Host "Conversion complete! Check the 'gifs' folder." -ForegroundColor Green
