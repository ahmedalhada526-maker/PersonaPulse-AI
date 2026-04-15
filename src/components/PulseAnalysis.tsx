import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Target, Eye, Fingerprint, Lock, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { AnalysisResult } from "@/src/services/geminiService";

interface PulseAnalysisProps {
  data: AnalysisResult["pulse"];
  isPremium: boolean;
  onUpgradeClick: () => void;
}

export function PulseAnalysis({ data, isPremium, onUpgradeClick }: PulseAnalysisProps) {
  const { t } = useTranslation();

  return (
    <div className="bento-grid">
      {/* Recipient Persona - Large Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="md:col-span-2"
      >
        <div className="glass-panel p-8 rounded-3xl h-full relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
            <Fingerprint className="w-24 h-24" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Fingerprint className="w-5 h-5 text-primary" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                {t('recipient_persona')}
              </span>
            </div>
            <p className="text-2xl md:text-3xl font-bold leading-tight mb-8">
              {data.recipientPersona}
            </p>
            <div className="flex flex-wrap gap-3">
              {data.personalityTraits.mbti && (
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl text-xs font-mono">
                  {t('mbti')}: {data.personalityTraits.mbti}
                </Badge>
              )}
              {data.personalityTraits.bigFive && (
                <Badge className="bg-accent/10 text-accent border-accent/20 px-4 py-1.5 rounded-xl text-xs font-mono">
                  {t('big_five')}: {data.personalityTraits.bigFive}
                </Badge>
              )}
              {data.personalityTraits.enneagram && (
                <Badge className="bg-white/5 text-white/70 border-white/10 px-4 py-1.5 rounded-xl text-xs font-mono">
                  {t('enneagram')}: {data.personalityTraits.enneagram}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Dynamic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="glass-panel p-6 rounded-3xl h-full border-accent/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20">
              <Target className="w-4 h-4 text-accent" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              {t('current_dynamic')}
            </span>
          </div>
          <p className="text-sm leading-relaxed opacity-80">
            {data.currentDynamic}
          </p>
        </div>
      </motion.div>

      {/* Hidden Needs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="glass-panel p-6 rounded-3xl h-full border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
              {t('hidden_needs')}
            </span>
          </div>
          <p className="text-sm italic opacity-80 border-l-2 border-white/10 pl-4 rtl:pl-0 rtl:pr-4">
            "{data.hiddenNeeds}"
          </p>
        </div>
      </motion.div>

      {/* Advanced Insights - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="md:col-span-2"
      >
        <div className="glass-panel p-8 rounded-3xl border-primary/20 relative overflow-hidden premium-shadow">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                {t('pulse_analysis')}
              </span>
            </div>
            {!isPremium && <Badge className="bg-primary/20 text-primary text-[9px] uppercase px-2 py-0.5 rounded-full border-primary/30">{t('pro_only')}</Badge>}
          </div>
          
          <div className="relative">
            <div className={!isPremium ? "blur-xl select-none pointer-events-none opacity-20" : ""}>
              <p className="text-sm leading-relaxed opacity-80">
                {data.advancedInsights || "No advanced insights available for this interaction."}
              </p>
            </div>
            
            {!isPremium && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <p className="text-sm font-bold mb-4 max-w-xs">{t('upgrade_message')}</p>
                <Button 
                  onClick={onUpgradeClick}
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 glow-primary"
                >
                  {t('unlock_pro_insights')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
