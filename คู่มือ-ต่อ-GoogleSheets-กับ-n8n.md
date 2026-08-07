# ต่อ Google Sheets เข้ากับ n8n ที่รันบนเครื่องตัวเอง

> ใช้เมื่อ n8n ขอ **Client ID / Client Secret** แทนที่จะให้กด Sign in with Google เลย
> แปลว่า n8n รันบนเครื่องคุณเอง (`localhost:5678`) ไม่ใช่ n8n Cloud
> **เวลาที่ใช้:** 10-15 นาที · **ค่าใช้จ่าย:** ฟรี

---

## ก่อนเริ่ม — ก๊อป Redirect URL เก็บไว้

ในหน้าต่าง n8n ที่เปิดค้างอยู่ มีช่อง **OAuth Redirect URL** เขียนว่า

```
http://localhost:5678/rest/oauth2-credential/callback
```

ก๊อปบรรทัดนี้เก็บไว้ เดี๋ยวต้องเอาไปวางใน Google **อย่าปิดหน้าต่าง n8n นี้**
เปิดแท็บใหม่ทำงานแทน

---

## ขั้นที่ 1 — สร้างโปรเจกต์

1. ไป https://console.cloud.google.com
2. ล็อกอินด้วย Google บัญชีเดียวกับที่เป็นเจ้าของ Google Sheet
3. มุมบนซ้าย ข้าง ๆ คำว่า Google Cloud มีปุ่มเลือกโปรเจกต์ — คลิก
4. กด **New Project** ตั้งชื่อ เช่น `n8n` แล้วกด **Create**
5. รอสักครู่ แล้ว**เลือกโปรเจกต์ที่เพิ่งสร้าง**ให้เป็นโปรเจกต์ปัจจุบัน

> ขั้นตอนที่คนพลาดบ่อย: สร้างเสร็จแล้วลืมสลับมาใช้ ทำให้ไปตั้งค่าผิดโปรเจกต์

---

## ขั้นที่ 2 — เปิด API 2 ตัว

ช่องค้นหาบนสุด พิมพ์ทีละตัว แล้วกดปุ่ม **Enable**

| ค้นหา | ต้องกด |
|---|---|
| `Google Sheets API` | Enable |
| `Google Drive API` | Enable |

**ต้องเปิดทั้งสองตัว** — Sheets API ไว้เขียนข้อมูล ส่วน Drive API ไว้ให้ n8n
ไล่รายชื่อไฟล์มาให้เลือกในช่อง Document ถ้าไม่เปิด Drive API ช่องนั้นจะว่างเปล่า

---

## ขั้นที่ 3 — ตั้งค่าหน้าจอขออนุญาต (OAuth consent screen)

เมนูซ้าย → **APIs & Services** → **OAuth consent screen**
(บางบัญชีเมนูนี้ชื่อ **Google Auth Platform** แล้วมีหัวข้อย่อย Branding / Audience)

1. User Type เลือก **External** → Create
   (ถ้าใช้ Google Workspace ขององค์กร จะมีตัวเลือก **Internal** ให้เลือกอันนั้นดีกว่า ข้ามเรื่องยุ่งยากได้หมด)
2. กรอกเท่าที่บังคับ
   - App name: `n8n`
   - User support email: อีเมลตัวเอง
   - Developer contact email: อีเมลตัวเอง
3. หน้า Scopes — **ข้ามไปเลย** ไม่ต้องเพิ่มอะไร n8n ขอเอง
4. หน้า Test users — กด **Add users** ใส่อีเมลตัวเองลงไป
5. Save

---

## ขั้นที่ 4 — สร้าง OAuth client

เมนูซ้าย → **Credentials** → ปุ่ม **+ Create Credentials** → **OAuth client ID**

| ช่อง | ใส่ |
|---|---|
| Application type | **Web application** |
| Name | `n8n` |
| Authorized redirect URIs | กด **+ Add URI** แล้ววาง `http://localhost:5678/rest/oauth2-credential/callback` |

กด **Create**

จะเด้งกล่องขึ้นมามี **Client ID** กับ **Client Secret** — เปิดค้างไว้ก่อน

