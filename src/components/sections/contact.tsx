'use client';

import { useState } from 'react';
import { CompassIcon } from '@/components/icons/maritime-icons';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    brand: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '7fa03c7b-f000-4b91-94bc-4a450d41304d',
          name: formData.name,
          email: formData.email,
          brand: formData.brand,
          message: formData.message,
          subject: `Nouveau contact de ${formData.name} - ${formData.brand}`,
        })
      });

      const result = await response.json();

      if (result.success) {
        // 🎯 AJOUT : Envoyer l'événement à Google Tag Manager
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'form_submission',
            form_name: 'contact_form',
            form_brand: formData.brand,
          });
        }
        
        setStatus('sent');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ name: '', email: '', brand: '', message: '' });
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 bg-white">
      {/* Le reste du code reste identique */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
            <span className="text-[hsl(var(--ocean-primary))] font-semibold uppercase tracking-wider text-sm">
              Contact
            </span>
            <div className="h-px w-12 bg-[hsl(var(--ocean-primary))]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[hsl(var(--ocean-deep))] mb-6">
            Prêt à reprendre la barre de vos ventes Amazon en 2026?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discutons de vos objectifs et construisons ensemble votre stratégie de croissance sur Amazon
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-[hsl(var(--ocean-deep))] to-[hsl(var(--ocean-primary))] rounded-2xl p-8 text-white shadow-xl">
              <div className="mb-6">
                <CompassIcon className="w-16 h-16 text-[hsl(var(--gold))]" />
              </div>

              <h3 className="text-2xl font-bold mb-4">
                Florian Bonnand
              </h3>

              <p className="text-white/90 mb-6 leading-relaxed">
                Consultant Marketplace & E-commerce freelance, spécialiste Amazon
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[hsl(var(--gold))] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Email</p>
                    <a href="mailto:contact@florianbonnand.fr" className="text-white hover:text-[hsl(var(--gold))] transition-colors">
                      contact@florian-bonnand.eu
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-6 h-6 text-[hsl(var(--gold))] flex-shrink-0 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
                  <div>
                    <p className="text-sm text-white/70 mb-1">Téléphone</p>
                    <p className="text-white">06.34.87.70.67</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[hsl(var(--gold))] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm text-white/70 mb-1"></p>
                    <p className="text-white">Je vous réponds dans les 24h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[hsl(var(--cream))] rounded-xl p-6 border-l-4 border-[hsl(var(--gold))]">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="text-[hsl(var(--ocean-deep))]">Diagnostic gratuit :</strong> Je vous propose un premier échange de 30 minutes pour analyser votre situation actuelle sur Amazon et identifier vos axes d'amélioration prioritaires.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-[hsl(var(--sand))]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre nom *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[hsl(var(--ocean-primary))] focus:ring-2 focus:ring-[hsl(var(--ocean-primary))]/20 outline-none transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[hsl(var(--ocean-primary))] focus:ring-2 focus:ring-[hsl(var(--ocean-primary))]/20 outline-none transition-all"
                  placeholder="jean@marque.fr"
                />
              </div>

              <div>
                <label htmlFor="brand" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de votre marque *
                </label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[hsl(var(--ocean-primary))] focus:ring-2 focus:ring-[hsl(var(--ocean-primary))]/20 outline-none transition-all"
                  placeholder="Ma Marque"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[hsl(var(--ocean-primary))] focus:ring-2 focus:ring-[hsl(var(--ocean-primary))]/20 outline-none transition-all resize-none"
                  placeholder="Décrivez vos besoins et objectifs Amazon..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                  status === 'sent'
                    ? 'bg-green-600'
                    : status === 'error'
                    ? 'bg-red-600'
                    : 'bg-[hsl(var(--ocean-primary))] hover:bg-[hsl(var(--ocean-deep))] hover:scale-105 shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {status === 'idle' && 'Prendre contact'}
                {status === 'sending' && 'Envoi en cours...'}
                {status === 'sent' && 'Message envoyé !'}
                {status === 'error' && 'Erreur d\'envoi'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}