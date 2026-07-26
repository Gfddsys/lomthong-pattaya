# 🚚 ย้าย n8n จาก Google Cloud ไป VPS ราคาถูก

> **เป้าหมาย:** ลดจาก ฿1,470/เดือน → **฿130-150/เดือน** โดยยังใช้ n8n เหมือนเดิมทุกอย่าง
> **เวลาที่ใช้:** ~45 นาที
> **ของที่ต้องมี:** ไฟล์ `n8n-backup-2026-07-25.tar.gz` ที่สำรองไว้แล้ว + บัตรเครดิต/เดบิต

---

## 📊 เลือก VPS

| ผู้ให้บริการ | สเปก | ราคา/เดือน | ความเห็น |
|---|---|---|---|
| **Hetzner CX22** ⭐ | 2 vCPU / 4 GB / 40 GB | **~฿145** (€3.79) | **แนะนำ** — เสถียร เร็ว ใช้ง่าย |
| Hetzner CX11 | 2 vCPU / 2 GB / 20 GB | ~฿130 (€3.35) | ถูกกว่านิดหน่อย พอใช้ |
| Contabo VPS S | 4 vCPU / 6 GB / 100 GB | ~฿175 (€4.5) | สเปกเยอะ แต่ CPU ช้ากว่าสเปก |
| Oracle Cloud Always Free | 2 OCPU / 12 GB (ARM) | **฿0** | ฟรีจริง แต่สมัครยาก + มักเจอ "Out of capacity" |

### ผมแนะนำ **Hetzner CX22**
- n8n ใช้ RAM ไม่ถึง 1 GB — 4 GB เหลือเฟือ ไม่ต้องกลัวเต็มแบบเดิม
- ดิสก์ 40 GB (เดิม 9.7 GB เต็มบ่อย)
- จ่ายเดือนละ ~฿145 = **ประหยัดปีละ ~฿16,000** จากเดิม

> **เรื่อง Oracle ฟรี:** ฟรีจริงและสเปกดีมาก แต่มีชื่อเสียงเรื่องสมัครไม่ผ่าน / สร้างเครื่อง ARM ไม่ได้เพราะเต็ม / บัญชีถูกปิดถ้าไม่ได้ใช้งาน — ถ้าเป็นระบบที่ต้องพึ่งพาจริง Hetzner คุ้มกว่าที่ ฿145

---

## ขั้นที่ 1 — สมัคร Hetzner + สร้างเซิร์ฟเวอร์

1. เข้า https://console.hetzner.cloud → สมัครบัญชี (ยืนยันตัวตนด้วยบัตร)
2. **New Project** → ตั้งชื่อ `n8n`
3. **Add Server** ตั้งค่าตามนี้:

| ช่อง | เลือก |
|---|---|
| Location | **Singapore** (ใกล้ไทยสุด) หรือ Nuremberg (ถูกสุด) |
| Image | **Ubuntu 24.04** |
| Type | **Shared vCPU → CX22** |
| Networking | ติ๊ก IPv4 |
| SSH Keys | ข้ามได้ (จะใช้รหัสผ่านที่ส่งเมล) |
| Name | `n8n-server` |

4. กด **Create & Buy now**
5. รอ ~30 วินาที → จดเลข **IP** ที่ได้ (เช่น `5.223.xx.xx`)
6. รหัส root จะถูกส่งเข้าอีเมล

---

## ขั้นที่ 2 — เชื่อมต่อเข้าเซิร์ฟเวอร์

เปิด **PowerShell** ในเครื่องคุณ:

```powershell
ssh root@<IP-ที่ได้>
```

- ถามว่า `Are you sure...` → พิมพ์ `yes`
- ใส่รหัสจากอีเมล → ระบบจะให้ตั้งรหัสใหม่ (ตั้งแล้วจดไว้)

---

## ขั้นที่ 3 — ติดตั้ง Docker

ก๊อปทั้งก้อนวางแล้ว Enter (ใช้เวลา ~2 นาที):

```bash
apt update && apt upgrade -y
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker
docker --version
```

ขึ้นเลขเวอร์ชัน = สำเร็จ

---

## ขั้นที่ 4 — อัปไฟล์สำรองขึ้นเซิร์ฟเวอร์ใหม่

เปิด **PowerShell หน้าต่างใหม่** (อย่าปิดอันที่ ssh อยู่) แล้วรัน:

```powershell
cd C:\Users\Thanathat\Downloads
scp n8n-backup-2026-07-25.tar.gz root@<IP-ที่ได้>:/root/
```

> เปลี่ยน path ให้ตรงกับที่คุณเก็บไฟล์ไว้จริง

---

## ขั้นที่ 5 — กู้ข้อมูล + เปิด n8n

กลับไปหน้าต่าง SSH แล้วรัน:

