# ย้าย n8n ไปบัญชี Google Cloud ใหม่

> ✅ **ย้ายเสร็จแล้ว 4 ส.ค. 2569** — เครื่องใหม่ชื่อ `n8n` โปรเจกต์ `project-144c909b-3cae-46bd-998`
> เครดิตทดลอง ฿10,066 หมดอายุ **2 พ.ย. 2569** (ต้อง Upgrade ก่อนวันนั้น)
> เอกสารนี้เก็บไว้เผื่อต้องย้ายอีกครั้ง

> ย้ายเซิร์ฟเวอร์ n8n จากบัญชีเดิม (thanathatpradee@gmail.com) ไปบัญชีใหม่ของพี่
> พร้อมข้อมูลทั้งหมด — workflow, credential, ประวัติการรัน
>
> **เวลาที่ใช้:** ประมาณ 1 ชั่วโมง · **ค่าใช้จ่าย:** ฟรี 90 วันแรกจากเครดิต $300

---

## สรุปแผน

```
1. สำรองข้อมูลจากเครื่องเก่า → ดาวน์โหลดเก็บในคอม
2. พี่สมัคร Google Cloud ใหม่ (ได้เครดิต $300)
3. สร้างเครื่องใหม่ + เปิดพอร์ต 5678
4. ลง Docker
5. อัปโหลดไฟล์สำรอง → กู้คืน → รัน n8n
6. ทดสอบให้ครบ แล้วค่อยลบเครื่องเก่า
```

**อย่าลบเครื่องเก่าจนกว่าเครื่องใหม่จะรันงานเช้าผ่านครบอย่างน้อย 1 วัน**

---

## ⚠️ อ่านก่อน 3 ข้อ

**1. เครดิต $300 หมดอายุใน 90 วัน ไม่ว่าจะใช้หมดหรือไม่**
พอครบ 90 วันต้องกด **Upgrade to paid account** ไม่งั้น Google จะปิดเครื่องและลบข้อมูล
ตั้งเตือนในปฏิทินไว้เลยตั้งแต่วันนี้

**2. ตอนสมัครต้องใช้บัตรเครดิต/เดบิตยืนยันตัวตน**
Google จะกันวงเงินชั่วคราวไม่เกิน $1 แล้วคืนให้ ไม่ได้ตัดเงินจริง
ต้องเป็นบัตรที่**เปิดสิทธิ์ชำระเงินต่างประเทศ**ไว้แล้ว ไม่งั้นเจอปัญหาเดิมกับบัญชีเก่า

**3. Google Sheets กับ OAuth ยังอยู่ที่บัญชีเดิม**
credential ที่ต่อ Google Sheets ไว้ผูกกับ OAuth client ในโปรเจกต์ `n8n555`
ของบัญชีเดิม และไฟล์ชีตก็เป็นของบัญชีเดิม — **ไม่ต้องย้าย ใช้ต่อได้เลย**
เพราะ n8n รันที่ไหนก็ตาม มันแค่ถือ token ไว้เรียก API

**ห้ามลบโปรเจกต์ `n8n555` ในบัญชีเดิม** ถ้าลบ credential จะพังทันที

---

## ขั้นที่ 1 — สำรองข้อมูลจากเครื่องเก่า

SSH เข้าเครื่องเก่า (`rescue-vm`) แล้วรัน

```bash
sudo tar czf ~/n8n-ย้ายเครื่อง.tar.gz -C /home n8n_data
sudo chown $USER ~/n8n-ย้ายเครื่อง.tar.gz
ls -lh ~/n8n-ย้ายเครื่อง.tar.gz
```

แล้วกดปุ่ม **DOWNLOAD FILE** ที่แถบบนของหน้าต่าง SSH ใส่ path

```
/home/thanathatpradee/n8n-ย้ายเครื่อง.tar.gz
```

