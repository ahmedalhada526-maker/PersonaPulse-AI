import { useTranslation } from "react-i18next";

export function AdPlaceholder({ className = "" }: { className?: string }) {
  const { t } = useTranslation();
  
  return (
    <div className={`bg-muted/30 border border-white/5 rounded-lg flex flex-col items-center justify-center p-4 min-h-[100px] overflow-hidden relative group ${className}`}>
      <div className="absolute top-0 right-0 p-1">
        <span className="text-[8px] font-mono uppercase opacity-30">Ad</span>
      </div>
      <div className="text-center space-y-1">
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-20">Google AdSense</p>
        <p className="text-[9px] opacity-40 italic">Sponsored Content</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
}