```bash
# แตกไฟล์สำรองไปที่ /home (จะได้โฟลเดอร์ /home/n8n_data)
tar -xzf /root/n8n-backup-2026-07-25.tar.gz -C /home

# ตั้งสิทธิ์ให้ตรงกับ user ใน container (node = uid 1000)
chown -R 1000:1000 /home/n8n_data

# เปิด n8n
docker run -d --restart unless-stopped --name n8n \
  -p 5678:5678 \
  -e GENERIC_TIMEZONE="Asia/Bangkok" \
  -e TZ="Asia/Bangkok" \
  -e N8N_SECURE_COOKIE=false \
  -v /home/n8n_data:/home/node/.n8n \
  docker.n8n.io/n8nio/n8n

# ดูว่ารันขึ้นไหม
sleep 15 && docker ps && docker logs n8n --tail 20
```

> **`N8N_SECURE_COOKIE=false` สำคัญมาก** — ถ้าไม่ใส่ จะเปิดหน้า login ไม่ได้เมื่อเข้าผ่าน IP แบบ http

---

## ขั้นที่ 6 — เปิดไฟร์วอลล์

**ใน Hetzner Console:** เมนู **Firewalls** → Create Firewall → Inbound rules เพิ่ม:
- TCP port `22` (SSH)
- TCP port `5678` (n8n)

แล้ว Apply กับเซิร์ฟเวอร์

---

## ขั้นที่ 7 — ทดสอบ

เปิดเบราว์เซอร์ไปที่:
```
http://<IP-ที่ได้>:5678
```

- ✅ เห็นหน้า login n8n เดิม → **ล็อกอินด้วยบัญชีเดิม** → workflow และ credentials อยู่ครบ
- กด **Execute workflow** ทดสอบ 1 ครั้ง → ถ้าเขียวครบ = ย้ายสำเร็จ 🎉

---

## ขั้นที่ 8 — ปิดของเก่าที่ Google Cloud

**อย่าเพิ่งลบ! รอ 3-7 วันให้แน่ใจว่าเครื่องใหม่ทำงานปกติก่อน**

**ทำทันทีได้ (หยุดค่าใช้จ่าย CPU):**
1. Compute Engine → VM instances → เลือก **ทั้ง 3 ตัว** → กด **STOP**

**หลังมั่นใจแล้ว (7 วัน) ค่อยลบให้หมด:**
1. VM instances → เลือกทั้งหมด → **DELETE** (ติ๊กลบดิสก์ด้วย)
2. Storage → **Disks** → ลบดิสก์ที่เหลือค้าง
3. VPC network → **IP addresses** → ลบ IP ที่ขึ้น "Unused"
4. Billing → **Budgets & alerts** → ตั้งงบ ฿100 ไว้เป็นสัญญาณเตือน

---

## 🔒 ความปลอดภัย (ควรทำ)

ตอนนี้ n8n เปิดให้ทุกคนบนอินเทอร์เน็ตเข้าถึงได้ที่ port 5678 ผ่าน **http (ไม่เข้ารหัส)**

**ทางแก้ง่ายสุด — จำกัดให้เข้าได้เฉพาะ IP บ้าน/ร้าน:**
ใน Hetzner Firewall → rule port 5678 → ช่อง Source IPs ใส่ IP ของคุณ (ดูได้ที่ [whatismyip.com](https://www.whatismyip.com))

> ถ้า IP บ้านเปลี่ยนบ่อย อาจไม่สะดวก — อีกทางคือติดตั้ง HTTPS ด้วย Caddy + โดเมนย่อย บอกผมได้ถ้าอยากทำ

---

## 💰 สรุปผลลัพธ์

| | ก่อน | หลัง |
|---|---|---|
| ค่าใช้จ่าย/เดือน | ฿1,470 | **~฿145** |
| ค่าใช้จ่าย/ปี | ฿17,640 | **~฿1,740** |
| RAM | 4 GB | 4 GB (เท่าเดิม) |
| ดิสก์ | 9.7 GB (เต็มบ่อย) | **40 GB** |

**ประหยัดปีละ ~฿15,900**

---

## 🆘 แก้ปัญหา

| อาการ | วิธีแก้ |
|---|---|
| เปิด `:5678` ไม่ขึ้น | เช็ก firewall Hetzner + `docker ps` ว่า container รันอยู่ไหม |
| หน้า login ขึ้นแต่ล็อกอินไม่ได้ | ลืมใส่ `N8N_SECURE_COOKIE=false` — ลบ container แล้วรัน docker run ใหม่ |
| workflow หายหมด | สิทธิ์ไฟล์ผิด — รัน `chown -R 1000:1000 /home/n8n_data` แล้ว `docker restart n8n` |
| credentials ใช้ไม่ได้ | ไฟล์ `config` ในโฟลเดอร์สำรองหาย — ต้องกรอก API key ใหม่ |
| container ดับเอง | `docker logs n8n --tail 50` ดู error |
