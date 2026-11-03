import os
import zipfile

dist_dir = 'dist'
zip_filename = 'dist_upload.zip'

if not os.path.exists(dist_dir):
    print(f"Error: Folder '{dist_dir}' tidak ditemukan. Jalankan 'npm run build' terlebih dahulu.")
    exit(1)

print(f"Mengompres folder '{dist_dir}' menjadi '{zip_filename}' dengan format POSIX Linux...")

count = 0
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk(dist_dir):
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, dist_dir)
            # Pastikan selalu menggunakan forward slash '/' agar Linux/Hostinger mengenalinya sebagai folder
            archive_name = rel_path.replace('\\', '/')
            zipf.write(full_path, archive_name)
            count += 1

print(f"Sukses! {count} file berhasil dikemas ke '{zip_filename}'.")
print("File ini siap diunggah dan diekstrak di Hostinger File Manager.")
