Write-Host "✅ Construction Angular (production)..."
ng build --configuration production --output-path=www
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Échec de la compilation Angular."
    exit $LASTEXITCODE
}

Write-Host "✅ Copie vers Capacitor..."
npx cap copy android

Write-Host "✅ Synchronisation Capacitor..."
npx cap sync android

Write-Host "✅ Ouverture d'Android Studio..."
npx cap open android
