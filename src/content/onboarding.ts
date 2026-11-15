// Onboarding form for new coaching clients: the questions, in Arabic, grouped into screens.
// Master list with the reasons behind each question: ../ops/specs/onboarding-form.md (questions v2).
// `en` is the English wording, used in the Markdown file the answers are saved as.

/** choice = dropdown (one answer); multi = tap any number of options. */
export type FieldType = "text" | "textarea" | "url" | "choice" | "multi";

export interface Field {
  id: string;
  type: FieldType;
  label: string;
  en: string;
  hint?: string;
  required?: boolean;
  options?: string[];
  /** Adds a free-text "other" box next to the options. */
  other?: boolean;
  /** Fields with the same group are asked together on one screen (see `groups`). */
  group?: string;
}

export interface Screen {
  id: string;
  title: string;
  en: string;
  intro?: string;
  fields: Field[];
}

const channels = ["الموقع", "إنستغرام", "تيك توك", "يوتيوب", "فيسبوك", "لينكدإن", "غير ذلك"];

export const onboarding = {
  title: "استمارة البداية",
  welcome: [
    "مرحبًا! هذه الأسئلة تساعدني على فهم عملكِ قبل جلستنا الأولى، لنبدأ من حيث أنتِ فعلًا.",
    "سؤال واحد في كل مرة، وأغلبها اختيارات. أنا وحدي من يقرأ إجاباتكِ، وأستعملها لأبني خطتكِ.",
    "إجاباتكِ تُحفظ على هذا الجهاز وأنتِ تكتبين، فيمكنكِ التوقف والعودة لاحقًا من الرابط نفسه.",
  ],
  start: "لنبدأ",
  ok: "موافق",
  enterHint: "أو اضغطي Enter ↵",
  choose: "اختاري…",
  pickAny: "اختاري كل ما ينطبق",
  next: "التالي",
  back: "السابق",
  submit: "أرسلي إجاباتي",
  sending: "جارٍ الإرسال…",
  required: "هذا السؤال مطلوب.",
  optional: "اختياري",
  otherLabel: "غير ذلك (اكتبيه)",
  doneTitle: "شكرًا، وصلتني إجاباتكِ",
  doneBody: "سأقرؤها بتمعّن قبل جلستنا الأولى. فيها نكتب هدفكِ معًا.",
  errorTitle: "لم تصل الإجابات",
  errorBody:
    "حدث خطأ أثناء الإرسال. إجاباتكِ ما زالت محفوظة على هذا الجهاز. حاولي مرة أخرى بعد قليل، أو انسخيها وأرسليها لي على واتساب.",
  retry: "أعيدي المحاولة",
  copy: "انسخي إجاباتي",
  copied: "نُسخت",
  stepLabel: (n: number, total: number) => `${n} من ${total}`,
  done: (pct: number) => `أنجزتِ ${pct}%`,
  doneLabel: "أنجزتِ",
  timeLeft: (label: string) => `باقٍ نحو ${label}`,
  almostDone: "آخر سؤال!",
  totalTime: (label: string) => `المدة: نحو ${label}`,
};

