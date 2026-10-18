// Usage: node scripts/make-hero-video.mjs   (ffmpeg installed hona chahiye)
// Apni 3 gym photos se slow-zoom crossfade hero video (~16s loop) banata hai -> public/videos/hero.mp4
// Input photos: public/images/hero.jpg, public/images/programs/p2.jpg, public/images/programs/p1.jpg
import { mkdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";

const imgs = ["public/images/hero.jpg", "public/images/programs/p2.jpg", "public/images/programs/p1.jpg"];
const missing = imgs.filter((p) => !existsSync(p));
if (missing.length) { console.error("Ye photos pehle public/ me rakho:\n" + missing.join("\n")); process.exit(1); }

mkdirSync("public/videos", { recursive: true });
const F = 25, SEC = 6;
const zoom = imgs.map((_, i) =>
  `[${i}:v]scale=2400:-2,zoompan=z='min(zoom+0.0004,1.15)':d=${F * SEC}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=${F},setsar=1[v${i}]`).join(";");
const filter = `${zoom};[v0][v1]xfade=transition=fade:duration=1:offset=5[x1];[x1][v2]xfade=transition=fade:duration=1:offset=10,format=yuv420p[out]`;
execFileSync("ffmpeg", ["-y", "-loglevel", "error", ...imgs.flatMap((i) => ["-i", i]), "-filter_complex", filter,
  "-map", "[out]", "-c:v", "libx264", "-crf", "26", "-preset", "veryfast", "-movflags", "+faststart", "-an", "public/videos/hero.mp4"]);
console.log("saved public/videos/hero.mp4");
