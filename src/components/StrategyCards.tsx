import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Zap, Copy, Check } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { AnalysisResult } from "@/src/services/geminiService";

interface StrategyCardsProps {
  strategies: AnalysisResult["strategies"];
}

export function StrategyCards({ strategies }: StrategyCardsProps) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const StrategyCard = ({ 
    title, 
    icon: Icon, 
    data, 
    accentColor 
  }: { 
    title: string; 
    icon: any; 
    data: { response: string; whyItWorks: string };
    accentColor: string;
  }) => (
    <div className="space-y-6 mt-6">
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden group premium-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center border" style={{ backgroundColor: `${accentColor}10`, borderColor: `${accentColor}30` }}>
              <Icon className="w-5 h-5" style={{ color: accentColor }} />
            </div>
            <h4 className="text-xl font-bold tracking-tight">{title}</h4>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => copyToClipboard(data.response, title)}
            className="rounded-full hover:bg-white/5"
          >
            {copied === title ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-50" />}
          </Button>
        </div>
        
        <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 mb-6 group-hover:bg-white/[0.05] transition-colors">
          <p className="text-lg leading-relaxed opacity-90">
            {data.response}
          </p>
        </div>
        
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
          <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center shrink-0 border border-yellow-500/20">
            <Zap className="w-4 h-4 text-yellow-500" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 block mb-1">{t('why_it_works')}</span>
            <p className="text-sm opacity-70 leading-relaxed">
              {data.whyItWorks}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-16"
    >
      <div className="text-center mb-8">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30">
          {t('strategy_architecture')}
        </span>
      </div>
      
      <Tabs defaultValue="tactician" className="w-full">
        <TabsList className="flex w-full max-w-md mx-auto glass-panel p-1 rounded-2xl mb-8">
          <TabsTrigger value="tactician" className="flex-1 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:glow-primary transition-all">
            <Shield className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="hidden sm:inline">{t('tactician')}</span>
          </TabsTrigger>
          <TabsTrigger value="empath" className="flex-1 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:glow-accent transition-all">
            <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="hidden sm:inline">{t('empath')}</span>
          </TabsTrigger>
          <TabsTrigger value="alpha" className="flex-1 rounded-xl data-[state=active]:bg-white data-[state=active]:text-black transition-all">
            <Zap className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="hidden sm:inline">{t('alpha')}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tactician">
          <StrategyCard 
            title={t('tactician')} 
            icon={Shield} 
            data={strategies.tactician} 
            accentColor="#3b82f6"
          />
        </TabsContent>
        <TabsContent value="empath">
          <StrategyCard 
            title={t('empath')} 
            icon={Heart} 
            data={strategies.empath} 
            accentColor="#8B5CF6"
          />
        </TabsContent>
        <TabsContent value="alpha">
          <StrategyCard 
            title={t('alpha')} 
            icon={Zap} 
            data={strategies.alpha} 
            accentColor="#ffffff"
          />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
