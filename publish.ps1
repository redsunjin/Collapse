param (
    [switch]$StageOnly,
    [switch]$PushOnly
)

$PublicRepoUrl = "https://github.com/redsunjin/Collapse.git"
$TempDir = "../collapse_temp_dist"
$PublishBranch = "publish"

Write-Host "--- 붕괴(Collapse) 양자 배포 파이프라인 ---" -ForegroundColor Cyan

# 0. Logic Selection
$DoStage = $true
$DoPush = $true

if ($StageOnly) { $DoPush = $false }
if ($PushOnly) { $DoStage = $false }

if ($DoStage) {
    # 1. Check for uncommitted changes on develop
    $status = git status --porcelain
    if ($status) {
        Write-Host "[WARNING] 커밋되지 않은 변경사항이 있습니다. 먼저 커밋해주세요." -ForegroundColor Yellow
        exit
    }

    # 2. Preparation
    if (Test-Path $TempDir) { Remove-Item -Recurse -Force $TempDir }
    New-Item -ItemType Directory -Path $TempDir | Out-Null

    # 3. Copy Sanitized Files
    Write-Host "[1/3] 스테이징 영역으로 파일 정제 및 복사 중..." -ForegroundColor Green
    $PublicFiles = "index.html", "style.css", "engine.js", "story_data.js", "MANUAL.md", ".gitignore", "src/content"

    foreach ($file in $PublicFiles) {
        if (Test-Path $file) {
            if (Test-Path $file -PathType Container) {
                Copy-Item -Path $file -Destination $TempDir -Recurse -Force
            }
            else {
                Copy-Item -Path $file -Destination $TempDir -Force
            }
        }
    }

    if (Test-Path "README_PUBLIC.md") {
        Copy-Item "README_PUBLIC.md" "$TempDir/README.md"
    }
    else {
        Copy-Item "README.md" $TempDir
    }

    # 4. History Sanitization & Local Branch Update
    Write-Host "[2/3] 로컬 publish 브랜치 이력 정제 중..." -ForegroundColor Green
    Push-Location $TempDir
    git init | Out-Null
    git add .
    git commit -m "collapse(narrative): official observation log - the reality is actualized" | Out-Null
    Pop-Location

    # Replace local publish branch with the sanitized one
    git checkout $PublishBranch
    git reset --hard (Get-Content (Join-Path $TempDir ".git/refs/heads/master") -Raw).Trim()
    git checkout develop

    Remove-Item -Recurse -Force $TempDir
    Write-Host "[3/3] 스테이징 완료. 'git checkout publish'로 확인하세요." -ForegroundColor Cyan
}

if ($DoPush) {
    Write-Host "[PUSH] 공개 저장소로 배포 중..." -ForegroundColor Green
    git push public publish:main --force
    Write-Host "--- 배포 완료: 관측된 현실이 확정되었습니다. ---" -ForegroundColor Cyan
}
