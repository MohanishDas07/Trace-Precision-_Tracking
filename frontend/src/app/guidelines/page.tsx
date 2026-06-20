import React from 'react';
import { FadeIn } from '@/components/ui/FadeIn';

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 lg:px-24 flex flex-col items-center">
      <div className="max-w-3xl w-full">
        <FadeIn>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">Official Guidelines</h1>
          <p className="text-gray-400 mb-12 text-sm uppercase tracking-wider">Trace Scientific Standards</p>
        </FadeIn>

        <FadeIn delayMs={200}>
          <div className="space-y-12 text-gray-300 leading-relaxed font-sans text-lg md:text-xl">
            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">1. Data Integrity & Sourcing</h2>
              <p>
                All environmental metrics, conversion factors, and impact estimates presented on Trace are sourced strictly from peer-reviewed scientific literature and official governmental or international bodies. Primary sources include the Intergovernmental Panel on Climate Change (IPCC), the Environmental Protection Agency (EPA), and the International Energy Agency (IEA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">2. Action Recommendation Methodology</h2>
              <p>
                The actions recommended to users are dynamically calculated based on their highest-emitting categories. We prioritize recommendations by a weighting algorithm that balances maximum carbon (CO₂e) reduction potential against the estimated lifestyle difficulty of implementation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">3. Transparency Standard</h2>
              <p>
                Whenever an action is presented, we mandate that the underlying source and the exact metric defining its impact are visible to the user. We believe that actionable climate change mitigation begins with absolute transparency.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-6">4. Community Engagement</h2>
              <p>
                While users are encouraged to share their milestones and progress, aggressive rhetoric or the spread of scientifically unfounded climate misinformation is strictly prohibited on community boards and will result in immediate account suspension.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
