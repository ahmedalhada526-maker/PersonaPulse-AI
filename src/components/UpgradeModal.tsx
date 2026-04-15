import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ShieldCheck, Zap, EyeOff, Crown, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpgradeModal({ isOpen, onClose, onSuccess }: UpgradeModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] glass-panel border-primary/30 p-0 overflow-hidden">
        <div className="bg-primary/10 p-8 text-center relative">
          <div className="absolute top-4 right-4">
            <Crown className="w-8 h-8 text-primary opacity-20" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold tracking-tighter mb-2">
              Upgrade to <span className="text-primary italic font-serif">Pro</span>
            </DialogTitle>
            <DialogDescription className="text-secondary-foreground">
              Unlock the full forensic power of PersonaPulse AI.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-8 space-y-6">
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 rtl:space-x-reverse">
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Unlimited Forensic Scans</p>
                <p className="text-xs opacity-50">No more daily limits or interruptions.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3 rtl:space-x-reverse">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Advanced Psychological Insights</p>
                <p className="text-xs opacity-50">Deep-level analysis of manipulation and vulnerabilities.</p>
              </div>
            </li>
            <li className="flex items-start space-x-3 rtl:space-x-reverse">
              <EyeOff className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium">Ad-Free Experience</p>
                <p className="text-xs opacity-50">Clean, focused workspace for professional work.</p>
              </div>
            </li>
          </ul>

          <div className="bg-white/5 rounded-xl p-4 border border-white/5 text-center">
            <span className="text-3xl font-bold">$4.99</span>
            <span className="text-xs opacity-50 ml-2">one-time payment</span>
          </div>

          <div className="space-y-4">
            <PayPalScriptProvider options={{ "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test" }}>
              <PayPalButtons
                style={{ layout: "vertical", shape: "pill", label: "pay" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "4.99",
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    const details = await actions.order.capture();
                    if (details.status === "COMPLETED") {
                      onSuccess();
                    }
                  }
                }}
              />
            </PayPalScriptProvider>
            
            <p className="text-[10px] text-center opacity-30">
              Secure payment processed via PayPal. One-time fee, lifetime access.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
