'use client';

import { useEffect, useRef, useState } from 'react';

/* คลิปสั้นแนวตั้งของร้าน (YouTube Shorts) — เล่นเองทีละคลิป
   - เลื่อนมาถึงแล้วเล่นเอง (ปิดเสียง เบราว์เซอร์ยอมให้เล่นเองเฉพาะแบบไม่มีเสียง) จบแล้วไปคลิปถัดไป วนกลับคลิปแรก
   - เล่นเฉพาะตอนคลิปนั้นอยู่บนจอเกินครึ่ง เลื่อนพ้นจอแล้วหยุด เลื่อนกลับมาแล้วเล่นต่อ
   - กดคลิปไหน คลิปนั้นเล่นทันที พร้อมเสียงถ้าเบราว์เซอร์ยอม (บางเครื่อง เช่น iPhone อาจยังปิดเสียง ต้องแตะไอคอนลำโพง)
   - ตัวเล่น YouTube (IFrame API) โหลดตอนเลื่อนมาถึงครั้งแรกเท่านั้น → ไม่กระทบความเร็วตอนเปิดหน้า
   - เปิดโหมดประหยัดเน็ต (Save-Data) → ไม่เล่นเอง กดแล้วค่อยเล่น
     (ไม่ดู prefers-reduced-motion: Windows ที่ปิดเอฟเฟกต์ภาพส่งค่านี้มาด้วย คลิปเลยไม่เล่นในเครื่องทั่วไปหลายเครื่อง
      คลิปปิดเสียงและมีปุ่มหยุดของ YouTube อยู่แล้ว)
   - โหลดตัวเล่นไม่ได้ (เช่น โดนบล็อก) → กลับไปแบบเดิม ฝัง iframe ตรงคลิปที่กด */

const ENDED = 0;
const PLAYING = 1;
const PAUSED = 2;
const BUFFERING = 3;
const CUED = 5;

