import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-panel h-full">
            <CardHeader className="flex flex-row items-center space-x-3 pb-2 rtl:space-x-reverse">
              <Fingerprint className="w-5 h-5 text-primary" />
              <CardTitle className="text-sm font-mono uppercase tracking-widest opacity-70">
                {t('recipient_persona')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium leading-relaxed">
                {data.recipientPersona}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {data.personalityTraits.mbti && (
                  <Badge variant="outline" className="font-mono text-[10px] uppercase border-primary/30 text-primary">
                    {t('mbti')}: {data.personalityTraits.mbti}
                  </Badge>
                )}
                {data.personalityTraits.bigFive && (
                  <Badge variant="outline" className="font-mono text-[10px] uppercase border-accent/30 text-accent">
                    {t('big_five')}: {data.personalityTraits.bigFive}
                  </Badge>
                )}
                {data.personalityTraits.enneagram && (
                  <Badge variant="outline" className="font-mono text-[10px] uppercase border-white/20">
                    {t('enneagram')}: {data.personalityTraits.enneagram}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2 rtl:space-x-reverse">
                <Target className="w-5 h-5 text-accent" />
                <CardTitle className="text-sm font-mono uppercase tracking-widest opacity-70">
                  {t('current_dynamic')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-foreground">
                  {data.currentDynamic}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-panel">
              <CardHeader className="flex flex-row items-center space-x-3 pb-2 rtl:space-x-reverse">
                <Eye className="w-5 h-5 text-white" />
                <CardTitle className="text-sm font-mono uppercase tracking-widest opacity-70">
                  {t('hidden_needs')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-secondary-foreground italic font-serif">
                  "{data.hiddenNeeds}"
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Advanced Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-panel border-primary/20 relative overflow-hidden">
          <CardHeader className="flex flex-row items-center space-x-3 pb-2 rtl:space-x-reverse">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <CardTitle className="text-sm font-mono uppercase tracking-widest opacity-70">
              Advanced Psychological Insights
            </CardTitle>
            {!isPremium && <Badge className="bg-primary/20 text-primary text-[9px] uppercase">Pro Only</Badge>}
          </CardHeader>
          <CardContent className="relative">
            <div className={!isPremium ? "blur-md select-none pointer-events-none" : ""}>
              <p className="text-sm leading-relaxed text-secondary-foreground">
                {data.advancedInsights || "No advanced insights available for this interaction."}
              </p>
            </div>
            
            {!isPremium && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/20 backdrop-blur-[2px]">
                <Lock className="w-8 h-8 text-primary mb-3" />
                <p className="text-sm font-medium mb-4">Upgrade to Pro to unlock deep-level psychological analysis.</p>
                <button 
                  onClick={onUpgradeClick}
                  className="px-6 py-2 bg-primary text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Unlock Pro Insights
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
