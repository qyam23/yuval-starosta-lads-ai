param(
  [string]$Message = "Update homepage and industrial landing page"
)

$ErrorActionPreference = "Stop"

function Require-CleanMessage {
  param([string]$CommitMessage)

  if ([string]::IsNullOrWhiteSpace($CommitMessage)) {
    throw "Commit message cannot be empty."
  }
}

Require-CleanMessage -CommitMessage $Message

$branch = git branch --show-current

if ([string]::IsNullOrWhiteSpace($branch)) {
  throw "Could not determine the current git branch."
}

$status = git status --short

if (-not $status) {
  Write-Host "No changes to commit."
  exit 0
}

Write-Host "Staging changes..."
git add .

Write-Host "Creating commit..."
git commit -m $Message

Write-Host "Pushing to origin/$branch ..."
git push origin $branch

Write-Host "Done. Repository updated on origin/$branch."
