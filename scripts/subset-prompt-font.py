"""สร้างไฟล์ฟอนต์ Prompt สำหรับเว็บ (app/fonts/prompt-<น้ำหนัก>.woff2) — ตัดเหลือเฉพาะตัวอักษรที่เว็บใช้

ทำไม (25 ต.ค. 2026): เดิมใช้ next/font/google → ได้ 2 ไฟล์ต่อน้ำหนัก (ไทย + ละติน) รวม 12 ไฟล์ 103 KB
ไฟล์ละตินของ Google มีตัวอักษรยุโรปที่เว็บไม่ได้ใช้เยอะ → ตัดเหลือไทย + อังกฤษ/ตัวเลข/เครื่องหมายที่ใช้จริง
ได้ 1 ไฟล์ต่อน้ำหนัก รวม 6 ไฟล์ 76 KB · รูปร่างตัวอักษร/ระยะห่าง/ระยะบรรทัดเหมือนเดิมทุกตัว (เทียบกับไฟล์ของ Google แล้ว)

ถ้าเว็บเริ่มใช้ตัวอักษรนอกชุดนี้ (เช่น é ü ในชื่อแบรนด์) ตัวนั้นจะแสดงด้วยฟอนต์สำรองของเครื่อง
→ เพิ่มรหัสใน UNICODES แล้วรันใหม่

วิธีรัน (ต้องมี fonttools + brotli: pip install fonttools brotli):
  1) โหลดไฟล์ต้นฉบับ Prompt-Light/Regular/Medium/SemiBold/Bold/ExtraBold.ttf
     จาก https://github.com/google/fonts/tree/main/ofl/prompt (สัญญาอนุญาต OFL — app/fonts/OFL.txt)
  2) python scripts/subset-prompt-font.py <โฟลเดอร์ไฟล์ .ttf> app/fonts
"""
import os
import sys

from fontTools import subset

UNICODES = (
    list(range(0x0E01, 0x0E5C))  # ไทย (ชุดเดียวกับ subset thai ของ Google)
    + [0x200C, 0x200D, 0x25CC, 0x02D7, 0x0303, 0x0331]
    + list(range(0x20, 0x7F))  # ASCII: อังกฤษ ตัวเลข เครื่องหมายพื้นฐาน
    + [0xA0, 0xA9, 0xAB, 0xAE, 0xB0, 0xB7, 0xBB, 0xD7, 0xF7]  # nbsp © « ® ° · » × ÷
    + [0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026, 0x2122, 0x20AC, 0x2212,
       0x2190, 0x2191, 0x2192, 0x2193, 0x2248]  # – — ‘ ’ “ ” • … ™ € − ← ↑ → ↓ ≈
)
WEIGHTS = {"Light": 300, "Regular": 400, "Medium": 500, "SemiBold": 600, "Bold": 700, "ExtraBold": 800}

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
for name, weight in WEIGHTS.items():
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["ccmp", "frac", "liga", "locl", "kern", "mark", "mkmk"]  # ชุดเดียวกับไฟล์ของ Google
    opts.hinting = False  # ไฟล์ของ Google ไม่มี hinting → ตัวอักษรออกมาเหมือนเดิม
    opts.name_IDs = [0, 1, 2, 3, 4, 5, 6]
    opts.notdef_outline = True
    font = subset.load_font(os.path.join(src, f"Prompt-{name}.ttf"), opts)
    subsetter = subset.Subsetter(opts)
    subsetter.populate(unicodes=UNICODES)
    subsetter.subset(font)
    dst = os.path.join(out, f"prompt-{weight}.woff2")
    subset.save_font(font, dst, opts)
    print(dst, os.path.getsize(dst), "bytes")
