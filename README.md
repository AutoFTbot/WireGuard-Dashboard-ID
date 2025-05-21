# WireGuard Dashboard
Versi 3.0.7 (15.05.2025)<br><br>

Memantau WireGuard tidak mudah, Anda harus masuk ke server dan mengetik wg show

Karena itulah saya membuat platform ini untuk melihat semua pengaturan dan mengelolanya dengan cara yang lebih sederhana

Sistem operasi yang didukung: Ubuntu 20 ~ 22 / Debian 11 (Direkomendasikan: Ubuntu 22)
<br>
<br>

## Instalasi Otomatis

<div align="left">
 
 - Salin kode berikut ke server Ubuntu Anda
</div>

<div align="left">
 
```
sudo wget https://raw.githubusercontent.com/AutoFTbot/WireGuard-Dashboard-ID/main/setup_wireguard.sh && sudo chmod +x setup_wireguard.sh && sudo ./setup_wireguard.sh
```
</div>
<div align="left">

- Masuk ke panel menggunakan username admin, password 1234 dan port 1000 (Server-IP:1000)
- Jika menggunakan tunnel, ubah Peer Remote Endpoint di pengaturan ke IP Indonesia
- Jika Anda menggunakan server Digital Ocean, ikuti panduan instalasi manual panel WireGuard.
</div><br>

--------------
<div align="left">
  <details>
    <summary><strong>Instalasi Manual</strong></summary>
   <br>
<div align="left">
 
 - Perbarui server dan instal WireGuard
</div>
<div align="left">
 
```
apt update -y
apt install wireguard -y
```
</div>
<div align="left">
 
 - Buat private key dengan perintah berikut dan catat di suatu tempat
 
 
</div>
<div align="left">
 
```
wg genkey | sudo tee /etc/wireguard/server_private.key
```
</div>
<div align="left">


- Dapatkan interface default, teks setelah dev adalah nama interface Anda (misalnya eth0)
</div>
<div align="left">
 
```
ip route list default
```
</div>
<div align="left">


- Masuk ke direktori konfigurasi WireGuard dengan perintah berikut
</div>
<div align="left">
 
```
nano /etc/wireguard/wg0.conf
```
</div>
<div align="left">

- Salin teks berikut ke dalamnya
</div>
<div align="left">
  
```
[Interface]
Address = 172.20.0.1/24
PostUp = iptables -I INPUT -p udp --dport 40600 -j ACCEPT
PostUp = iptables -I FORWARD -i eth0 -o wg0 -j ACCEPT
PostUp = iptables -I FORWARD -i wg0 -j ACCEPT
PostUp = iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostUp = ip6tables -I FORWARD -i wg0 -j ACCEPT
PostUp = ip6tables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D INPUT -p udp --dport 40600 -j ACCEPT
PostDown = iptables -D FORWARD -i eth0 -o wg0 -j ACCEPT
PostDown = iptables -D FORWARD -i wg0 -j ACCEPT
PostDown = iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
PostDown = ip6tables -D FORWARD -i wg0 -j ACCEPT
PostDown = ip6tables -t nat -D POSTROUTING -o eth0 -j MASQUERADE
ListenPort = 40600
PrivateKey = YOUR_GENERATED_PRIVATE_KEY
SaveConfig = true
```
</div>
<div align="left">

- Port WireGuard di sini adalah 40600, Anda dapat memilih port lain
- Perhatikan bahwa untuk server Digital Ocean, gunakan private IP yang berbeda
- Ganti YOUR_GENERATED_PRIVATE_KEY dengan private key yang telah Anda buat
- Nama interface diset default ke eth0, jika interface Anda berbeda, edit perintah di atas
- Untuk membuat interface tambahan dengan port berbeda, ikuti metode di atas hanya dengan mengubah nama, port dan IP
</div>
<div align="left">
 
```
apt update
apt install git
git clone https://github.com/AutoFTbot/WireGuard-Dashboard-ID.git
cd WireGuard-Dashboard-ID
mv src /root/
cd
rm -rf WireGuard-Dashboard-ID
apt-get -y install python3-pip
apt install gunicorn -y
cd src
sudo chmod u+x wgd.sh
pip install -r requirements.txt
sudo ./wgd.sh install
sudo chmod -R 755 /etc/wireguard
./wgd.sh start
(crontab -l 2>/dev/null; echo "@reboot cd src && ./wgd.sh restart") | crontab -
```
</div>
<div align="left">

- Masuk ke panel Anda di http://Your_Server_IP:1000. Username adalah admin dan password adalah 1234
- Jika menggunakan tunnel, ubah Peer Remote Endpoint di pengaturan ke IP Indonesia
- Untuk pengaturan tunnel server Indonesia dan luar negeri, lihat [link ini](https://github.com/amirmbn/UDP2RAW)
<div>
  </details>
</div>

--------------
<div align="left">
  <details>
    <summary><strong>Hapus Panel WireGuard</strong></summary>
   <br>
<div align="left">

 
 - Untuk menghapus WireGuard dan panel sepenuhnya, masukkan kode berikut ke server Ubuntu Anda
</div>
<div align="left">
 
```
cd
rm -rf src
rm -rf /etc/wireguard
sudo apt remove wireguard -y
```
</div>
<div align="left">
 
 - Jika setelah penghapusan Anda berencana untuk menginstal ulang panel, masukkan kode berikut sebelum instalasi
 
 
</div>
<div align="left">
 
```
mkdir /etc/wireguard
```

  </details>
</div>

--------------
<br>
