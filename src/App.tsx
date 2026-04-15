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
  AlertCircle
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

const FREE_LIMIT = 2;

export default function App() {
  const { t, i18n } = useTranslation();
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<{ text: string; result: AnalysisResult }[]>([]);
  
  // Freemium State
  const [isPremium, setIsPremium] = useState(() => localStorage.getItem("isPremium") === "true");
  const [usageCount, setUsageCount] = useState(() => parseInt(localStorage.getItem("usageCount") || "0"));
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    document.dir = i18n.dir();
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    localStorage.setItem("isPremium", isPremium.toString());
    localStorage.setItem("usageCount", usageCount.toString());
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

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col md:flex-row tech-grid" dir={i18n.dir()}>
        {/* Sidebar */}
        <aside className="w-full md:w-72 border-r rtl:border-r-0 rtl:border-l border-white/5 bg-black/40 backdrop-blur-xl flex flex-col">
          <div className="p-6 flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30 relative">
              <Brain className="w-6 h-6 text-primary" />
              {isPremium && (
                <div className="absolute -top-1 -right-1">
                  <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <h1 className="font-bold tracking-tight text-lg leading-none">{t('app_name')}</h1>
                {isPremium && <Badge className="bg-yellow-500/20 text-yellow-500 text-[8px] uppercase px-1 h-4">Pro</Badge>}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-50">{t('app_version')}</span>
            </div>
          </div>

          <Separator className="bg-white/5" />

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-50 flex items-center">
                <History className="w-3 h-3 mr-2 rtl:ml-2 rtl:mr-0" /> {t('recent_scans')}
              </span>
            </div>
            <ScrollArea className="flex-1 px-4">
              <div className="space-y-2 pb-6">
                {history.length === 0 ? (
                  <div className="py-8 text-center opacity-20">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-xs">{t('no_history')}</p>
                  </div>
                ) : (
                  history.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(item.text);
                        setResult(item.result);
                      }}
                      className="w-full text-left rtl:text-right p-3 rounded-lg hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5"
                    >
                      <p className="text-xs line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.text}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[9px] font-mono opacity-30 uppercase">
                          {item.result.pulse.personalityTraits.mbti || "Unknown"}
                        </span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-all transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {!isPremium && (
            <div className="p-4">
              <AdsterraAd className="h-32" />
            </div>
          )}

          <Separator className="bg-white/5" />
          
          <div className="p-4 space-y-2">
            {!isPremium && (
              <Button 
                variant="outline" 
                className="w-full justify-start text-xs border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => setShowUpgradeModal(true)}
              >
                <Crown className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> Upgrade to Pro
              </Button>
            )}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-xs opacity-70 hover:opacity-100"
              onClick={toggleLanguage}
            >
              <Languages className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> 
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </Button>
            <Button variant="ghost" className="w-full justify-start text-xs opacity-50 hover:opacity-100">
              <Settings className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> {t('system_config')}
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="max-w-4xl mx-auto p-6 md:p-12">
              <header className="mb-12 text-center md:text-left rtl:md:text-right">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
                    {t('tagline').split(' ')[0]} {t('tagline').split(' ')[1]} <span className="text-primary italic font-serif">{t('tagline').split(' ')[2]}</span>
                  </h2>
                  <p className="text-secondary-foreground max-w-xl leading-relaxed">
                    {t('description')}
                  </p>
                </motion.div>
              </header>

              <div className="space-y-8">
                {/* Input Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <div className="absolute -top-3 left-6 rtl:left-auto rtl:right-6 z-10">
                    <span className="bg-background px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
                      {t('input_label')}
                    </span>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl border-primary/20 shadow-2xl shadow-primary/5">
                    <Textarea
                      placeholder={t('input_placeholder')}
                      className="min-h-[160px] bg-transparent border-none focus-visible:ring-0 text-lg resize-none p-0 placeholder:opacity-30"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse text-[10px] font-mono opacity-40">
                        <span className="flex items-center"><ShieldAlert className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('forensic_mode')}</span>
                        <span className="flex items-center"><Sparkles className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" /> {t('model_info')}</span>
                      </div>
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        {!isPremium && (
                          <div className="hidden sm:flex items-center text-[10px] font-mono opacity-50">
                            <AlertCircle className="w-3 h-3 mr-1 rtl:ml-1 rtl:mr-0" />
                            {FREE_LIMIT - usageCount} scans left
                          </div>
                        )}
                        <Button 
                          onClick={handleAnalyze} 
                          disabled={!input.trim() || isAnalyzing}
                          className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                        >
                          {isAnalyzing ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0 animate-spin" />
                              {t('analyzing')}
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                              {t('run_analysis')}
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                  {result && (
                    <motion.div
                      key={JSON.stringify(result)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-12 py-12"
                    >
                      <PulseAnalysis 
                        data={result.pulse} 
                        isPremium={isPremium} 
                        onUpgradeClick={() => setShowUpgradeModal(true)} 
                      />
                      
                      {!isPremium && <AdsterraAd className="h-40" />}
                      
                      <StrategyCards strategies={result.strategies} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </ScrollArea>
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
