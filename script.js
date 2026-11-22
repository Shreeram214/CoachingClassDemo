/* ==========================================================================
   Apex Academy — script.js (shared by every page)
   --------------------------------------------------------------------------
   1. Site settings & editable content data
   2. Helpers
   3. Shared layout: icon sprite, header, footer, modal, toast
   4. Component renderers (cards, carousel, accordion, tables …)
   5. Interactions: navigation, scroll UI, reveal, counters
   6. Courses: filter + details modal · Results: filter
   7. Enquiry shortcuts (data-enquire) & URL pre-fill
   8. Carousel · 9. Accordion · 10. Forms · 11. Countdown
   12. Init — every feature runs only if its markup exists on the page
   ========================================================================== */

/* ==========================================================================
   1. SITE SETTINGS & CONTENT — edit text, photos and numbers here
   ========================================================================== */
const SITE = {
  name: "Apex Academy",
  tagline: "Rise to the Top · Since 2010",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  phone2: "+91 20 2553 1234",
  email: "admissions@apexacademy.example",
  address: "3rd Floor, Apex House, 1204 FC Road, Shivajinagar, Pune 411004",
  hours: "Mon – Sat, 8:00 AM – 8:30 PM",
};

// Unsplash photo helper. Swap for local files later, e.g. "images/faculty/rajesh.jpg"
const photo = (id, w = 600, h = 750) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=faces&w=${w}&h=${h}&q=80`;

const COURSES = [
  { id: "jee", title: "JEE Main & Advanced", category: "Engineering & Medical", icon: "atom", tag: "Most popular",
    desc: "Rigorous Physics, Chemistry & Maths program built for IIT and NIT aspirants.",
    duration: "1 or 2 years", audience: "Class 11, 12 & droppers", mode: "Classroom + Live online",
    features: ["2,500+ practice problems", "Weekly JEE-pattern tests", "IIT-alumni faculty"],
    details: ["Complete NCERT + advanced theory", "40 full-length mock tests", "Chapter-wise DPPs with video solutions", "MHT-CET & BITSAT add-on", "1-on-1 mentor every fortnight", "Rank predictor & analytics"] },
  { id: "neet", title: "NEET UG", category: "Engineering & Medical", icon: "steth", tag: "Top results",
    desc: "NCERT-anchored Biology, Physics & Chemistry coaching for medical aspirants.",
    duration: "1 or 2 years", audience: "Class 11, 12 & droppers", mode: "Classroom + Live online",
    features: ["Line-by-line NCERT coverage", "OMR-based weekly tests", "Doctor-led Biology"],
    details: ["Diagram & mnemonic workbooks", "35 full-syllabus NEET mocks", "Daily 30-min doubt window", "Previous 15 years' PYQs", "Personal mentor & study planner", "Monthly parent reviews"] },
  { id: "upsc", title: "UPSC / MPSC", category: "Government Exams", icon: "landmark", tag: "Civil services",
    desc: "Integrated Prelims, Mains and Interview guidance for civil services aspirants.",
    duration: "12–15 months", audience: "Graduates & final-year students", mode: "Classroom + Hybrid",
    features: ["GS + CSAT + Optional", "Weekly answer-writing", "Mock interviews by ex-officers"],
    details: ["Complete GS Papers I–IV", "Daily current affairs digest", "Weekly answer evaluation", "Marathi & English medium", "Prelims test series (30 tests)", "DAF-based interview panels"] },
  { id: "ssc", title: "SSC & Banking", category: "Government Exams", icon: "briefcase", tag: "Fast track",
    desc: "Speed-focused preparation for SSC CGL, CHSL, IBPS PO/Clerk and SBI exams.",
    duration: "6 months", audience: "Graduates & job seekers", mode: "Classroom + Live online",
    features: ["Quant shortcuts & tricks", "Daily sectional tests", "Interview & GD prep"],
    details: ["Quant, Reasoning, English & GA", "100+ online mock tests", "Speed & accuracy drills", "Descriptive writing practice", "Bank interview preparation", "Exam calendar & form alerts"] },
  { id: "foundation", title: "Class 8–10 Foundation", category: "School & Boards", icon: "sprout", tag: "Early start",
    desc: "Strong concepts in Maths & Science with board excellence and Olympiad exposure.",
    duration: "1–3 years", audience: "Class 8, 9 & 10 students", mode: "Classroom (after school)",
    features: ["CBSE, ICSE & SSC boards", "NTSE & Olympiad prep", "Logical reasoning module"],
    details: ["Concept labs & activity learning", "Board exam answer-writing", "NTSE / NSO / IMO preparation", "Monthly parent-teacher meets", "Mental ability training", "Batch size capped at 25"] },
  { id: "science", title: "Class 11–12 Science", category: "School & Boards", icon: "flask", tag: "Boards + CET",
    desc: "Board-focused PCM / PCB coaching aligned with MHT-CET and CUET.",
    duration: "2 years", audience: "Class 11 & 12 (PCM / PCB)", mode: "Classroom",
    features: ["Board + CET integrated", "Practical journal support", "Chapter-wise test series"],
    details: ["HSC & CBSE syllabus coverage", "MHT-CET mock tests", "Practical & viva preparation", "Revision crash course", "Weekend doubt clinics", "Board pattern prelims"] },
  { id: "commerce", title: "Commerce Coaching", category: "School & Boards", icon: "calc", tag: "CA track",
    desc: "Accounts, Economics, Business Studies & Maths with a CA Foundation pathway.",
    duration: "1–2 years", audience: "Class 11, 12 & CA aspirants", mode: "Classroom + Recorded",
    features: ["Taught by practising CAs", "Case-study based learning", "CUET Commerce prep"],
    details: ["Accountancy with real ledgers", "Economics made visual", "CA Foundation integration", "CUET domain subjects", "Board answer presentation", "Career counselling (CA/CS/CMA)"] },
  { id: "competitive", title: "Competitive Exam Preparation", category: "Government Exams", icon: "compass", tag: "Multi-exam",
    desc: "Targeted coaching for CUET, NDA, MHT-CET, Olympiads and other entrance exams.",
    duration: "3–9 months", audience: "Class 10, 12 & graduates", mode: "Classroom + Live online",
    features: ["Exam-specific modules", "Adaptive practice portal", "Crash & weekend batches"],
    details: ["CUET UG & PG preparation", "NDA written & SSB guidance", "Olympiad level-2 training", "Personalised study schedule", "All-India test series", "Flexible weekend batches"] },
];

const FACULTY = [
  { name: "Prof. Rajesh Iyer", subject: "Physics", exp: 22, qual: "B.Tech & M.Tech, IIT Bombay", photo: photo("1787021029393-61daacd84de2"),
    bio: "Makes mechanics intuitive through experiments and visual problem-solving. Mentored 300+ IIT selections." },
  { name: "Dr. Ananya Deshpande", subject: "Biology", exp: 12, qual: "MBBS, AIIMS New Delhi", photo: photo("1758518729459-235dcaadc611"),
    bio: "A practising doctor who brings clinical stories into NCERT Biology. Known for her diagram masterclasses." },
  { name: "Vikram Joshi", subject: "Mathematics", exp: 16, qual: "B.Tech, IIT Delhi", photo: photo("1778692258270-bc0e80e975c0"),
    bio: "Calculus and coordinate geometry specialist. Author of the Apex Maths Problem Book series." },
  { name: "Dr. Meera Kulkarni", subject: "Chemistry", exp: 14, qual: "Ph.D., CSIR-NCL Pune", photo: photo("1679138118375-47f78db3761d"),
    bio: "Turns organic reaction mechanisms into simple stories. Former research scientist at NCL Pune." },
  { name: "Sanjay Patil", subject: "Polity & General Studies", exp: 20, qual: "M.A. Pol. Sci., Former Dy. Collector", photo: photo("1758336011136-343678e4fc05"),
    bio: "Former state civil servant who has guided 112 UPSC & MPSC officers. Leads our mock interview panel." },
  { name: "Priya Nair", subject: "Quant & Reasoning", exp: 10, qual: "MBA, IIM Lucknow", photo: photo("1628726987013-db899232027c"),
    bio: "Speed-maths expert behind our banking toppers. Teaches shortcuts that save minutes in every exam." },
  { name: "CA Arjun Mehta", subject: "Accountancy & Economics", exp: 11, qual: "Chartered Accountant, B.Com", photo: photo("1601655781320-205e34c94eb1"),
    bio: "Practising CA who teaches accounts with real-business case studies and live ledgers." },
  { name: "Kavita Rao", subject: "Foundation Maths & Science", exp: 18, qual: "M.Sc. Mathematics, B.Ed.", photo: photo("1739917851192-63bd998b373a"),
    bio: "Builds rock-solid fundamentals for Class 8–10 and coaches our NTSE and Olympiad scholars." },
];

// cat = filter group on the Results page · featured = shown in the Hall of Fame
const RESULTS = [
  { name: "Aditya Kulkarni", cat: "JEE", exam: "JEE Advanced", year: 2026, rankLabel: "AIR", rank: "47", outcome: "IIT Bombay · Computer Science", score: "312 / 360", program: "2-Year Classroom", photo: photo("1717672054431-a420638cd543"), featured: true,
    quote: "The weekly test analysis showed me exactly where I was losing marks." },
  { name: "Sneha Patil", cat: "NEET", exam: "NEET UG", year: 2026, rankLabel: "AIR", rank: "112", outcome: "AIIMS New Delhi · MBBS", score: "705 / 720", program: "2-Year Classroom", photo: photo("1618245472177-2a74ad3b994a"), featured: true,
    quote: "Biology diagram sessions made the toughest chapters unforgettable." },
  { name: "Rohan Deshmukh", cat: "UPSC / MPSC", exam: "UPSC CSE", year: 2025, rankLabel: "AIR", rank: "86", outcome: "Indian Administrative Service", score: "1,024 marks", program: "Integrated GS", photo: photo("1649433658557-54cf58577c68"), featured: true,
    quote: "Mock interviews with former officers gave me real confidence." },
  { name: "Ishita Sharma", cat: "JEE", exam: "JEE Main", year: 2026, rankLabel: "", rank: "99.98", rankSuffix: "%ile", outcome: "Maharashtra Topper (Girls)", score: "NTA score 99.98", program: "2-Year Classroom", photo: photo("1617009762269-c062aaf6b3a0") },
  { name: "Omkar Jadhav", cat: "UPSC / MPSC", exam: "MPSC State Services", year: 2025, rankLabel: "Rank", rank: "3", outcome: "Deputy Collector, Maharashtra", score: "Interview: 88 / 100", program: "MPSC Integrated", photo: photo("1782323709687-43675cbddd46") },
  { name: "Tanvi Gokhale", cat: "NEET", exam: "NEET UG", year: 2025, rankLabel: "AIR", rank: "298", outcome: "B.J. Medical College, Pune", score: "690 / 720", program: "1-Year Repeater", photo: photo("1770838447151-05a876cdee3d") },
  { name: "Kunal Shinde", cat: "JEE", exam: "JEE Advanced", year: 2025, rankLabel: "AIR", rank: "410", outcome: "IIT Madras · Electrical Engg.", score: "268 / 360", program: "2-Year Classroom", photo: photo("1591675101827-3b2271747d79") },
  { name: "Pooja Nair", cat: "NEET", exam: "NEET UG", year: 2026, rankLabel: "AIR", rank: "655", outcome: "AFMC Pune · MBBS", score: "686 / 720", program: "2-Year Classroom", photo: photo("1726156619056-5de67024df67") },
  { name: "Harsh Agarwal", cat: "Govt & Banking", exam: "SBI PO", year: 2025, rankLabel: "", rank: "Selected", outcome: "Probationary Officer, SBI", score: "Top 1% in Mains", program: "Banking Fast Track", photo: photo("1600180758890-6b94519a8ba6") },
  { name: "Siddharth Rao", cat: "Govt & Banking", exam: "SSC CGL", year: 2025, rankLabel: "AIR", rank: "38", outcome: "Assistant Audit Officer", score: "Tier II: 372 / 390", program: "SSC Classroom", photo: photo("1598096969068-7f52cac10c83") },
  { name: "Ananya Joshi", cat: "Boards & Commerce", exam: "CA Foundation", year: 2026, rankLabel: "AIR", rank: "12", outcome: "ICAI Merit Certificate", score: "362 / 400", program: "Commerce + CA Track", photo: photo("1741354035032-eff737bfd35c") },
  { name: "Aditi Bhosale", cat: "Boards & Commerce", exam: "CBSE Class 10", year: 2026, rankLabel: "", rank: "99.2", rankSuffix: "%", outcome: "NTSE Scholar · City Topper", score: "496 / 500", program: "Foundation (3 yrs)", photo: photo("1623631140622-cca64af89fff") },
];

const WHY = [
  { icon: "user-check", title: "Experienced Faculty", text: "Mentors from IITs, AIIMS and civil services with 10–20 years of teaching." },
  { icon: "users", title: "Small Batch Sizes", text: "Capped at 25–40 students so every learner is seen, heard and tracked." },
  { icon: "target", title: "Personal Mentoring", text: "A dedicated mentor builds a study plan and reviews progress every fortnight." },
  { icon: "clipboard", title: "Regular Tests", text: "Weekly chapter tests and monthly full-length mocks in real exam pattern." },
  { icon: "message", title: "Doubt-Solving Sessions", text: "Daily doubt windows in person, plus a chat-based doubt desk till 10 PM." },
  { icon: "monitor", title: "Digital Resources", text: "Recorded lectures, e-notes and an adaptive practice portal on any device." },
  { icon: "trend", title: "Performance Tracking", text: "Topic-wise analytics show strengths, gaps and predicted rank after every test." },
  { icon: "gift", title: "Scholarships", text: "Up to 100% tuition waiver through ASAT and merit-based awards." },
];

const LEARNING = [
  { icon: "users", title: "Classroom Learning", text: "Interactive lectures in smart classrooms with focused batches." },
  { icon: "video", title: "Online Live Classes", text: "Attend the same live lecture from home with real-time doubt chat." },
  { icon: "play", title: "Recorded Lectures", text: "Every class recorded and searchable for anytime revision." },
  { icon: "book", title: "Study Materials", text: "Expert-written modules, DPPs and formula books — print & digital." },
  { icon: "monitor", title: "Mock Tests", text: "Full-length, exam-pattern mocks on our online test portal." },
  { icon: "pen", title: "Weekly Assessments", text: "Short chapter tests every week to lock in what was learnt." },
  { icon: "user-check", title: "Personal Mentorship", text: "One-on-one guidance on strategy, time and motivation." },
  { icon: "file", title: "Parent Progress Reports", text: "Weekly reports on attendance, scores and mentor remarks." },
];

const TESTIMONIALS = [
  { name: "Aditya Kulkarni", course: "JEE Advanced 2026", achievement: "AIR 47 · IIT Bombay CSE", photo: photo("1717672054431-a420638cd543", 500, 500),
    quote: "The weekly tests were tough, but the analysis after each one showed me exactly where I was losing marks. My mentor rebuilt my Physics strategy in Class 12 — that changed everything." },
  { name: "Sneha Patil", course: "NEET UG 2026", achievement: "AIR 112 · AIIMS New Delhi", photo: photo("1618245472177-2a74ad3b994a", 500, 500),
    quote: "Dr. Ananya's diagram sessions made Biology unforgettable. The OMR mocks trained me to stay calm. I genuinely felt the teachers cared about my result as much as I did." },
  { name: "Rohan Deshmukh", course: "UPSC CSE 2025", achievement: "AIR 86 · IAS", photo: photo("1649433658557-54cf58577c68", 500, 500),
    quote: "Answer-writing evaluation every week and the mock interview panel with former officers gave me the confidence I needed. Apex felt like a second family in Pune." },
  { name: "Aditi Bhosale", course: "Class 8–10 Foundation", achievement: "99.2% CBSE · NTSE Scholar", photo: photo("1623631140622-cca64af89fff", 500, 500),
    quote: "I joined in Class 8 and was scared of Maths. Small batches meant Kavita ma'am noticed every mistake. Now Maths is my favourite subject!" },
  { name: "Harsh Agarwal", course: "SBI PO 2025", achievement: "Selected · Top 1% in Mains", photo: photo("1600180758890-6b94519a8ba6", 500, 500),
    quote: "The speed-maths shortcuts and 100+ online mocks made the difference. I cleared the exam in my first attempt while working part-time." },
];

const FAQS = [
  { q: "Which courses are available?", a: "We offer JEE Main & Advanced, NEET UG, UPSC/MPSC, SSC & Banking, Class 8–10 Foundation, Class 11–12 Science, Commerce coaching (with a CA Foundation track) and preparation for CUET, NDA, MHT-CET and Olympiads." },
  { q: "How can I enroll?", a: "Fill in the application form on the Admissions page or book a free counselling session. After a short diagnostic or ASAT test and an optional demo class, choose a batch, submit documents and confirm your seat." },
  { q: "Are demo classes available?", a: "Yes. Every student can attend up to 3 free demo classes in their chosen program before enrolling — offline at our centres or online through the live classroom." },
  { q: "Do you offer scholarships?", a: "Yes. The Apex Scholarship Admission Test (ASAT) offers 25% to 100% tuition waivers based on score. We also have merit, sibling and defence-family scholarships." },
  { q: "Are online classes available?", a: "All major programs run as live online batches with the same faculty, recorded lectures, digital study material and online mock tests. Hybrid options are available too." },
  { q: "How can I attend a counselling session?", a: "Use any 'Book Free Counselling' button, call +91 98765 43210, or walk in Monday to Saturday between 9 AM and 8 PM. Sessions last about 30 minutes and parents are welcome." },
  { q: "What is the batch size?", a: "We cap batches at 25 students for Foundation and 40 for JEE/NEET/UPSC, keeping a maximum teacher–student ratio of 1:25 in doubt and mentoring sessions." },
];

// Upcoming batches on the Admissions page (seats = remaining / total)
const BATCHES = [
  { program: "JEE 2-Year (Class 11)", start: "05 Apr 2027", timing: "Mon–Sat · 4:00–7:30 PM", mode: "Classroom / Online", seats: [8, 40] },
  { program: "NEET 2-Year (Class 11)", start: "05 Apr 2027", timing: "Mon–Sat · 4:00–7:30 PM", mode: "Classroom / Online", seats: [11, 40] },
  { program: "JEE / NEET Repeater", start: "20 May 2027", timing: "Mon–Sat · 9:00 AM–2:00 PM", mode: "Classroom", seats: [15, 40] },
  { program: "Class 8–10 Foundation", start: "12 Apr 2027", timing: "Mon, Wed, Fri · 5:00–7:00 PM", mode: "Classroom", seats: [6, 25] },
  { program: "UPSC / MPSC Integrated", start: "01 Jun 2027", timing: "Mon–Fri · 7:00–10:00 AM", mode: "Hybrid", seats: [19, 40] },
  { program: "SSC & Banking Fast Track", start: "15 Jan 2027", timing: "Weekend · 10:00 AM–4:00 PM", mode: "Classroom / Online", seats: [22, 40] },
];

const ENQUIRY_EXTRAS = ["Scholarship Test (ASAT 2027)", "Free Counselling Session", "General Course Enquiry"];

// Scholarship test early-bird deadline (IST) — update every admission cycle
const ASAT_DEADLINE = new Date("2026-12-15T23:59:59+05:30");

/* ==========================================================================
   2. HELPERS
   ========================================================================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const icon = (name, cls = "icon") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const mount = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const scrollBehavior = () => (reduceMotion ? "auto" : "smooth");

let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

// Fallback tile with initials if a remote photo fails to load
function applyImageFallback(img) {
  if (img.dataset.fallback) return;
  img.dataset.fallback = "1";
  const initials = (img.alt || "AA").split(/[\s,]+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("") || "AA";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='#EAF4FD'/><text x='50%' y='54%' font-family='Georgia,serif' font-size='64' fill='#2466A8' text-anchor='middle' dominant-baseline='middle'>${initials}</text></svg>`;
  img.src = "data:image/svg+xml," + encodeURIComponent(svg);
}
document.addEventListener("error", (e) => { if (e.target.tagName === "IMG") applyImageFallback(e.target); }, true);

