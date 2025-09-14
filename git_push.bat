@echo off
echo Pushing portfolio to GitHub...
git add .
git commit -m "Update portfolio website"
git push -u origin main
echo Push completed!
pause
