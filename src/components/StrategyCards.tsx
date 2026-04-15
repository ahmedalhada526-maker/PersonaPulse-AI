import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <div className="space-y-6 mt-4">
      <Card className="glass-panel border-l-4 rtl:border-l-0 rtl:border-r-4" style={{ [document.dir === 'rtl' ? 'borderRightColor' : 'borderLeftColor']: accentColor }}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Icon className="w-5 h-5" style={{ color: accentColor }} />
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          </div>
          <button
            onClick={() => copyToClipboard(data.response, title)}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {copied === title ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 opacity-50" />}
          </button>
        </CardHeader>
        <CardContent>
          <div className="bg-black/30 p-4 rounded-lg border border-white/5 mb-4">
            <p className="text-foreground leading-relaxed">
              {data.response}
            </p>
          </div>
          <div className="flex items-start space-x-3 rtl:space-x-reverse opacity-70">
            <Zap className="w-4 h-4 mt-1 flex-shrink-0 text-yellow-500" />
            <p className="text-xs italic">
              <span className="font-bold uppercase text-[10px] tracking-tighter mr-2 rtl:ml-2 rtl:mr-0">{t('why_it_works')}:</span>
              {data.whyItWorks}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <h3 className="text-sm font-mono uppercase tracking-[0.3em] mb-6 opacity-50 text-center">
        {t('strategy_architecture')}
      </h3>
      
      <Tabs defaultValue="tactician" className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-panel p-1">
          <TabsTrigger value="tactician" className="data-[state=active]:bg-primary/20">
            <Shield className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="hidden sm:inline">{t('tactician')}</span>
          </TabsTrigger>
          <TabsTrigger value="empath" className="data-[state=active]:bg-accent/20">
            <Heart className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            <span className="hidden sm:inline">{t('empath')}</span>
          </TabsTrigger>
          <TabsTrigger value="alpha" className="data-[state=active]:bg-white/10">
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
            accentColor="#f97316"
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