/* ==========================================================================
   3. SHARED LAYOUT — one source for the icon set, header and footer
   ========================================================================== */
const ICONS = {
  "arrow-right": '<path d="M5 12h14M12 5l7 7-7 7"/>',
  "arrow-up": '<path d="M12 19V5M5 12l7-7 7 7"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  medal: '<circle cx="12" cy="15" r="6"/><path d="M8.5 9.6 6 2h4l2 5 2-5h4l-2.5 7.6"/><path d="m12 12.5.9 1.8 2 .3-1.45 1.4.35 2-1.8-.95-1.8.95.35-2-1.45-1.4 2-.3z"/>',
  book: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/>',
  video: '<path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>',
  clipboard: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  pen: '<path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  message: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  trend: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
  cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  "user-check": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m16 11 2 2 4-4"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 17 10 5 10-5M2 12l10 5 10-5"/>',
  building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1"/>',
  atom: '<circle cx="12" cy="12" r="1.2"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"/>',
  steth: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6 6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
  landmark: '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2l8 5H4z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  sprout: '<path d="M7 20h10M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
  flask: '<path d="M9 3h6M10 3v6L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 9V3"/><path d="M7 15h10"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>',
  compass: '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
  youtube: '<path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
};

const LOGO = `<svg class="brand__mark" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#2466A8"/><path d="M7 30 17 13.5l5.2 8.3 3.3-4.6L33 30Z" fill="#E3CD9F"/><path d="m17 13.5 2.6 4.2-2.6-1.4-2.4 1.6Z" fill="#FFFFFF"/></svg>`;
const BRAND = (light = false) => `
  <a href="index.html" class="brand${light ? " brand--light" : ""}" aria-label="${SITE.name} — home">
    ${LOGO}<span class="brand__text"><strong>${SITE.name}</strong><small>${SITE.tagline}</small></span>
  </a>`;

