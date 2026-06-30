"use client";

import { useState } from "react";
import { Upload, Heart, Check } from "lucide-react";
import type { Product } from "@/types";

interface PersonalizationFormProps {
  product: Product;
}

export function PersonalizationForm({ product }: PersonalizationFormProps) {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("dog");
  const [memorialDate, setMemorialDate] = useState("");
  const [message, setMessage] = useState("");
  const [font, setFont] = useState("serif");
  const [color, setColor] = useState("natural");
  const [giftBox, setGiftBox] = useState(false);
  const [nfcPage, setNfcPage] = useState(product.hasNfc);

  if (!product.customizable) return null;

  return (
    <div className="border border-border rounded-2xl p-6 bg-bg space-y-5">
      <h3 className="font-serif text-xl text-text">Personalize Your Keepsake</h3>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Pet Name *</label>
        <input
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Enter your pet's name"
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Pet Type</label>
        <select
          value={petType}
          onChange={(e) => setPetType(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
        >
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="rabbit">Rabbit</option>
          <option value="other">Other Companion</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Memorial Date</label>
        <input
          type="date"
          value={memorialDate}
          onChange={(e) => setMemorialDate(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Short Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A loving message or quote (optional)"
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-text mb-1.5">Upload Pet Photo</label>
        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-gold transition-colors cursor-pointer bg-card">
          <Upload className="w-8 h-8 text-light mx-auto mb-2" />
          <p className="text-sm text-muted">Click to upload or drag and drop</p>
          <p className="text-xs text-light mt-1">JPG, PNG up to 10MB</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Font</label>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="serif">Elegant Serif</option>
            <option value="sans">Clean Sans</option>
            <option value="script">Script</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text mb-1.5">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="natural">Natural Wood</option>
            <option value="white">Soft White</option>
            <option value="walnut">Warm Walnut</option>
            <option value="gold">Muted Gold</option>
          </select>
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={giftBox}
          onChange={(e) => setGiftBox(e.target.checked)}
          className="w-4 h-4 rounded border-border text-gold focus:ring-gold"
        />
        <span className="text-sm text-muted">Add premium gift box (+$9.99)</span>
      </label>

      {(product.hasNfc || product.collection === "nfc-memorial-cards") && (
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={nfcPage}
            onChange={(e) => setNfcPage(e.target.checked)}
            className="w-4 h-4 rounded border-border text-gold focus:ring-gold"
          />
          <span className="text-sm text-muted">Include NFC digital memorial page</span>
        </label>
      )}

      <div className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
        <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted">
          We will send a design proof for confirmation before production.
        </p>
      </div>
    </div>
  );
}

export function WishlistButton() {
  return (
    <button className="flex items-center justify-center gap-2 w-full py-3 border-2 border-border rounded-full text-muted hover:border-gold hover:text-gold transition-colors">
      <Heart className="w-5 h-5" />
      Add to Wishlist
    </button>
  );
}
