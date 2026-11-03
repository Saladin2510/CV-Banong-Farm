Add-Type -AssemblyName System.Drawing
$imgPath = Resolve-Path "public/assets/tampak_depan_toko.png"
$img = [System.Drawing.Image]::FromFile($imgPath)
$w = $img.Width
$h = $img.Height
$wSlice = [int]($w / 3)

Write-Host "Image Size: $w x $h. Slice Width: $wSlice"

# Slice 1 (Left 1/3)
$bmp1 = New-Object System.Drawing.Bitmap $wSlice, $h
$g1 = [System.Drawing.Graphics]::FromImage($bmp1)
$g1.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g1.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $wSlice, $h), 0, 0, $wSlice, $h, [System.Drawing.GraphicsUnit]::Pixel)
$g1.Dispose()
$bmp1.Save("public/assets/tampak_depan_toko_slice1.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp1.Dispose()

# Slice 2 (Middle 1/3)
$bmp2 = New-Object System.Drawing.Bitmap $wSlice, $h
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g2.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $wSlice, $h), $wSlice, 0, $wSlice, $h, [System.Drawing.GraphicsUnit]::Pixel)
$g2.Dispose()
$bmp2.Save("public/assets/tampak_depan_toko_slice2.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()

# Slice 3 (Right 1/3)
$wSlice3 = $w - ($wSlice * 2)
$bmp3 = New-Object System.Drawing.Bitmap $wSlice3, $h
$g3 = [System.Drawing.Graphics]::FromImage($bmp3)
$g3.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g3.DrawImage($img, (New-Object System.Drawing.Rectangle 0, 0, $wSlice3, $h), ($wSlice * 2), 0, $wSlice3, $h, [System.Drawing.GraphicsUnit]::Pixel)
$g3.Dispose()
$bmp3.Save("public/assets/tampak_depan_toko_slice3.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp3.Dispose()

$img.Dispose()
Write-Host "Success! Created slice1, slice2, slice3."