const NAV = [
  { page: "home", href: "index.html", label: "Home" },
  { page: "courses", href: "courses.html", label: "Courses" },
  { page: "faculty", href: "faculty.html", label: "Faculty" },
  { page: "results", href: "results.html", label: "Results" },
  { page: "about", href: "about.html", label: "About Us" },
  { page: "contact", href: "contact.html", label: "Contact" },
];

function renderLayout() {
  const page = document.body.dataset.page;

  // Icon sprite (referenced as <use href="#i-name">)
  document.body.insertAdjacentHTML("afterbegin",
    `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${Object.entries(ICONS)
      .map(([n, p]) => `<symbol id="i-${n}" viewBox="0 0 24 24">${p}</symbol>`).join("")}</defs></svg>`);

  const header = $("#site-header");
  if (header) header.outerHTML = `
    <div class="scroll-progress" aria-hidden="true"><span id="scrollProgress"></span></div>
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="topbar">
      <div class="container topbar__inner">
        <p><span class="dot"></span> <span class="topbar__lead">Admissions open for 2027–28 ·</span> <a href="admissions.html">ASAT scholarship test — register free →</a></p>
        <div class="topbar__links">
          <a href="${SITE.phoneHref}">${icon("phone")} ${SITE.phone}</a>
          <a href="mailto:${SITE.email}">${icon("mail")} ${SITE.email}</a>
        </div>
      </div>
    </div>
    <header class="site-header" id="siteHeader">
      <nav class="nav container" aria-label="Primary">
        ${BRAND()}
        <ul class="nav__links" id="navLinks">
          ${NAV.map((n) => `<li><a href="${n.href}" class="nav__link${n.page === page ? " is-active" : ""}"${n.page === page ? ' aria-current="page"' : ""}>${n.label}</a></li>`).join("")}
          <li class="nav__cta-mobile"><a href="admissions.html" class="btn btn--accent btn--block">Apply Now</a></li>
        </ul>
        <div class="nav__actions">
          <a href="admissions.html" class="btn btn--accent btn--sm nav__cta${page === "admissions" ? " is-current" : ""}">Apply Now</a>
          <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks"><span></span><span></span><span></span></button>
        </div>
      </nav>
    </header>`;

  const footer = $("#site-footer");
  if (footer) footer.outerHTML = `
    <footer class="footer">
      <div class="container footer__grid">
        <div class="footer__brand">
          ${BRAND(true)}
          <p>Mentor-led coaching for JEE, NEET, civil services, government exams and school foundation. Three Pune centres and a live online campus.</p>
          <div class="socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener" aria-label="Instagram">${icon("instagram")}</a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener" aria-label="Facebook">${icon("facebook")}</a>
            <a href="https://www.youtube.com/" target="_blank" rel="noopener" aria-label="YouTube">${icon("youtube")}</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn">${icon("linkedin")}</a>
          </div>
        </div>
        <div><h4>Quick Links</h4><ul>
          ${NAV.slice(1).map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join("")}
          <li><a href="admissions.html">Admissions &amp; ASAT</a></li>
        </ul></div>
        <div><h4>Courses</h4><ul>
          ${COURSES.slice(0, 6).map((c) => `<li><a href="courses.html" data-learn="${c.id}">${c.title}</a></li>`).join("")}
        </ul></div>
        <div><h4>Get in Touch</h4><ul class="footer__contact">
          <li>${icon("pin")}<span>${SITE.address}</span></li>
          <li>${icon("phone")}<a href="${SITE.phoneHref}">${SITE.phone}</a></li>
          <li>${icon("mail")}<a href="mailto:${SITE.email}">${SITE.email}</a></li>
          <li>${icon("clock")}<span>${SITE.hours}</span></li>
        </ul></div>
      </div>
      <div class="footer__bottom container">
        <p>© ${new Date().getFullYear()} ${SITE.name}. All rights reserved. Demo website — names, results and data are illustrative.</p>
        <p><a href="#top" data-top>Back to top ↑</a></p>
      </div>
    </footer>
    <button class="back-to-top" id="backToTop" aria-label="Back to top">${icon("arrow-up")}</button>
    <div class="modal" id="courseModal" hidden>
      <div class="modal__backdrop" data-close></div>
      <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal__close icon-btn" data-close aria-label="Close course details">${icon("x")}</button>
        <div id="modalBody"></div>
      </div>
    </div>
    <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}

/* ==========================================================================
   4. COMPONENT RENDERERS
   ========================================================================== */
const courseCard = (c, i) => `
  <article class="course-card reveal" data-category="${c.category}" data-delay="${(i % 4) + 1}">
    <div class="course-card__top">
      <span class="course-card__icon">${icon(c.icon)}</span>
      <span class="course-card__tag">${c.tag}</span>
    </div>
    <h3>${c.title}</h3>
    <p class="course-card__desc">${c.desc}</p>
    <ul class="course-card__meta">
      <li>${icon("clock")} ${c.duration}</li>
      <li>${icon("users")} ${c.audience}</li>
    </ul>
    <ul class="course-card__features">${c.features.map((f) => `<li>${icon("check")}<span>${f}</span></li>`).join("")}</ul>
    <div class="course-card__actions">
      <button type="button" class="btn btn--ghost" data-learn="${c.id}" aria-label="Learn more about ${c.title}">Learn More</button>
      <button type="button" class="btn btn--primary" data-enquire="${c.title}" aria-label="Enquire about ${c.title}">Enquire Now</button>
    </div>
  </article>`;

function renderCourses() {
  const grid = $("#courseGrid");
  if (!grid) return;
  const limit = Number(grid.dataset.limit) || COURSES.length;
  grid.innerHTML = COURSES.slice(0, limit).map(courseCard).join("");

  const categories = ["All Programs", ...new Set(COURSES.map((c) => c.category))];
  mount("#courseFilters", categories.map((cat, i) => {
    const count = i === 0 ? COURSES.length : COURSES.filter((c) => c.category === cat).length;
    return `<button type="button" class="filter-btn${i === 0 ? " is-active" : ""}" aria-pressed="${i === 0}" data-filter="${i === 0 ? "all" : cat}">${cat}<span class="count">${count}</span></button>`;
  }).join(""));
}

function renderFaculty() {
  const grid = $("#facultyGrid");
  if (!grid) return;
  const limit = Number(grid.dataset.limit) || FACULTY.length;
  grid.innerHTML = FACULTY.slice(0, limit).map((f, i) => `
    <article class="fac-card reveal" data-delay="${(i % 4) + 1}" tabindex="0">
      <div class="fac-card__photo">
        <img src="${f.photo}" alt="${f.name}, ${f.subject} faculty" loading="lazy">
        <span class="fac-card__exp">${f.exp}+ yrs</span>
        <div class="fac-card__overlay"><p>${f.bio}</p></div>
      </div>
      <div class="fac-card__body">
        <span class="fac-card__subject">${f.subject}</span>
        <h3>${f.name}</h3>
        <p class="fac-card__qual">${icon("cap")} ${f.qual}</p>
        <p class="fac-card__bio-mobile">${f.bio}</p>
      </div>
    </article>`).join("");
}

// Achievement card — photo-led, rank overlaid on the portrait
const rankHTML = (r) => `${r.rankLabel ? `<small>${r.rankLabel}</small>` : ""}<strong>${r.rank}</strong>${r.rankSuffix ? `<em>${r.rankSuffix}</em>` : ""}`;
const achievementCard = (r, i) => `
  <article class="achv-card reveal" data-cat="${r.cat}" data-delay="${(i % 4) + 1}">
    <div class="achv-card__media">
      <img src="${r.photo}" alt="${r.name}, ${r.exam} ${r.year}" loading="lazy">
      <span class="achv-card__exam">${r.exam}</span>
      <span class="achv-card__year">${r.year}</span>
      <div class="achv-card__rank">${rankHTML(r)}</div>
    </div>
    <div class="achv-card__body">
      <h3>${r.name}</h3>
      <p class="achv-card__outcome">${icon("cap")}<span>${r.outcome}</span></p>
      <dl class="achv-card__facts">
        <div><dt>Score</dt><dd>${r.score}</dd></div>
        <div><dt>Program</dt><dd>${r.program}</dd></div>
      </dl>
    </div>
  </article>`;

function renderResults() {
  const grid = $("#resultsGrid");
  if (grid) {
    const limit = Number(grid.dataset.limit) || RESULTS.length;
    grid.innerHTML = RESULTS.slice(0, limit).map(achievementCard).join("");
  }

  // Filter buttons by exam group
  const cats = ["All Results", ...new Set(RESULTS.map((r) => r.cat))];
  mount("#resultFilters", cats.map((cat, i) =>
    `<button type="button" class="filter-btn${i === 0 ? " is-active" : ""}" aria-pressed="${i === 0}" data-filter="${i === 0 ? "all" : cat}">${cat}</button>`).join(""));

  // Hall of Fame — featured toppers
  mount("#hallOfFame", RESULTS.filter((r) => r.featured).map((r, i) => `
    <article class="hof-card reveal" data-delay="${i + 1}">
      <span class="hof-card__medal">${icon("medal")} ${["Gold", "Silver", "Bronze"][i] || "Star"} Achiever</span>
      <div class="hof-card__photo"><img src="${r.photo}" alt="${r.name}" loading="lazy"></div>
      <div class="hof-card__rank">${rankHTML(r)}</div>
      <p class="hof-card__exam">${r.exam} · ${r.year}</p>
      <h3>${r.name}</h3>
      <p class="hof-card__outcome">${r.outcome}</p>
      <blockquote>“${r.quote}”</blockquote>
    </article>`).join(""));
}

function renderWhy() {
  const grid = $("#whyGrid");
  if (!grid) return;
  const limit = Number(grid.dataset.limit) || WHY.length;
  grid.innerHTML = WHY.slice(0, limit).map((w, i) => `
    <article class="why-card reveal" data-delay="${(i % 4) + 1}">
      <span class="why-card__num">${String(i + 1).padStart(2, "0")}</span>
      <span class="why-card__icon">${icon(w.icon)}</span>
      <h3>${w.title}</h3>
      <p>${w.text}</p>
    </article>`).join("");
}

function renderLearning() {
  mount("#learnGrid", LEARNING.map((l, i) => `
    <article class="learn-card reveal" data-delay="${(i % 2) + 1}">
      <span class="learn-card__icon">${icon(l.icon)}</span>
      <div><h3>${l.title}</h3><p>${l.text}</p></div>
    </article>`).join(""));
}

function renderTestimonials() {
  const track = $("#carouselTrack");
  if (!track) return;
  track.innerHTML = TESTIMONIALS.map((t, i) => `
    <div class="slide" role="group" aria-roledescription="slide" aria-label="${i + 1} of ${TESTIMONIALS.length}">
      <div class="slide__photo">
        <img src="${t.photo}" alt="${t.name}" loading="lazy">
        <span class="slide__achv">${icon("trophy")} ${t.achievement}</span>
      </div>
      <div class="slide__content">
        <span class="slide__quote-mark" aria-hidden="true">“</span>
        <blockquote>${t.quote}</blockquote>
        <div class="slide__stars" aria-label="5 out of 5 stars">★★★★★</div>
        <div class="slide__name">${t.name}</div>
        <div class="slide__course">${t.course}</div>
      </div>
    </div>`).join("");
  mount("#carouselDots", TESTIMONIALS.map((t, i) =>
    `<button type="button" class="carousel__dot" aria-label="Show testimonial ${i + 1}: ${t.name}" data-index="${i}"></button>`).join(""));
}

function renderFaq() {
  mount("#faqAccordion", FAQS.map((f, i) => `
    <div class="acc-item reveal" data-delay="${(i % 4) + 1}">
      <h3><button type="button" class="acc-btn" id="faq-btn-${i}" aria-expanded="false" aria-controls="faq-panel-${i}">
        <span>${f.q}</span><span class="acc-btn__icon">${icon("plus")}</span></button></h3>
      <div class="acc-panel" id="faq-panel-${i}" role="region" aria-labelledby="faq-btn-${i}"><div><p>${f.a}</p></div></div>
    </div>`).join(""));
}

function renderBatches() {
  mount("#batchTable", BATCHES.map((b) => {
    const [left, total] = b.seats;
    const pct = Math.round(((total - left) / total) * 100);
    const urgent = left <= 10;
    return `<tr>
      <th scope="row">${b.program}</th>
      <td data-label="Starts">${b.start}</td>
      <td data-label="Timing">${b.timing}</td>
      <td data-label="Mode">${b.mode}</td>
      <td data-label="Seats">
        <div class="seats${urgent ? " seats--urgent" : ""}"><span class="seats__bar"><i style="--w:${pct}%"></i></span><b>${left} left</b></div>
      </td>
      <td><button type="button" class="btn btn--sm btn--ghost" data-enquire="${b.program}" data-target="apply">Reserve</button></td>
    </tr>`;
  }).join(""));
}

// Fill every course <select> on the page from COURSES (+ extra enquiry types)
function fillCourseSelects() {
  $$("select[data-courses]").forEach((select) => {
    [...COURSES.map((c) => c.title), ...ENQUIRY_EXTRAS].forEach((t) => select.add(new Option(t, t)));
  });
}

/* ==========================================================================
   5. NAVIGATION, SCROLL UI, REVEAL & COUNTERS
   ========================================================================== */
function initNavigation() {
  const header = $("#siteHeader");
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  if (!header) return;

  const setMenu = (open) => {
    // Drawer starts right under the header (the top bar may still be visible)
    if (open) links.style.top = `${header.getBoundingClientRect().bottom}px`;
    links.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("no-scroll", open);
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("is-open")));
  links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && links.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
  window.matchMedia("(min-width: 1025px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

  // Scroll progress, header shadow and back-to-top in one rAF-throttled handler
  const progress = $("#scrollProgress");
  const backToTop = $("#backToTop");
  const mobileCta = $(".mobile-cta");
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    header.classList.toggle("is-scrolled", y > 40);
    backToTop.classList.toggle("is-visible", y > 700);
    if (mobileCta) mobileCta.classList.toggle("is-visible", y > 500);
    ticking = false;
  };
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  const toTop = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: scrollBehavior() }); };
  backToTop.addEventListener("click", toTop);
  $$("[data-top]").forEach((a) => a.addEventListener("click", toTop));
}

function initReveal() {
  const targets = $$(".reveal, .report");
  if (!("IntersectionObserver" in window)) { targets.forEach((el) => el.classList.add("is-visible")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  targets.forEach((el) => io.observe(el));
}

function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = reduceMotion ? 0 : 1800;
  const start = performance.now();
  const step = (now) => {
    const p = duration ? Math.min((now - start) / duration, 1) : 1;
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString("en-IN"); // easeOutCubic
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function initCounters() {
  const counters = $$("[data-count]");
  if (!("IntersectionObserver" in window)) { counters.forEach(animateCount); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { animateCount(entry.target); io.unobserve(entry.target); } });
  }, { threshold: 0.5 });
  counters.forEach((el) => io.observe(el));
}

/* ==========================================================================
   6. FILTERS (courses & results) + COURSE DETAILS MODAL
   ========================================================================== */
// Generic filter: buttons in `filterSel` show/hide `itemSel` items by `attr`
function initFilter(filterSel, itemSel, attr) {
  const bar = $(filterSel);
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    $$(".filter-btn", bar).forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
    const value = btn.dataset.filter;
    $$(itemSel).forEach((item) => {
      const show = value === "all" || item.getAttribute(attr) === value;
      item.classList.toggle("is-hidden", !show);
      if (show) { // replay a short entrance animation
        item.classList.remove("is-visible");
        requestAnimationFrame(() => requestAnimationFrame(() => item.classList.add("is-visible")));
      }
    });
  });
}

const modal = { el: null, lastFocus: null };

function openCourseModal(id) {
  const c = COURSES.find((course) => course.id === id);
  if (!c || !modal.el) return;
  modal.lastFocus = document.activeElement;
  $("#modalBody").innerHTML = `
    <div class="modal__head">
      <span class="course-card__icon">${icon(c.icon)}</span>
      <div><span class="course-card__tag">${c.category}</span><h2 id="modalTitle">${c.title}</h2></div>
    </div>
    <p>${c.desc}</p>
    <div class="modal__facts">
      <div><small>Duration</small><strong>${c.duration}</strong></div>
      <div><small>For</small><strong>${c.audience}</strong></div>
      <div><small>Mode</small><strong>${c.mode}</strong></div>
    </div>
    <h4>What's included</h4>
    <ul class="modal__list">${[...c.features, ...c.details].map((d) => `<li>${icon("check")}<span>${d}</span></li>`).join("")}</ul>
    <div class="modal__actions">
      <button type="button" class="btn btn--accent" data-enquire="${c.title}" data-target="apply">Apply for this Program ${icon("arrow-right")}</button>
      <button type="button" class="btn btn--ghost" data-enquire="${c.title}">Ask a Question</button>
    </div>`;
  modal.el.hidden = false;
  document.body.classList.add("no-scroll");
  $(".modal__close", modal.el).focus();
}

function closeCourseModal() {
  if (!modal.el || modal.el.hidden) return;
  modal.el.hidden = true;
  document.body.classList.remove("no-scroll");
  if (modal.lastFocus) modal.lastFocus.focus({ preventScroll: true });
}

function initModal() {
  modal.el = $("#courseModal");
  if (!modal.el) return;
  modal.el.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeCourseModal(); });
  document.addEventListener("keydown", (e) => {
    if (modal.el.hidden) return;
    if (e.key === "Escape") closeCourseModal();
    if (e.key === "Tab") { // keep focus inside the dialog
      const f = $$("button, a[href]", modal.el);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
}

/* ==========================================================================
   7. ENQUIRY SHORTCUTS
   data-enquire="Course"                 → enquiry form (contact.html)
   data-enquire="Course" data-target="apply" → application form (admissions.html)
   If the form is on the current page it is pre-filled; otherwise we navigate
   to the right page with ?course=… and pre-fill on arrival.
   data-learn="courseId"                 → opens the course details modal
   ========================================================================== */
function prefillForm(form, course, { scroll = true, notify = true } = {}) {
  const select = $("select[data-courses]", form);
  if (!select || !course) return;
  if (![...select.options].some((o) => o.value === course)) select.add(new Option(course, course));
  resetForm(form);
  select.value = course;
  validateField(select);
  goToStep(form, 0);

  if (scroll) form.closest("[data-form-anchor]")?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  const field = select.closest(".field");
  field.classList.remove("flash"); void field.offsetWidth; field.classList.add("flash");
  setTimeout(() => $("input", form)?.focus({ preventScroll: true }), scroll ? 700 : 0);
  if (notify) showToast(`“${course}” selected — complete the form below.`);
}

function initEnquiryShortcuts() {
  document.addEventListener("click", (e) => {
    const learn = e.target.closest("[data-learn]");
    if (learn) { e.preventDefault(); openCourseModal(learn.dataset.learn); return; }

    const trigger = e.target.closest("[data-enquire]");
    if (!trigger) return;
    e.preventDefault();
    closeCourseModal();
    const course = trigger.dataset.enquire;
    const isApply = trigger.dataset.target === "apply";
    const form = $(isApply ? "#applyForm" : "#enquiryForm") || (!isApply && $("#applyForm"));
    if (form) prefillForm(form, course);
    else window.location.href = `${isApply ? "admissions.html" : "contact.html"}?course=${encodeURIComponent(course)}#${isApply ? "apply" : "enquiry"}`;
  });

  // Arriving with ?course=… pre-fills the form on this page
  const course = new URLSearchParams(location.search).get("course");
  const form = $("#applyForm") || $("#enquiryForm");
  if (course && form) prefillForm(form, course, { scroll: false });
}

