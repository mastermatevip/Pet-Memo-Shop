import { Smartphone, QrCode, ImageIcon, Video, BookOpen, MessageSquare } from "lucide-react";

export function NFCExplanation() {
  const steps = [
    { icon: <Smartphone className="w-6 h-6" />, title: "NFC Chip Inside", desc: "The card contains a small NFC chip embedded during production." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Tap with Smartphone", desc: "Hold your phone near the card to open the memorial page instantly." },
    { icon: <QrCode className="w-6 h-6" />, title: "QR Code Backup", desc: "A printed QR code ensures access even without NFC capability." },
    { icon: <ImageIcon className="w-6 h-6" />, title: "Photos & Videos", desc: "The digital page can include a full photo gallery and video links." },
    { icon: <BookOpen className="w-6 h-6" />, title: "Story & Messages", desc: "Share their story, dates, and loving messages from family." },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Optional Guestbook", desc: "Friends and family can leave messages on the memorial page." },
  ];

  return (
    <section className="py-12 md:py-16 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl md:text-3xl text-text text-center mb-8">
          How the NFC Memorial Card Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.title} className="text-center p-5 rounded-xl bg-bg">
              <div className="w-12 h-12 rounded-full bg-highlight text-gold flex items-center justify-center mx-auto mb-3">
                {step.icon}
              </div>
              <h3 className="font-medium text-text mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
