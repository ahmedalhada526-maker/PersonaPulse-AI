import { useEffect, useRef } from "react";

interface AdsterraAdProps {
  className?: string;
}

export function AdsterraAd({ className = "" }: AdsterraAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // NOTE: Replace the values below with your actual Adsterra script details.
    // Adsterra scripts usually look like this:
    
    /*
    atOptions = {
      'key' : 'your_ad_key',
      'format' : 'iframe',
      'height' : 250,
      'width' : 300,
      'params' : {}
    };
    */

    if (adRef.current && !adRef.current.firstChild) {
      const container = adRef.current;
      
      // This is a common pattern for Adsterra Banner Ads
      const script = document.createElement("script");
      script.type = "text/javascript";
      // script.src = "//www.topcreativeformat.com/your_ad_key/invoke.js"; // Uncomment and replace with your URL
      
      // If your code uses document.write, you might need to use an iframe approach:
      // const iframe = document.createElement('iframe');
      // ...
      
      container.appendChild(script);
    }
  }, []);

  return (
    <div className={`ad-container border border-white/5 rounded-lg bg-black/10 flex items-center justify-center overflow-hidden relative group ${className}`}>
      <div className="absolute top-0 right-0 p-1 z-10">
        <span className="text-[8px] font-mono uppercase opacity-30">Adsterra</span>
      </div>
      <div ref={adRef} id="adsterra-wrapper" className="w-full h-full flex items-center justify-center">
        <div className="text-center space-y-1 opacity-20 group-hover:opacity-40 transition-opacity">
          <p className="text-[10px] font-mono uppercase tracking-widest">Ad Space</p>
          <p className="text-[8px] italic">Paste your script in AdsterraAd.tsx</p>
        </div>
      </div>
    </div>
  );
}