/* ==========================================================================
   8. TESTIMONIAL CAROUSEL — arrows, dots, autoplay, swipe, keyboard
   ========================================================================== */
function initCarousel() {
  const root = $("#testimonialCarousel");
  if (!root) return;
  const track = $("#carouselTrack");
  const slides = $$(".slide", track);
  const dots = $$(".carousel__dot", root);
  let index = 0;
  let timer = null;

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, n) => { s.setAttribute("aria-hidden", String(n !== index)); s.inert = n !== index; });
    dots.forEach((d, n) => { d.classList.toggle("is-active", n === index); d.setAttribute("aria-current", String(n === index)); });
  };
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);
  const stop = () => { clearInterval(timer); timer = null; };
  const start = () => { if (!reduceMotion && !timer) timer = setInterval(next, 6500); };
  const restart = () => { stop(); start(); };

  $("#carouselNext").addEventListener("click", () => { next(); restart(); });
  $("#carouselPrev").addEventListener("click", () => { prev(); restart(); });
  dots.forEach((d) => d.addEventListener("click", () => { goTo(Number(d.dataset.index)); restart(); }));
  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
  root.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") next(); if (e.key === "ArrowLeft") prev(); });

  let startX = null; // swipe
  const viewport = $(".carousel__viewport", root);
  viewport.addEventListener("pointerdown", (e) => { startX = e.clientX; });
  viewport.addEventListener("pointerup", (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); restart(); }
    startX = null;
  });
  viewport.addEventListener("pointercancel", () => { startX = null; });

  goTo(0);
  start();
}