**เช็คว่าไฟล์อยู่ในคอมจริง ๆ ก่อนไปต่อ** ในนั้นมีทุกอย่าง —
ฐานข้อมูล workflow, credential ที่เข้ารหัสไว้, และกุญแจถอดรหัส (`.n8n/config`)
ถ้าไฟล์นี้หาย ต้องตั้งค่าใหม่ทั้งหมด

---

## ขั้นที่ 2 — พี่สมัคร Google Cloud

1. พี่ไป https://console.cloud.google.com/freetrial ล็อกอินด้วยอีเมลของพี่
2. กรอกข้อมูล เลือกประเทศไทย
3. ใส่บัตร (ยืนยันตัวตนเท่านั้น)
4. เสร็จแล้วจะได้เครดิต $300 ใช้ได้ 90 วัน

**ให้ผู้ใช้เข้าถึงด้วย** — พี่ไปที่ **IAM & Admin → IAM → Grant access**
ใส่ `thanathatpradee@gmail.com` เลือก role **Owner** → Save
จากนั้นคุณจะเข้าจัดการเครื่องได้เหมือนเดิม แต่บิลไปที่พี่

---

## ขั้นที่ 3 — สร้างเครื่องใหม่

Compute Engine → **VM instances** → **Create instance**

| ช่อง | ใส่ | เหตุผล |
|---|---|---|
| Name | `n8n` | |
| Region | `asia-southeast1` (Singapore) | ใกล้ไทย หน้าจอไม่หน่วง |
| Zone | `asia-southeast1-b` | |
| Machine type | `e2-medium` | เท่าเครื่องเดิม รองรับ 6 workflow ยิงพร้อมกัน 9 โมง |
| Boot disk → Image | **Debian 12** | เหมือนเครื่องเดิม |
| Boot disk → Type | **Standard persistent disk** | ถูกกว่า Balanced ราว 4 เท่า |
| Boot disk → Size | `20 GB` | เครื่องเดิมใช้จริงไม่ถึง 10 GB |
| Networking → Network Service Tier | **Standard** | ค่าออกเน็ตถูกกว่า Premium |
| Networking → External IPv4 | **Ephemeral** | **อย่าจอง static IP** — IP ที่จองไว้ตอนเครื่องปิดคิดแพงกว่าตอนใช้จริง |

กด **Create**

### เปิดพอร์ต 5678

ถ้าไม่ทำขั้นนี้จะเข้า n8n ไม่ได้เลย

VPC network → **Firewall** → **Create firewall rule**

| ช่อง | ใส่ |
|---|---|
| Name | `allow-n8n` |
| Direction | Ingress |
| Targets | All instances in the network |
| Source IPv4 ranges | `0.0.0.0/0` |
| Protocols and ports | TCP → `5678` |

> เปิดให้ทุก IP เข้าได้เพราะต้องส่งลิงก์ฟอร์มให้คนอื่นใช้
> ถ้าใช้คนเดียวจริง ๆ ใส่ IP บ้านตัวเองแทน `0.0.0.0/0` จะปลอดภัยกว่า

---

## ขั้นที่ 4 — ลง Docker

SSH เข้าเครื่องใหม่ (ปุ่ม SSH ท้ายแถวในหน้า VM instances) แล้วรันทีละก้อน

```bash
sudo apt update && sudo apt install -y ca-certificates curl
curl -fsSL https://get.docker.com | sudo sh
sudo docker --version
```

> สคริปต์นี้เป็นตัวติดตั้งอย่างเป็นทางการของ Docker เอง (get.docker.com)

ตั้งเวลาเครื่องให้เป็นไทย

```bash
sudo timedatectl set-timezone Asia/Bangkok
date
```

---

## ขั้นที่ 5 — กู้คืนข้อมูล

**5.1 อัปโหลดไฟล์สำรอง** — กดปุ่ม **UPLOAD FILE** ที่แถบบนของหน้าต่าง SSH
เลือกไฟล์ `n8n-ย้ายเครื่อง.tar.gz` จากคอม (ไฟล์จะไปอยู่ที่ home directory)

