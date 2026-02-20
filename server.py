#!/usr/bin/env python3
"""
Simple HTTP Server untuk Website Birthday Dian
Dibuat oleh: M. Raditya Bagus Dinata
UNIKOM - Teknik Informatika

Cara Pakai:
1. Pastikan semua file (index.html, styles.css, script.js, foto-foto) ada dalam satu folder
2. Jalankan: python server.py
3. Buka browser: http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Konfigurasi Server
PORT = 8000
DIRECTORY = Path(__file__).parent

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom HTTP Request Handler dengan MIME types yang benar"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        """Tambahkan headers untuk CORS dan cache"""
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Custom log message dengan warna"""
        print(f"🌐 [{self.address_string()}] {format % args}")

def main():
    """Main function untuk menjalankan server"""
    
    # Clear console
    os.system('clear' if os.name != 'nt' else 'cls')
    
    # Banner
    print("=" * 60)
    print(" 🎉 BIRTHDAY WEBSITE SERVER - DIAN FITRI RUDIANA 🎉")
    print("=" * 60)
    print(f"📁 Directory: {DIRECTORY}")
    print(f"🌐 Server Port: {PORT}")
    print("=" * 60)
    
    # Cek file penting
    required_files = ['index.html', 'styles.css', 'script.js']
    missing_files = []
    
    for file in required_files:
        file_path = DIRECTORY / file
        if file_path.exists():
            print(f"✅ {file} - Found")
        else:
            print(f"❌ {file} - NOT FOUND!")
            missing_files.append(file)
    
    print("=" * 60)
    
    if missing_files:
        print("\n⚠️  PERINGATAN: Beberapa file tidak ditemukan!")
        print(f"Missing: {', '.join(missing_files)}")
        print("Pastikan semua file ada di folder yang sama dengan server.py\n")
    
    # Buat server
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            url = f"http://localhost:{PORT}"
            
            print(f"\n🚀 Server is running!")
            print(f"🔗 URL: {url}")
            print(f"\n💡 Tips:")
            print("   - Tekan Ctrl+C untuk stop server")
            print("   - Buka browser dan masuk ke URL di atas")
            print("=" * 60)
            
            # Buka browser otomatis
            try:
                print("\n🌐 Membuka browser...")
                webbrowser.open(url)
            except:
                pass
            
            # Start serving
            print(f"\n📡 Server listening on port {PORT}...")
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped")
    except OSError as e:
        if e.errno == 48 or e.errno == 98:
            print(f"\n❌ ERROR: Port {PORT} sudah digunakan!")
            print(f"Ubah PORT di baris 19 file ini")
        else:
            print(f"\n❌ ERROR: {e}")

if __name__ == "__main__":
    main()