/* ==========================================================================
   9. FAQ ACCORDION — one item open at a time
   ========================================================================== */
function initAccordion() {
  const acc = $("#faqAccordion");
  if (!acc) return;
  const setOpen = (item, open) => { item.classList.toggle("is-open", open); $(".acc-btn", item).setAttribute("aria-expanded", String(open)); };
  acc.addEventListener("click", (e) => {
    const btn = e.target.closest(".acc-btn");
    if (!btn) return;
    const item = btn.closest(".acc-item");
    const willOpen = !item.classList.contains("is-open");
    $$(".acc-item", acc).forEach((other) => setOpen(other, false));
    setOpen(item, willOpen);
  });
  setOpen($(".acc-item", acc), true);
}

/* ==========================================================================
   10. FORMS — validation for the enquiry & application forms (frontend only)
   Fields declare their rule with data-rule="name|phone|email|required".
   ========================================================================== */
const NAME_RE = /^[A-Za-z][A-Za-z .'-]{1,59}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RULES = {
  name: (v, label) => !v ? `Please enter ${label}.` : !NAME_RE.test(v) ? "Use letters only (at least 2 characters)." : "",
  phone: (v) => {
    const digits = v.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    return !v ? "Please enter a phone number." : !/^[6-9]\d{9}$/.test(digits) ? "Enter a valid 10-digit Indian mobile number." : "";
  },
  email: (v) => !v ? "Please enter an email address." : !EMAIL_RE.test(v) ? "Enter a valid email, e.g. name@example.com." : "",
  required: (v, label) => !v ? `Please select ${label}.` : "",
};