**5.2 แตกไฟล์เข้าที่**

```bash
ls -lh ~/n8n-ย้ายเครื่อง.tar.gz
sudo tar xzf ~/n8n-ย้ายเครื่อง.tar.gz -C /home
sudo chown -R 1000:1000 /home/n8n_data
ls -la /home/n8n_data
```

ต้องเห็นไฟล์ `database.sqlite` กับ `config` ในนั้น ถ้าไม่เห็นแปลว่าแตกไฟล์ผิดที่

**5.3 หา IP ของเครื่องใหม่**

```bash
curl -s -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip; echo
```

จดไว้ สมมติได้ `35.xxx.xxx.xxx`

**5.4 รัน n8n** — แทน `IP_ใหม่` ด้วยเลขที่เพิ่งได้

```bash
sudo docker run -d --name n8n --restart unless-stopped \
  -p 5678:5678 \
  -v /home/n8n_data:/home/node/.n8n \
  -e N8N_SECURE_COOKIE=false \
  -e N8N_EDITOR_BASE_URL=http://localhost:5678/ \
  -e WEBHOOK_URL=http://IP_ใหม่:5678/ \
  -e GENERIC_TIMEZONE=Asia/Bangkok \
  -e TZ=Asia/Bangkok \
  docker.n8n.io/n8nio/n8n

sudo docker ps
sudo docker logs n8n --tail 30
```

> `N8N_EDITOR_BASE_URL` ต้องเป็น `localhost` เหมือนเดิม เพื่อให้ OAuth ของ Google ทำงานได้
> (Google ไม่รับ IP ดิบเป็น redirect URI) ส่วน `WEBHOOK_URL` ใส่ IP จริงเพื่อให้ลิงก์ฟอร์มใช้ได้

---

## ขั้นที่ 6 — ตรวจว่าย้ายสำเร็จ

เปิด `http://IP_ใหม่:5678` แล้วเช็คทีละข้อ

- [ ] ล็อกอินด้วยบัญชี n8n เดิมได้
- [ ] เห็น workflow ครบ 6 ตัว
- [ ] เปิด workflow ดึงข้อมูล Google Maps → node Google Sheets → credential ขึ้น **Account connected**
- [ ] กด Execute workflow ทดสอบ ดึงสัก 5 ร้าน ดูว่าข้อมูลลงชีตจริง
- [ ] แท็บ Executions เห็นประวัติการรันเก่า

ถ้า credential ขึ้นแดง แปลว่ากุญแจถอดรหัสไม่ตรง — ตรวจว่าไฟล์ `/home/n8n_data/config` ถูกแตกมาด้วยหรือเปล่า

---

## ขั้นที่ 7 — ตั้งประหยัดตั้งแต่วันแรก

**Instance schedule** — Compute Engine → **Instance schedules** → Create schedule

| ช่อง | ใส่ |
|---|---|
| Name | `n8n-morning` |
| Region | `asia-southeast1` |
| Start time | `08:30` |
| Stop time | `10:10` |
| Time zone | Indochina Time (ICT) UTC+7 |
| Frequency | Daily |

แล้วผูกกับเครื่อง: VM → **Edit** → **Instance schedule** → เลือก `n8n-morning` → Save

**ตั้ง Budget alert** — Billing → **Budgets & alerts** → Create budget
ตั้งไว้เดือนละ 300 บาท ให้ส่งอีเมลเตือนที่ 50% / 90% / 100%
จะได้ไม่เกิดเรื่องแบบบัญชีเก่าอีก

**ผลที่คาดไว้หลังเครดิตหมด** ประมาณ **130-150 บาท/เดือน**

---

## ขั้นที่ 8 — ปิดของเก่า (รออย่างน้อย 1 วัน)

