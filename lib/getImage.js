import fs from "fs";
import path from "path";

/* ============================================
   ระบบดึงรูปภาพจากโฟลเดอร์อัปโหลดอัตโนมัติ
   ============================================
   วิธีใช้: วางรูปจริงของร้าน (ไฟล์ชื่ออะไรก็ได้ ไม่ต้องเปลี่ยนชื่อ)
   ลงในโฟลเดอร์ public/images/uploads/<slot>/ ตามจุดที่ต้องการเปลี่ยนรูป
   ระบบจะดึงรูปที่วางไว้มาใช้แทนรูปตัวอย่างเดิมโดยอัตโนมัติ
   ไม่ต้องแก้โค้ดใดๆ เพิ่มเติม
*/

const UPLOAD_ROOT = path.join(process.cwd(), "public", "images", "uploads");
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|avif)$/i;

function listUploadedFiles(slot) {
  try {
    const dir = path.join(UPLOAD_ROOT, slot);
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.test(f))
      .sort();
  } catch {
    return [];
  }
}

// คืนค่ารูปแรกที่เจอในโฟลเดอร์ public/images/uploads/<slot>/
// ถ้าไม่มีรูปที่อัปโหลด จะใช้ค่า fallback (รูปตัวอย่างเดิม) แทน
export function getUploadedImage(slot, fallback) {
  const files = listUploadedFiles(slot);
  return files.length > 0 ? `/images/uploads/${slot}/${files[0]}` : fallback;
}

// คืนค่ารูปทั้งหมดที่เจอในโฟลเดอร์ public/images/uploads/<slot>/ (ใช้กับแกลเลอรี)
// ถ้าไม่มีรูปที่อัปโหลด จะใช้ค่า fallback array เดิมแทน
export function getUploadedImages(slot, fallback = []) {
  const files = listUploadedFiles(slot);
  return files.length > 0
    ? files.map((f) => `/images/uploads/${slot}/${f}`)
    : fallback;
}