function validateField(field) {
  const rule = RULES[field.dataset.rule];
  if (!rule) return true;
  const message = rule(field.value.trim(), field.dataset.label || "this field");
  const wrap = field.closest(".field");
  wrap.classList.toggle("has-error", !!message);
  wrap.classList.toggle("is-valid", !message);
  $(".field__error", wrap).textContent = message;
  field.setAttribute("aria-invalid", String(!!message));
  return !message;
}

function validateGroup(fields) {
  const ok = fields.map((f) => { f.dataset.touched = "1"; return validateField(f); });
  const firstBad = fields[ok.indexOf(false)];
  if (firstBad) { firstBad.focus(); showToast("Please fix the highlighted fields."); return false; }
  return true;
}

// Multi-step support (application form). Single-step forms have no .form-step.
function goToStep(form, n) {
  const steps = $$(".form-step", form);
  if (!steps.length) return;
  steps.forEach((s, i) => { s.hidden = i !== n; });
  $$(".stepper li", form.parentElement).forEach((li, i) => {
    li.classList.toggle("is-active", i === n);
    li.classList.toggle("is-done", i < n);
  });
  form.dataset.step = n;
}

function resetForm(form) {
  form.reset();
  $$(".field", form).forEach((f) => { f.classList.remove("has-error", "is-valid"); const err = $(".field__error", f); if (err) err.textContent = ""; });
  $$("[aria-invalid]", form).forEach((el) => el.removeAttribute("aria-invalid"));
  $$("[data-touched]", form).forEach((el) => delete el.dataset.touched);
  $$("[data-counter]", form).forEach((c) => (c.textContent = "0"));
  const success = $(`#${form.dataset.success}`);
  if (success) success.hidden = true;
  form.hidden = false;
  form.parentElement.querySelector(".stepper")?.removeAttribute("hidden");
  goToStep(form, 0);
}