**รอให้เครื่องใหม่รันงานเช้าผ่านครบก่อน** เข้าไปดูแท็บ Executions ว่าทั้ง 6 ตัวรันสำเร็จ
แล้วค่อยทำขั้นนี้ ไม่งั้นถ้าเครื่องใหม่มีปัญหาจะไม่มีอะไรให้ถอยกลับ

ที่บัญชีเดิม

1. **ปิดเครื่องเก่าก่อน 2-3 วัน** (Stop ไม่ใช่ Delete) — ถ้าทุกอย่างเรียบร้อยค่อยลบ
2. VM instances → `rescue-vm` → **Delete** (ติ๊กให้ลบดิสก์ที่ต่ออยู่ด้วยทั้ง 2 ก้อน)
3. VPC network → **IP addresses** → ปล่อย static IP ที่เหลือ
4. Compute Engine → **Snapshots** → ลบ snapshot เก่าที่ไม่ใช้
5. เช็คบิลอีก 2-3 วันให้แน่ใจว่ายอดหยุดเดิน

**อย่าลบโปรเจกต์ `n8n555`** — OAuth client ของ Google Sheets อยู่ในนั้น

---

## 🔁 Startup script — ต้องมี ถ้าใช้ IP แบบ ephemeral

IP เปลี่ยนทุกครั้งที่ปิด-เปิดเครื่อง ซึ่งเกิดขึ้นทุกวันเพราะตั้งตารางเปิดแค่ช่วงเช้า
ถ้าไม่มีสคริปต์นี้ `WEBHOOK_URL` จะค้างอยู่ที่ IP เก่า ลิงก์ฟอร์มที่ n8n แสดงจะผิดทุกวัน

ใส่ที่ VM → **Edit** → **Automation** → **Startup script**

```bash
#!/bin/bash
for i in $(seq 1 30); do docker info >/dev/null 2>&1 && break; sleep 2; done
IP=$(curl -s -H "Metadata-Flavor: Google" http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip)
docker rm -f n8n 2>/dev/null
docker run -d --name n8n --restart unless-stopped \
  -p 5678:5678 \
  -v /home/n8n_data:/home/node/.n8n \
  -e N8N_SECURE_COOKIE=false \
  -e N8N_EDITOR_BASE_URL=http://localhost:5678/ \
  -e WEBHOOK_URL=http://$IP:5678/ \
  -e GENERIC_TIMEZONE=Asia/Bangkok \
  -e TZ=Asia/Bangkok \
  docker.n8n.io/n8nio/n8n
```

ลูป `docker info` ตอนต้นมีไว้รอให้ Docker พร้อมก่อน เพราะ startup script รันเร็วกว่า Docker daemon

**ทางเลือกถ้ารำคาญ IP เปลี่ยน** — จอง static IP แทน แต่ IP ที่จองไว้ตอนเครื่องปิดคิดแพงกว่าตอนใช้จริงเกินเท่าตัว
เปิดวันละ 2 ชั่วโมงแปลว่าโดนเรตแพง 22 ชั่วโมง = ประมาณ ฿240/เดือน ไม่คุ้ม

---

## ⏰ เรื่องเวลาที่ต้องรู้ (เจอจริงวันแรก)

**Instance schedule ของ GCP ไม่ตรงเป๊ะ** ตั้งไว้ 08:50 แต่เครื่องบูตจริง **08:58:19** ช้าไป 8 นาที
พอบวกเวลา startup script (~30 วินาที) กับเวลาที่ n8n ใช้บูตเอง (~30-60 วินาที)
จะพร้อมประมาณ 08:59:30 เหลือเวลาแค่ 30 วินาทีก่อน workflow ยิงตอน 9 โมง

**เลยเลื่อนเวลาเปิดเป็น 08:30** เผื่อไว้ 30 นาที ค่าใช้จ่ายเพิ่มไม่ถึง 20 บาท/เดือน
แลกกับความมั่นใจว่างานเช้าไม่หาย

