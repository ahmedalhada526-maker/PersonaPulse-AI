import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "app_name": "PersonaPulse",
      "app_version": "v1.0.4 Forensics",
      "tagline": "The Unfair Advantage",
      "description": "Analyze linguistic patterns, decode hidden subtext, and architect responses that bypass resistance. Behavioral psychology, weaponized.",
      "input_label": "Input Interaction",
      "input_placeholder": "Paste the message or conversation snippet here...",
      "run_analysis": "Run Analysis",
      "analyzing": "Analyzing Pulse...",
      "recent_scans": "Recent Scans",
      "no_history": "No scan history",
      "system_config": "System Config",
      "forensic_mode": "Forensic Mode Active",
      "model_info": "Gemini 3.0 Flash",
      "pulse_analysis": "Pulse Analysis",
      "recipient_persona": "Recipient Persona",
      "current_dynamic": "Current Dynamic",
      "hidden_needs": "Hidden Needs",
      "strategy_architecture": "Strategic Response Architecture",
      "tactician": "The Tactician",
      "empath": "The Empath",
      "alpha": "The Alpha",
      "why_it_works": "Why it works",
      "copy_success": "Copied!",
      "mbti": "MBTI",
      "big_five": "BIG 5",
      "enneagram": "ENNEAGRAM",
      "daily_scans_left": "{{count}} daily scans left",
      "new_analysis": "New Analysis",
      "history": "History",
      "upgrade_pro": "Upgrade to Pro",
      "analysis_report": "Analysis Report",
      "case_id": "Case ID",
      "pro_analysis": "Pro Analysis",
      "unlock_pro_insights": "Unlock Pro Insights",
      "pro_only": "Pro Only",
      "upgrade_message": "Upgrade to Pro to unlock deep-level psychological analysis.",
      "hero_title_1": "Master the",
      "hero_title_span": "Subtext",
      "hero_title_2": "of Human Interaction",
      "hero_description": "Upload any conversation to decode hidden intentions, personality traits, and strategic responses."
    }
  },
  ar: {
    translation: {
      "app_name": "نبض الشخصية",
      "app_version": "v1.0.4 التحليل الجنائي",
      "tagline": "الميزة غير العادلة",
      "description": "حلل الأنماط اللغوية، وفك شفرات النصوص الخفية، وصمم ردوداً تتجاوز المقاومة. علم النفس السلوكي، كسلاح.",
      "input_label": "مدخلات التفاعل",
      "input_placeholder": "ألحق الرسالة أو جزءاً من المحادثة هنا...",
      "run_analysis": "بدء التحليل",
      "analyzing": "تحليل النبض...",
      "recent_scans": "عمليات المسح الأخيرة",
      "no_history": "لا يوجد سجل مسح",
      "system_config": "إعدادات النظام",
      "forensic_mode": "وضع التحليل الجنائي نشط",
      "model_info": "جمناي 3.0 فلاش",
      "pulse_analysis": "تحليل النبض",
      "recipient_persona": "شخصية المتلقي",
      "current_dynamic": "الديناميكية الحالية",
      "hidden_needs": "الاحتياجات الخفية",
      "strategy_architecture": "بنية الاستجابة الاستراتيجية",
      "tactician": "المخطط",
      "empath": "المتعاطف",
      "alpha": "المسيطر",
      "why_it_works": "لماذا ينجح هذا",
      "copy_success": "تم النسخ!",
      "mbti": "نمط الشخصية",
      "big_five": "الخمسة الكبار",
      "enneagram": "إنياغرام",
      "daily_scans_left": "متبقي {{count}} عمليات مسح يومية",
      "new_analysis": "تحليل جديد",
      "history": "السجل",
      "upgrade_pro": "الترقية إلى برو",
      "analysis_report": "تقرير التحليل",
      "case_id": "رقم الحالة",
      "pro_analysis": "تحليل احترافي",
      "unlock_pro_insights": "فتح التحليلات الاحترافية",
      "pro_only": "للمشتركين فقط",
      "upgrade_message": "قم بالترقية إلى برو لفتح التحليل النفسي العميق.",
      "hero_title_1": "أتقن",
      "hero_title_span": "النصوص الخفية",
      "hero_title_2": "للتفاعل البشري",
      "hero_description": "ارفع أي محادثة لفك شفرة النوايا الخفية، سمات الشخصية، والاستجابات الاستراتيجية."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