let apiPromise = null;
function loadYouTubeApi() {
  if (!apiPromise) {
    apiPromise = new Promise((resolve, reject) => {
      if (window.YT?.Player) return resolve(window.YT);
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve(window.YT);
      };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      s.async = true;
      s.onerror = () => {
        apiPromise = null;
        reject(new Error('YouTube IFrame API ไม่โหลด'));
      };
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

function autoplayAllowed() {
  return !navigator.connection?.saveData;
}

// คลิปอยู่ช่วงวินาทีสุดท้ายไหม
function atEnd(p, d) {
  return d > 0 && (p.getCurrentTime?.() || 0) >= d - 1.5;
}

// การ์ดคลิปอยู่บนจอเกินครึ่งจริงตอนนี้ไหม (ดูจากตำแหน่งจริง ไม่รอ IntersectionObserver)
function halfOnScreen(el) {
  if (!el || document.visibilityState !== 'visible') return false;
  const r = el.getBoundingClientRect();
  return Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0) >= r.height * 0.5;
}

export default function ShortsGrid({ videos }) {
  const [active, setActive] = useState(null); // คลิปที่กำลังเล่น (ลำดับ) · null = ยังไม่เริ่ม
  const [sound, setSound] = useState(false); // มีเสียงไหม (เฉพาะตอนลูกค้ากดเอง/เปิดเสียงเอง)
  const [shownFor, setShownFor] = useState(null); // คลิปที่ตัวเล่นเริ่มเล่นแล้ว → ค่อยแสดงทับรูปปก
  const [fallback, setFallback] = useState(false); // โหลดตัวเล่นไม่ได้ → iframe ธรรมดา
  const frames = useRef([]);
  const holder = useRef(null);
  const player = useRef(null);
  const visible = useRef(new Set()); // คลิปที่อยู่บนจอเกินครึ่ง
  const activeRef = useRef(null);
  const autoPaused = useRef(false); // เราสั่งหยุดเองเพราะคลิปพ้นจอ
  const userPaused = useRef(false); // ลูกค้ากดหยุดเอง → ไม่เล่นต่อให้อัตโนมัติ

  // เฝ้าดูว่าคลิปไหนอยู่บนจอ: เริ่มเล่นตอนเลื่อนมาถึง · หยุด/เล่นต่อตามการเลื่อนและการสลับแท็บ
  useEffect(() => {
    const auto = autoplayAllowed();
    const sync = () => {
      const a = activeRef.current;
      const p = player.current;
      if (a === null || !p?.getPlayerState) return;
      const st = p.getPlayerState();
      if (visible.current.has(a) && document.visibilityState === 'visible') {
        // หยุดอยู่เพราะพ้นจอ (เราหยุดเองหรือ YouTube หยุดเอง) → เล่นต่อ · ลูกค้ากดหยุดเอง → ไม่ยุ่ง
        if ((st === PAUSED || st === CUED) && !userPaused.current) p.playVideo();
      } else if (st === PLAYING || st === BUFFERING) {
        autoPaused.current = true;
        p.pauseVideo();
      }
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = Number(e.target.dataset.i);
          if (e.intersectionRatio >= 0.5) visible.current.add(i);
          else visible.current.delete(i);
        }
        if (activeRef.current === null) {
          if (auto && visible.current.size > 0) setActive(Math.min(...visible.current));
          return;
        }
        sync();
      },
      { threshold: [0, 0.5] }
    );
    frames.current.forEach((el) => el && io.observe(el));
    document.addEventListener('visibilitychange', sync);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  // สร้างตัวเล่นของคลิปที่กำลังเล่น · จบแล้วไปคลิปถัดไป
  useEffect(() => {
    activeRef.current = active;
    if (active === null || fallback) return;
    let cancelled = false;
    let p = null;
    let check = 0;
    let poll = 0;
    let lastT = 0;
    let done = false;
    userPaused.current = false;
    autoPaused.current = false;

    // ไปคลิปถัดไป (คลิปเดียว → วนเล่นคลิปเดิม ถ้าตัวเล่นไม่วนเอง)
    const advance = (target) => {
      if (done) return;
      const next = (active + 1) % videos.length;
      if (next === active) {
        const st = target.getPlayerState?.();
        if (st === ENDED || st === PAUSED) {
          target.seekTo(0, true);
          target.playVideo();
        }
        return;
      }
      done = true;
      setSound(!target.isMuted());
      setActive(next);
    };

    loadYouTubeApi()
      .then((YT) => {
        if (cancelled || !holder.current) return;
        const el = document.createElement('div');
        holder.current.appendChild(el);
        p = new YT.Player(el, {
          host: 'https://www.youtube-nocookie.com',
          videoId: videos[active].id,
          playerVars: { autoplay: 1, mute: sound ? 0 : 1, playsinline: 1, rel: 0, origin: window.location.origin },
          events: {
            onReady: (e) => {
              player.current = e.target;
              // ตัวเล่นแบบ Shorts ไม่ส่งสถานะ "จบ" เสมอไป (บางครั้งวนคลิปเอง บางครั้งหยุดค้างท้ายคลิป)
              // → ดูเวลาเล่นทุกครึ่งวินาที: ถึงท้ายคลิป · หยุดค้างท้ายคลิป · วนกลับต้นคลิปหลังเล่นเกือบจบ = จบแล้ว
              poll = setInterval(() => {
                const st = e.target.getPlayerState?.();
                const t = e.target.getCurrentTime?.() || 0;
                const d = e.target.getDuration?.() || videos[active].seconds || 0;
                if (
                  st === ENDED ||
                  (d && st === PLAYING && (t >= d - 0.4 || (lastT >= d - 2 && t < lastT - 1))) ||
                  (d && st === PAUSED && atEnd(e.target, d) && !userPaused.current)
                ) {
                  advance(e.target);
                }
                if (st === PLAYING) lastT = t;
              }, 500);
              if (!visible.current.has(active)) {
                autoPaused.current = true;
                e.target.pauseVideo();
                return;
              }
              e.target.playVideo();
              // เบราว์เซอร์ไม่ยอมให้เล่นพร้อมเสียงเอง → ปิดเสียงแล้วเล่นต่อ
              check = setTimeout(() => {
                const st = e.target.getPlayerState?.();
                if (st !== PLAYING && st !== BUFFERING && visible.current.has(active) && !userPaused.current) {
                  e.target.mute();
                  e.target.playVideo();
                }
              }, 2500);
            },
            onStateChange: (e) => {
              if (e.data === PLAYING) {
                userPaused.current = false;
                setShownFor(active);
              }
              if (e.data === PAUSED) {
                // นับเป็นลูกค้ากดหยุด เฉพาะตอนคลิปยังอยู่บนจอ ไม่ใช่ท้ายคลิป และเราไม่ได้สั่งหยุด
                // (YouTube หยุดเองได้ทั้งตอนพ้นจอและตอนจบคลิป Shorts)
                const d = e.target.getDuration?.() || videos[active].seconds || 0;
                if (!autoPaused.current && !atEnd(e.target, d) && halfOnScreen(frames.current[active])) userPaused.current = true;
                autoPaused.current = false;
              }
              if (e.data === ENDED) advance(e.target);
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setFallback(true);
      });

    return () => {
      cancelled = true;
      clearTimeout(check);
      clearInterval(poll);
      player.current = null;
      p?.destroy?.();
    };
  }, [active, sound, fallback, videos]);

  const choose = (i) => {
    setSound(true);
    setActive(i);
  };

  return (
    <div className="video-shorts-grid">
      {videos.map((v, i) => (
        <figure className="short-card" key={v.id}>
          <div
            className="short-card-frame"
            data-i={i}
            ref={(el) => {
              frames.current[i] = el;
            }}
          >
            <button type="button" onClick={() => choose(i)} aria-label={`เล่นคลิป: ${v.title}`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- รูปปกจาก YouTube โหลดตรงเร็วกว่าผ่าน image optimizer */}
              <img src={`https://i.ytimg.com/vi/${v.id}/oar2.jpg`} alt="" loading="lazy" width={405} height={720} />
            </button>
            {i === active && !fallback && <div ref={holder} className={`short-card-player${shownFor === i ? ' is-on' : ''}`} />}
            {i === active && fallback && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&mute=${sound ? 0 : 1}&rel=0&playsinline=1`}
                title={v.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <figcaption>{v.title}</figcaption>
        </figure>
      ))}
    </div>
  );
}
