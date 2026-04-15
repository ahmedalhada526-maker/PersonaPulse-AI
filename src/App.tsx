import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Brain, 
  Send, 
  History, 
  Settings, 
  ShieldAlert, 
  Loader2,
  Sparkles,
  MessageSquare,
  ChevronRight,
  Languages,
  Crown,
  AlertCircle,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Paperclip
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { analyzeInteraction, type AnalysisResult } from "@/src/services/geminiService";
import { PulseAnalysis } from "@/src/components/PulseAnalysis";
import { StrategyCards } from "@/src/components/StrategyCards";
import { UpgradeModal } from "@/src/components/UpgradeModal";
import { AdsterraAd } from "@/src/components/AdsterraAd";

const FREE_LIMIT = 10;

export default function App() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<{ text: string; result: AnalysisResult }[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  
  // Freemium State
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem("isPremium") === "true");
  const [usageCount, setUsageCount] = useState(() => {
    const lastDate = localStorage.getItem("lastUsageDate");
    const today = new Date().toDateString();
    if (lastDate !== today) {
      return 0;
    }
    return parseInt(localStorage.getItem("usageCount") || "0");
  });
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    localStorage.setItem("isPremium", isPremium.toString());
    localStorage.setItem("usageCount", usageCount.toString());
    localStorage.setItem("lastUsageDate", new Date().toDateString());
  }, [isPremium, usageCount]);

  const handleAnalyze = async () => {
    if (!input.trim() || isAnalyzing) return;

    if (!isPremium && usageCount >= FREE_LIMIT) {
      setShowUpgradeModal(true);
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await analyzeInteraction(input, i18n.language);
      setResult(analysis);
      setHistory(prev => [{ text: input, result: analysis }, ...prev].slice(0, 10));
      setUsageCount(prev => prev + 1);
      setInput(""); // Clear input after analysis
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUpgradeSuccess = () => {
    setIsPremium(true);
    setShowUpgradeModal(false);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setInput(prev => prev + (prev ? "\n\n" : "") + content);
      }
      setIsUploading(false);
    };
    reader.onerror = () => {
      console.error("File reading failed");
      setIsUploading(false);
    };
    reader.readAsText(file);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex bg-background text-foreground overflow-hidden" dir={i18n.dir()}>
        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 0, opacity: sidebarOpen ? 1 : 0 }}
          className="h-screen border-r border-white/5 bg-black/20 backdrop-blur-2xl flex flex-col overflow-hidden relative z-50"
        >
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h1 className="font-bold tracking-tight text-sm">{t('app_name')}</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="h-8 w-8 opacity-50">
              <PanelLeftClose className="w-4 h-4" />
            </Button>
          </div>

          <div className="px-4 mb-4">
            <Button 
              onClick={() => { setResult(null); setInput(""); }}
              className="w-full justify-start bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium rounded-xl h-10"
            >
              <Plus className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> {t('new_analysis')}
            </Button>
          </div>

          <ScrollArea className="flex-1 px-4">
            <div className="space-y-1 pb-6">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 mb-4 px-2">{t('history')}</p>
              {history.length === 0 ? (
                <div className="py-12 text-center opacity-20">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-[10px]">{t('no_history')}</p>
                </div>
              ) : (
                history.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(item.text);
                      setResult(item.result);
                    }}
                    className="w-full text-left rtl:text-right p-3 rounded-xl hover:bg-white/5 transition-all group border border-transparent hover:border-white/5 mb-1"
                  >
                    <p className="text-xs line-clamp-1 opacity-60 group-hover:opacity-100 transition-opacity">
                      {item.text}
                    </p>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>

          {!isPremium && (
            <div className="p-4">
              <AdsterraAd className="h-24 rounded-xl opacity-50 grayscale hover:grayscale-0 transition-all" />
            </div>
          )}

          <div className="p-4 mt-auto space-y-2">
            {!isPremium && (
              <Button 
                variant="outline" 
                className="w-full justify-start text-[10px] border-primary/20 text-primary hover:bg-primary/10 rounded-xl glow-primary"
                onClick={() => setShowUpgradeModal(true)}
              >
                <Crown className="w-3 h-3 mr-2 rtl:ml-2 rtl:mr-0" /> {t('upgrade_pro')}
              </Button>
            )}
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="flex-1 text-[10px] opacity-50 hover:opacity-100 rounded-xl bg-white/5"
                onClick={toggleLanguage}
              >
                <Languages className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="flex-1 text-[10px] opacity-50 hover:opacity-100 rounded-xl bg-white/5">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {!sidebarOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(true)} 
              className="absolute top-6 left-6 z-50 h-10 w-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl"
            >
              <PanelLeftOpen className="w-5 h-5" />
            </Button>
          )}

          <ScrollArea className="flex-1">
            <div className="max-w-5xl mx-auto p-6 md:p-12 pb-40">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="hero"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 glow-primary mb-4">
                      <Brain className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter max-w-3xl">
                      {t('hero_title_1')} <span className="text-primary italic">{t('hero_title_span')}</span> {t('hero_title_2')}
                    </h2>
                    <p className="text-secondary-foreground max-w-xl text-lg opacity-70">
                      {t('hero_description')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-12"
                  >
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-2xl font-bold tracking-tight">{t('analysis_report')}</h3>
                        <p className="text-sm opacity-50 font-mono uppercase tracking-widest">{t('case_id')}: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                      </div>
                      {isPremium && <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 rounded-full">{t('pro_analysis')}</Badge>}
                    </div>

                    <PulseAnalysis 
                      data={result.pulse} 
                      isPremium={isPremium} 
                      onUpgradeClick={() => setShowUpgradeModal(true)} 
                    />
                    
                    {!isPremium && <AdsterraAd className="h-32 rounded-3xl" />}
                    
                    <StrategyCards strategies={result.strategies} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Floating Command Bar */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-40">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass-panel p-2 rounded-[2.5rem] shadow-2xl flex items-end gap-2 premium-shadow"
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".txt,.md,.csv,.json"
                onChange={handleFileUpload}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full opacity-50 hover:opacity-100 shrink-0"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Paperclip className="w-5 h-5" />}
              </Button>
              <Textarea
                placeholder={t('input_placeholder')}
                className="min-h-[48px] max-h-48 bg-transparent border-none focus-visible:ring-0 text-sm resize-none py-3 px-2 placeholder:opacity-40"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAnalyze();
                  }
                }}
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={!input.trim() || isAnalyzing}
                size="icon"
                className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white shrink-0 glow-primary transition-all active:scale-95"
              >
                {isAnalyzing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </motion.div>
            {!isPremium && (
              <p className="text-center mt-3 text-[10px] font-mono opacity-30 uppercase tracking-widest">
                {t('daily_scans_left', { count: FREE_LIMIT - usageCount })} • Free Tier
              </p>
            )}
          </div>
        </main>
      </div>

      <UpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
        onSuccess={handleUpgradeSuccess} 
      />
    </TooltipProvider>
  );
}
