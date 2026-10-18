Guru Fitness Hub: gym website. Next.js (app router, JSX) + Tailwind v3 + Framer Motion + lucide-react
  npm i framer-motion lucide-react   |   npm i -D tailwindcss@3 postcss autoprefixer
Replace: app/ components/ data/ lib/ scripts/ tailwind.config.js postcss.config.js jsconfig.json

IMAGES (public/ me rakho, naam same rakhna ya data/content.json me path badlo):
  public/images/hero.jpg
  public/images/programs/p1.jpg ... p6.jpg
  public/images/trainers/t1.jpg ... t4.jpg
  public/images/results/r1-before.jpg, r1-after.jpg, r2-..., r3-...
  public/videos/hero.mp4   (optional; ya: node scripts/make-hero-video.mjs)
Jo image nahi hogi uski jagah dark gradient + title dikhega, site break nahi hogi.

EDIT: data/constants.json (naam, phone, WhatsApp, email, address, hours, map link)
      data/content.json (saara text, plans ke prices, schedule, trainers)
Prices, stats, testimonials, trainer names placeholder hain: apne asli data se replace karo.
