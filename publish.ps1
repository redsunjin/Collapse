$PublicRepoUrl = "https://github.com/redsunjin/Collapse.git"
$TempDir = "../collapse_temp_dist"

Write-Host "--- 붕괴(Collapse) 클린 스윕 배포 시작 ---" -ForegroundColor Cyan

# 1. Check for uncommitted changes on current branch (usually develop)
$status = git status --porcelain
if ($status) {
    Write-Host "[WARNING] 커밋되지 않은 변경사항이 있습니다. 먼저 커밋해주세요." -ForegroundColor Yellow
    exit
}

# 2. Preparation: Create a clean temp directory
if (Test-Path $TempDir) { Remove-Item -Recurse -Force $TempDir }
New-Item -ItemType Directory -Path $TempDir | Out-Null

# 3. Copy only Sanitized Files from current branch (develop)
Write-Host "[1/4] 공개 가능한 파일들만 선별 복사 중..." -ForegroundColor Green
$PublicFiles = "index.html", "style.css", "engine.js", "story_data.js", "MANUAL.md", ".gitignore"

foreach ($file in $PublicFiles) {
    if (Test-Path $file) { Copy-Item $file $TempDir }
}

# Special README Handling (Reader-centric)
if (Test-Path "README_PUBLIC.md") {
    Copy-Item "README_PUBLIC.md" "$TempDir/README.md"
}
else {
    Copy-Item "README.md" $TempDir
}

# 4. Initialize NEW history in the temp directory
Write-Host "[2/4] 공개 저장소용 전용 이력 생성 중 (History Sanitization)..." -ForegroundColor Green
Push-Location $TempDir
git init | Out-Null
git remote add public $PublicRepoUrl
git add .
git commit -m "collapse(narrative): official observation log - the reality is actualized" | Out-Null

# 5. Force Push as the ONLY truth
Write-Host "[3/4] 공개 저장소로 강제 푸시(Force Push) 중..." -ForegroundColor Green
git push public master:main --force

# 6. Cleanup
Pop-Location
Remove-Item -Recurse -Force $TempDir
Write-Host "[4/4] 임시 데이터 정리 완료." -ForegroundColor Green

Write-Host "--- 배포 완료: 공개 저장소에는 오직 '붕괴'만이 존재합니다. ---" -ForegroundColor Cyan