> **n8n ไม่ตามเก็บงานที่พลาด** ถ้าเครื่องยังไม่พร้อมตอนถึงเวลา trigger รอบนั้นหายเลย
> ไม่มี error ไม่มีแจ้งเตือน รู้อีกทีคือข้อมูลไม่มา

### ตารางแบบนี้แก้ไม่ได้ ต้องลบแล้วสร้างใหม่

Google ไม่ให้ edit resource policy — ทำใน Cloud Shell 5 คำสั่ง

```bash
gcloud compute instances stop n8n --zone=asia-southeast1-b

gcloud compute instances remove-resource-policies n8n \
  --resource-policies=n8n-morning --zone=asia-southeast1-b

gcloud compute resource-policies delete n8n-morning \
  --region=asia-southeast1 --quiet

gcloud compute resource-policies create instance-schedule n8n-morning \
  --region=asia-southeast1 \
  --vm-start-schedule="30 8 * * *" \
  --vm-stop-schedule="10 10 * * *" \
  --timezone=Asia/Bangkok

gcloud compute instances add-resource-policies n8n \
  --resource-policies=n8n-morning --zone=asia-southeast1-b
```

เช็คผล

```bash
gcloud compute resource-policies describe n8n-morning --region=asia-southeast1 \
  --format="value(instanceSchedulePolicy.vmStartSchedule.schedule,instanceSchedulePolicy.vmStopSchedule.schedule)"
```

### วิธีตรวจว่าเครื่องเปิด-ปิดตามตารางจริงไหม

```bash
gcloud compute operations list --filter="targetLink~n8n" --limit=15 \
  --format="table(operationType,status,insertTime)"
```

### วิธีตรวจว่า startup script ทำงานไหม (รันใน SSH ของเครื่อง n8n)

```bash
sudo docker ps
sudo journalctl -u google-startup-scripts --no-pager | tail -40
```

ต้องเห็น `Found startup-script in metadata` และ `Finished running startup scripts`

> **error สีแดงยาว ๆ เรื่อง `logging.logEntries.create` PermissionDenied ไม่ต้องสนใจ**
> เป็นแค่ service account ของเครื่องไม่มีสิทธิ์ส่ง log ขึ้น Cloud Logging ไม่กระทบการทำงาน

### IP เปลี่ยนทุกวัน — ต้องดูก่อนเข้าใช้ทุกครั้ง

เปิดหน้า **VM instances** ดูคอลัมน์ **External IP** แล้วค่อยเปิด `http://<IP>:5678`
อย่าจำ IP เก่าไว้ เพราะเปลี่ยนทุกครั้งที่เครื่องบูต

---

## 🆘 แก้ปัญหา

| อาการ | วิธีแก้ |
|---|---|
| เปิด `IP:5678` ไม่ขึ้น | ยังไม่ได้สร้าง firewall rule เปิดพอร์ต 5678 |
| ขึ้นหน้าตั้งค่าใหม่ ไม่มี workflow | แตกไฟล์ผิดที่ ต้องได้ `/home/n8n_data/database.sqlite` |
| credential ขึ้นแดง ใช้ไม่ได้ | ไฟล์ `/home/n8n_data/config` หาย — กุญแจถอดรหัสไม่ตรง |
| container ไม่ขึ้น | `sudo docker logs n8n` ดู error · เช็ค `sudo chown -R 1000:1000 /home/n8n_data` |
| ลิงก์ฟอร์มเป็น localhost | ลืมใส่ `WEBHOOK_URL` เป็น IP จริง — สร้าง container ใหม่ |
| Google Sheets เรียกไม่ได้ | โปรเจกต์ `n8n555` ในบัญชีเดิมถูกลบหรือปิดบิลลิ่ง |
| เครดิต $300 หมดแล้วเครื่องดับ | ต้อง Upgrade to paid account ภายใน 30 วัน ไม่งั้นข้อมูลถูกลบถาวร |
