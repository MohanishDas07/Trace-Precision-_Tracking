import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Privacy Policy</h1>
          <p className="text-gray-400 mb-12 text-sm uppercase tracking-wider">Last Updated: June 20, 2026</p>
        </FadeIn>

        <FadeIn delayMs={200}>
          <div className="space-y-12 text-gray-300 leading-relaxed font-sans text-lg md:text-xl">
            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">1. Introduction</h2>
              <p>
                At Trace, we are committed to protecting your privacy. This policy outlines our practices regarding the collection, use, and disclosure of your information through your use of our platform. We build tools to help you understand your environmental impact, not to exploit your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">2. Data Collection</h2>
              <p>
                We only collect the data necessary to calculate your carbon footprint and provide personalized reduction recommendations. This includes generalized location data, energy consumption estimates, and lifestyle choices you voluntarily provide during the onboarding process.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">3. Data Security</h2>
              <p>
                Your data is encrypted at rest and in transit. We do not sell your personal information to third-party data brokers or advertising networks. The impact metrics you generate are yours to control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">4. Your Rights</h2>
              <p>
                You have the right to access, modify, or permanently delete your data at any time. If you wish to close your Trace account, all associated carbon tracking data will be irreversibly anonymized or destroyed.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