> URI ต้องตรงเป๊ะทุกตัวอักษร รวม `http://` (ไม่ใช่ `https`) และไม่มี `/` ปิดท้าย
> ผิดตัวเดียวจะขึ้น `Error 400: redirect_uri_mismatch` ตอนล็อกอิน

---

## ขั้นที่ 5 — กลับมาที่ n8n

1. วาง **Client ID** และ **Client Secret** ลงในสองช่องที่เปิดค้างไว้
2. กด **Sign in with Google**
3. เลือกบัญชี
4. จะขึ้นหน้าเตือน **"Google hasn't verified this app"**
   → กด **Advanced** → กด **Go to n8n (unsafe)**
   (ปกติ เพราะแอปนี้คุณสร้างเองไว้ใช้เอง ไม่ได้ส่งให้ Google ตรวจ)
5. กด **Continue / Allow** ให้สิทธิ์
6. หน้าต่างปิดเอง n8n จะขึ้นว่า **Account connected**

กด **Save** แล้วปิดหน้าต่าง credential

---

## ขั้นที่ 6 — เลือกไฟล์

กลับมาที่ node Google Sheets

- **Document** → From list → เลือกไฟล์ชีตที่สร้างไว้
- **Sheet** → From list → เลือกแท็บ (ปกติชื่อ `Sheet1` หรือ `ชีต1`)

สามเหลี่ยมแดงหายไป = เสร็จ

---

## ⚠️ กับดักที่จะเจอในอีก 7 วัน

ถ้าปล่อยแอปไว้ในสถานะ **Testing** — Google จะทำให้ token หมดอายุทุก **7 วัน**
แปลว่าอาทิตย์หน้าระบบจะพังเอง แล้วต้องมากด Sign in ใหม่เรื่อย ๆ

**วิธีแก้** กลับไปที่ **OAuth consent screen** (หรือ **Audience**) แล้วกด
**Publish app** → ยืนยัน **Confirm**

สถานะจะเปลี่ยนจาก Testing เป็น **In production** แล้ว token จะไม่หมดอายุอีก
หน้าเตือน "Google hasn't verified this app" ยังขึ้นเหมือนเดิมตอนล็อกอิน ซึ่งไม่เป็นไร
เพราะมีแค่คุณคนเดียวที่ใช้

> ไม่ต้องส่งให้ Google ตรวจสอบ (verification) การตรวจสอบจำเป็นเฉพาะตอนจะเปิดให้คนนอกใช้

---

## 🆘 แก้ปัญหา

| อาการ | สาเหตุ |
|---|---|
| `Error 400: redirect_uri_mismatch` | URI ใน Google ไม่ตรงกับที่ n8n แสดง — ก๊อปใหม่ให้ตรงเป๊ะ |
| `Access blocked: app not verified` แล้วไม่มีปุ่ม Advanced | ยังไม่ได้ใส่อีเมลตัวเองใน Test users (ขั้นที่ 3 ข้อ 4) |
| ช่อง Document ว่างเปล่า เลือกไฟล์ไม่ได้ | ยังไม่ได้เปิด **Google Drive API** |
| เขียนลงชีตไม่ได้ ขึ้น 403 | ยังไม่ได้เปิด **Google Sheets API** |
| ใช้ได้อาทิตย์เดียวแล้วหลุด | ยังอยู่สถานะ Testing — กด Publish app |
| ข้อมูลลงชีตไม่ครบช่อง | หัวตารางแถวที่ 1 สะกดไม่ตรง |

---

## ทางลัดถ้าไม่อยากทำทั้งหมดนี้

ย้ายไปใช้ **n8n Cloud** จะมีปุ่ม Sign in with Google ให้กดเลย ไม่ต้องตั้งค่าอะไร
แต่มีค่าใช้จ่ายรายเดือน — ถ้าใช้แค่คนเดียวไม่กี่ workflow ทำเองแบบนี้คุ้มกว่า
ตั้งครั้งเดียวจบ ไม่ต้องทำซ้ำเวลาเพิ่ม workflow ใหม่ที่ใช้ Google