export const screens: Screen[] = [
  {
    id: "you",
    title: "أنتِ",
    en: "You",
    fields: [
      { id: "name", type: "text", label: "اسمكِ الكامل", en: "Full name", required: true },
      {
        id: "contact",
        type: "text",
        label: "أفضل وسيلة للتواصل معكِ بين الجلسات",
        en: "Best way to reach you between sessions",
        hint: "رقم واتساب أو بريد إلكتروني",
        required: true,
      },
      {
        id: "call_days",
        type: "multi",
        group: "call",
        label: "الأيام",
        en: "Days that suit the weekly call",
        options: ["الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
        required: true,
      },
      {
        id: "call_time",
        type: "multi",
        group: "call",
        label: "الوقت",
        en: "Time of day for the weekly call",
        options: ["صباحًا", "بعد الظهر", "مساءً"],
        required: true,
      },
    ],
  },
  {
    id: "business",
    title: "عملكِ اليوم",
    en: "Your business today",
    fields: [
      {
        id: "who_help",
        type: "textarea",
        label: "في جملة أو جملتين: من تساعدين، وفي ماذا؟",
        en: "Who do you help, and with what?",
        required: true,
      },
      {
        id: "offers",
        type: "textarea",
        label: "ماذا تبيعين اليوم؟ اذكري كل عرض مع سعره.",
        en: "What you sell today, with prices",
        required: true,
      },
      {
        id: "clients_3m",
        type: "choice",
        options: ["لا أحد", "1 إلى 2", "3 إلى 5", "6 إلى 10", "أكثر من 10"],
        label: "كم عميلًا دفع لكِ في الأشهر الثلاثة الأخيرة؟",
        en: "Paying clients in the last 3 months",
        required: true,
      },
      {
        id: "revenue",
        type: "choice",
        label: "تقريبًا، كم يُدخل عملكِ في الشهر؟",
        en: "Monthly revenue, roughly",
        options: [
          "أقل من 2,000 درهم",
          "من 2,000 إلى 5,000 درهم",
          "من 5,000 إلى 10,000 درهم",
          "من 10,000 إلى 20,000 درهم",
          "أكثر من 20,000 درهم",
          "أفضّل ألّا أقول",
        ],
      },
      {
        id: "client_sources",
        type: "multi",
        label: "من أين يأتيكِ عملاؤكِ اليوم؟",
        en: "Where clients come from today",
        options: ["التوصيات", "إنستغرام", "تيك توك", "يوتيوب", "فيسبوك", "لينكدإن", "واتساب", "الفعاليات"],
        other: true,
        required: true,
      },
    ],
  },
  {
    id: "presence",
    title: "أين يجدكِ الناس",
    en: "Where people find you",
    intro: "ألصقي رابط كل حساب عندكِ، واتركي الباقي فارغًا.",
    fields: [
      { id: "link_website", type: "url", label: "موقعكِ الإلكتروني", en: "Website", group: "links" },
      { id: "link_instagram", type: "url", label: "إنستغرام", en: "Instagram", group: "links" },
      { id: "link_tiktok", type: "url", label: "تيك توك", en: "TikTok", group: "links" },
      { id: "link_youtube", type: "url", label: "قناة يوتيوب", en: "YouTube channel", group: "links" },
      { id: "link_facebook", type: "url", label: "صفحة أو مجموعة فيسبوك", en: "Facebook page or group", group: "links" },
      { id: "link_linkedin", type: "url", label: "لينكدإن", en: "LinkedIn", group: "links" },
      {
        id: "link_other",
        type: "textarea",
        group: "links",
        label: "حسابات أخرى",
        en: "Other accounts",
        hint: "قناة واتساب، تيليغرام، بودكاست، نشرة بريدية…",
      },
      {
        id: "main_channel",
        type: "choice",
        label: "أيها الأهم لكِ اليوم؟",
        en: "Most important channel today",
        options: channels,
        required: true,
      },
      {
        id: "post_freq",
        type: "choice",
        label: "كم مرة تنشرين هناك؟",
        en: "How often you post there",
        options: ["يوميًا", "عدة مرات في الأسبوع", "مرة في الأسبوع", "حين يتاح لي الوقت", "توقفت عن النشر"],
        required: true,
      },
    ],
  },
  {
    id: "past_clients",
    title: "عملاؤكِ السابقون",
    en: "Your past clients",
    fields: [
      {
        id: "clients_total",
        type: "choice",
        options: ["أقل من 10", "10 إلى 20", "20 إلى 50", "أكثر من 50"],
        label: "مع كم شخصًا عملتِ إجمالًا، تقريبًا؟",
        en: "Clients worked with in total",
        required: true,
      },
      {
        id: "best_client",
        type: "textarea",
        label: "حدّثيني عن أفضل عميل عملتِ معه: من كان، وماذا كان يريد، وماذا تغيّر عنده؟",
        en: "Best client: who, what they wanted, what changed",
        required: true,
      },
      {
        id: "testimonials",
        type: "choice",
        label: "هل عندكِ شهادات أو رسائل أو صور شاشة من عملائكِ؟",
        en: "Testimonials, messages or screenshots",
        options: ["نعم، مجموعة في مكان واحد", "نعم، لكنها متفرقة", "لا"],
        required: true,
      },
    ],
  },
  {
    id: "programme",
    title: "البرنامج الذي أطلقتِه",
    en: "The programme you launched",
    fields: [
      {
        id: "prog_what",
        type: "textarea",
        label: "ما البرنامج؟ لمن كان، وبماذا وعد، وكم كان سعره؟",
        en: "The programme: who for, promise, price",
        required: true,
      },
      { id: "prog_link", type: "url", label: "رابط البرنامج أو صفحة البيع", en: "Programme or sales page link" },
      {
        id: "prog_posts",
        type: "textarea",
        label: "روابط المنشورات أو الفيديوهات التي أعلنتِ فيها عنه",
        en: "Links to the announcement posts or videos",
        hint: "ألصقي كل الروابط التي عندكِ، رابطًا في كل سطر.",
      },
      {
        id: "prog_where",
        type: "multi",
        label: "أين أعلنتِ عنه؟",
        en: "Where it was announced",
        options: [
          "منشورات إنستغرام",
          "القصص (ستوري)",
          "الريلز",
          "تيك توك",
          "يوتيوب",
          "واتساب",
          "بث مباشر",
          "البريد الإلكتروني",
          "إعلانات ممولة",
        ],
        other: true,
        required: true,
      },
      {
        id: "prog_duration",
        type: "choice",
        label: "وكم استمر الإعلان عنه؟",
        en: "How long it was announced for",
        options: ["بضعة أيام", "أسبوع إلى أسبوعين", "شهر أو أكثر"],
        required: true,
      },
      {
        id: "prog_seen",
        type: "choice",
        label: "كم شخصًا رآه، تقريبًا؟",
        en: "People who saw it",
        options: ["أقل من 100", "100 إلى 500", "500 إلى 2,000", "أكثر من 2,000", "لا أعرف"],
        group: "prog_numbers",
        required: true,
      },
      {
        id: "prog_asked",
        type: "choice",
        options: ["لا أحد", "1 إلى 5", "6 إلى 20", "أكثر من 20", "لا أعرف"],
        group: "prog_numbers",
        label: "كم شخصًا راسلكِ أو سأل عنه؟",
        en: "People who wrote or asked",
        required: true,
      },
      {
        id: "prog_bought",
        type: "choice",
        label: "كم شخصًا اشتراه؟",
        en: "People who bought",
        options: ["لا أحد", "1 إلى 3", "4 إلى 10", "أكثر من 10"],
        group: "prog_numbers",
        required: true,
      },
      {
        id: "prog_why",
        type: "textarea",
        label: "في رأيكِ، لماذا لم يشترِه أحد؟",
        en: "Why she thinks nobody bought",
      },
    ],
  },
  {
    id: "tools",
    title: "أدواتكِ",
    en: "Your tools",
    intro: "اختاري كل ما تستعملينه، ولو قليلًا. هكذا أعرف ما نحتفظ به، وما لا داعي لأن تدفعي ثمنه.",
    fields: [
      {
        id: "tools_devices",
        group: "tools_a",
        type: "multi",
        label: "الأجهزة",
        en: "Devices",
        options: ["الهاتف فقط", "حاسوب", "جهاز لوحي"],
        required: true,
      },
      {
        id: "tools_content",
        group: "tools_a",
        type: "multi",
        label: "صناعة المحتوى",
        en: "Content creation",
        options: ["Canva", "CapCut", "InShot", "Adobe"],
        other: true,
      },
      {
        id: "tools_messaging",
        group: "tools_b",
        type: "multi",
        label: "التواصل مع العملاء",
        en: "Messaging with clients",
        options: ["WhatsApp", "WhatsApp Business", "رسائل إنستغرام", "Telegram", "البريد الإلكتروني"],
        other: true,
      },
      {
        id: "tools_calls",
        group: "tools_b",
        type: "multi",
        label: "الجلسات والمكالمات",
        en: "Calls and sessions",
        options: ["Google Meet", "Zoom", "مكالمات واتساب", "حضوريًا"],
        other: true,
      },
      {
        id: "tools_booking",
        group: "tools_b",
        type: "multi",
        label: "حجز المواعيد",
        en: "Booking",
        options: ["Calendly", "Google Calendar", "عبر الرسائل"],
        other: true,
      },
      {
        id: "tools_payment",
        group: "tools_c",
        type: "multi",
        label: "استلام المال",
        en: "Getting paid",
        options: ["تحويل بنكي", "نقدًا", "CashPlus / Wafacash", "PayPal", "Stripe", "منصة الدورة"],
        other: true,
      },
      {
        id: "tools_hosting",
        group: "tools_c",
        type: "multi",
        label: "استضافة برنامجكِ",
        en: "Programme hosting",
        options: ["لا شيء بعد", "Google Drive", "مجموعة واتساب أو تيليغرام", "Skool", "Teachable", "Kajabi", "Systeme.io"],
        other: true,
      },
      {
        id: "tools_site",
        group: "tools_c",
        type: "multi",
        label: "الموقع أو صفحة البيع",
        en: "Website or landing page",
        options: ["لا شيء", "WordPress", "Wix", "Systeme.io", "Carrd", "صفحة روابط (link in bio)"],
        other: true,
      },
      {
        id: "tools_email",
        group: "tools_c",
        type: "multi",
        label: "القائمة البريدية",
        en: "Email list",
        options: ["لا شيء", "Mailchimp", "Systeme.io", "Brevo"],
        other: true,
      },
      {
        id: "tools_crm",
        group: "tools_d",
        type: "multi",
        label: "متابعة العملاء",
        en: "Keeping track of clients",
        options: ["في ذهني", "دفتر", "Excel أو Google Sheets", "Notion", "برنامج CRM"],
        other: true,
      },
      {
        id: "tools_files",
        group: "tools_d",
        type: "multi",
        label: "الملفات والمستندات",
        en: "Documents and files",
        options: ["Google Drive", "iCloud", "على الهاتف", "Notion"],
        other: true,
      },
      {
        id: "tools_ai",
        group: "tools_d",
        type: "multi",
        label: "أدوات الذكاء الاصطناعي",
        en: "AI tools",
        options: ["لا شيء", "ChatGPT", "Claude", "Gemini"],
        other: true,
      },
      {
        id: "tools_ai_freq",
        group: "tools_d",
        type: "choice",
        label: "وكم مرة تستعملينها؟",
        en: "How often she uses AI",
        options: ["أبدًا", "قليلًا", "كثيرًا"],
      },
      { id: "tools_more", type: "textarea", label: "أداة تستعملينها ولم تُذكر هنا؟", en: "Other tools", group: "tools_e" },
      {
        id: "tools_paid",
        type: "textarea",
        group: "tools_e",
        label: "أيّ هذه الأدوات تدفعين ثمنها، وكم تقريبًا في الشهر إجمالًا؟",
        en: "Paid tools and total monthly cost",
      },
    ],
  },
  {
    id: "goal",
    title: "إلى أين تريدين الوصول",
    en: "Where you want to go",
    fields: [
      {
        id: "vision",
        type: "textarea",
        label: "إذا مرّت تسعون يومًا بشكل جيد، ما الذي يتغيّر في عملكِ وحياتكِ؟",
        en: "If the 90 days go well, what is different",
        required: true,
      },
      {
        id: "number",
        type: "textarea",
        label: "لو وضعتِ لذلك رقمًا (عملاء، دخل، ساعات)، ماذا سيكون؟",
        en: "The number she would put on it",
        hint: "لا جواب خاطئ، وهذا ليس وعدًا.",
        required: true,
      },
      { id: "goal_fear", type: "textarea", label: "ما الذي يخيفكِ في وضع هذا الهدف؟", en: "What scares her about the goal" },
    ],
  },
  {
    id: "together",
    title: "عملنا معًا",
    en: "Working together",
    fields: [
      {
        id: "hours",
        type: "choice",
        label: "كم ساعة في الأسبوع تستطيعين فعلًا أن تخصّصيها لهذا؟",
        en: "Hours per week she can give",
        options: ["أقل من 3", "من 3 إلى 5", "من 6 إلى 10", "أكثر من 10"],
        required: true,
      },
      {
        id: "tried",
        type: "textarea",
        label: "ماذا جرّبتِ من قبل لتطوير عملكِ (دورات، مدرّبون، طرق)؟ ولماذا لم ينجح معكِ في رأيكِ؟",
        en: "What she tried before and why it didn't work",
        required: true,
      },
      {
        id: "why_yes",
        type: "textarea",
        label: "ما الذي جعلكِ تقولين نعم للعمل معي؟ وهل كان هناك ما كاد يمنعكِ؟",
        en: "Why she said yes, and what almost stopped her",
        required: true,
      },
      {
        id: "anything",
        type: "textarea",
        label: "هل هناك شيء آخر يجب أن أعرفه لأساعدكِ جيدًا؟",
        en: "Anything else",
      },
    ],
  },
];

/** Titles for questions asked together on one screen. */
export const groups: Record<string, { title: string; hint?: string }> = {
  call: { title: "متى تناسبكِ جلستنا الأسبوعية؟" },
  links: { title: "أين يجدكِ الناس؟", hint: "ألصقي رابط كل حساب عندكِ، واتركي الباقي فارغًا." },
  prog_numbers: { title: "ماذا حدث بعد الإعلان؟", hint: "تقريبًا يكفي. اختاري «لا أعرف» إن لم تكوني متأكدة." },
  tools_a: { title: "أدواتكِ: الأجهزة وصناعة المحتوى", hint: "اختاري كل ما تستعملينه، ولو قليلًا." },
  tools_b: { title: "أدواتكِ: التواصل والجلسات", hint: "اختاري كل ما تستعملينه، ولو قليلًا." },
  tools_c: { title: "أدواتكِ: البيع واستلام المال", hint: "اختاري كل ما تستعملينه، ولو قليلًا." },
  tools_d: { title: "أدواتكِ: التنظيم والذكاء الاصطناعي", hint: "اختاري كل ما تستعملينه، ولو قليلًا." },
  tools_e: { title: "أدواتكِ: ما بقي" },
};

export interface Step {
  screen: Screen;
  group?: string;
  fields: Field[];
}

/** One question per step, except grouped fields, which share a step. */
export const steps: Step[] = screens.flatMap((screen) => {
  const out: Step[] = [];
  for (const f of screen.fields) {
    const last = out[out.length - 1];
    if (f.group && last && last.group === f.group) last.fields.push(f);
    else out.push({ screen, group: f.group, fields: [f] });
  }
  return out;
});

export const allFields: Field[] = screens.flatMap((s) => s.fields);

/** Rough seconds to answer each kind of question; used for the "time left" estimate. */
const secondsPerType: Record<FieldType, number> = { text: 15, url: 12, choice: 8, multi: 12, textarea: 45 };

/** Estimated seconds for each step, in order. */
// Optional questions count half: many get skipped.
export const stepSeconds: number[] = steps.map((s) =>
  s.fields.reduce((sum, f) => sum + secondsPerType[f.type] * (f.required ? 1 : 0.5), 0),
);

/** "نحو 7 دقائق", with correct Arabic number agreement. */
export function minutesLabel(seconds: number): string {
  const m = Math.max(1, Math.round(seconds / 60));
  if (m === 1) return "دقيقة واحدة";
  if (m === 2) return "دقيقتان";
  if (m <= 10) return `${m} دقائق`;
  return `${m} دقيقة`;
}
