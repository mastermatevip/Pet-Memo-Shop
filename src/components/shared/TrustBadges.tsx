import { Shield, Globe, Heart, Eye, Package, MessageCircle } from "lucide-react";
import { TRUST_BADGES } from "@/config/brand";

const iconMap: Record<string, React.ReactNode> = {
  shield: <Shield className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  heart: <Heart className="w-6 h-6" />,
  eye: <Eye className="w-6 h-6" />,
  package: <Package className="w-6 h-6" />,
  message: <MessageCircle className="w-6 h-6" />,
};

export function TrustBadges() {
  return (
    <section className="py-12 md:py-16 bg-highlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {TRUST_BADGES.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-gold shadow-sm">
                {iconMap[badge.icon]}
              </div>
              <span className="text-sm text-muted font-medium">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