function initForm(form) {
  if (!form) return;
  const fields = $$("[data-rule]", form);

  fields.forEach((f) => {
    const err = $(".field__error", f.closest(".field"));
    err.id = `${f.id}-error`;
    f.setAttribute("aria-describedby", err.id);
    f.addEventListener("blur", () => { if (f.value.trim() || f.dataset.touched) validateField(f); f.dataset.touched = "1"; });
    f.addEventListener("input", () => { if (f.dataset.touched) validateField(f); });
    f.addEventListener("change", () => validateField(f));
    if (f.dataset.rule === "phone") f.addEventListener("input", () => { f.value = f.value.replace(/[^\d+\s-]/g, ""); });
  });

  $$("textarea[maxlength]", form).forEach((t) => {
    const counter = $(`[data-counter="${t.id}"]`, form);
    t.addEventListener("input", () => { if (counter) counter.textContent = t.value.length; });
  });

  // Step navigation
  $$("[data-next]", form).forEach((btn) => btn.addEventListener("click", () => {
    const step = btn.closest(".form-step");
    if (validateGroup($$("[data-rule]", step))) goToStep(form, Number(form.dataset.step || 0) + 1);
  }));
  $$("[data-prev]", form).forEach((btn) => btn.addEventListener("click", () => goToStep(form, Number(form.dataset.step || 0) - 1)));
  goToStep(form, 0);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateGroup(fields)) {
      // jump to the step containing the first error
      const bad = fields.find((f) => f.getAttribute("aria-invalid") === "true");
      const steps = $$(".form-step", form);
      if (bad && steps.length) { goToStep(form, steps.indexOf(bad.closest(".form-step"))); bad.focus(); }
      return;
    }
    // Frontend-only: nothing is sent. A short delay gives a polished "checking" state.
    const btn = $("[type=submit]", form);
    const label = $(".btn__label", btn);
    const original = label.textContent;
    btn.classList.add("is-loading");
    label.textContent = "Checking…";
    setTimeout(() => {
      btn.classList.remove("is-loading");
      label.textContent = original;
      const success = $(`#${form.dataset.success}`);
      const nameField = $("[data-rule=name]", form);
      $("[data-success-name]", success).textContent = nameField.value.trim().split(" ")[0];
      $("[data-success-course]", success).textContent = $("select[data-courses]", form).value;
      form.hidden = true;
      form.parentElement.querySelector(".stepper")?.setAttribute("hidden", "");
      success.hidden = false;
      success.focus();
    }, 900);
  });

  const success = $(`#${form.dataset.success}`);
  $("[data-reset]", success)?.addEventListener("click", () => { resetForm(form); $("input", form).focus(); });
}

/* ==========================================================================
   11. SCHOLARSHIP COUNTDOWN — any [data-countdown] block
   ========================================================================== */
function initCountdowns() {
  const blocks = $$("[data-countdown]");
  if (!blocks.length) return;
  const pad = (n) => String(n).padStart(2, "0");
  let timer = null;
  const tick = () => {
    const diff = ASAT_DEADLINE - Date.now();
    blocks.forEach((root) => {
      const set = (k, v) => { const el = $(`[data-cd="${k}"]`, root); if (el) el.textContent = pad(v); };
      if (diff <= 0) {
        const label = $(".countdown__label", root);
        if (label) label.textContent = "Early-bird window closed — regular registration is open";
        ["days", "hours", "mins", "secs"].forEach((k) => set(k, 0));
        return;
      }
      set("days", Math.floor(diff / 864e5));
      set("hours", Math.floor((diff / 36e5) % 24));
      set("mins", Math.floor((diff / 6e4) % 60));
      set("secs", Math.floor((diff / 1e3) % 60));
    });
    if (diff <= 0) clearInterval(timer);
  };
  timer = setInterval(tick, 1000);
  tick();
}

/* ==========================================================================
   12. INIT
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderLayout();
  renderCourses();
  renderFaculty();
  renderResults();
  renderWhy();
  renderLearning();
  renderTestimonials();
  renderFaq();
  renderBatches();
  fillCourseSelects();

  // Catch images that failed before the error listener existed
  $$("img").forEach((img) => { if (img.complete && img.naturalWidth === 0 && img.src) applyImageFallback(img); });

  initNavigation();
  initReveal();
  initCounters();
  initFilter("#courseFilters", ".course-card", "data-category");
  initFilter("#resultFilters", ".achv-card", "data-cat");
  initModal();
  initForm($("#enquiryForm"));
  initForm($("#applyForm"));
  initEnquiryShortcuts();
  initCarousel();
  initAccordion();
  initCountdowns();

  // Re-apply #hash scrolling now that the header has been injected
  if (location.hash && $(location.hash)) setTimeout(() => $(location.hash).scrollIntoView(), 60);
});
