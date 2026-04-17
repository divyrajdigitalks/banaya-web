import Layout from "@/components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout title="Terms & Conditions">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4 mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Legal Notice</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">Terms of Service</h1>
              <p className="text-brand-stone font-light">Last Updated: April 17, 2026</p>
            </div>

            <div className="prose prose-lg prose-brand max-w-none space-y-8 text-brand-stone font-light leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">1. Agreement to Terms</h2>
                <p>By accessing or using the Banaya Lifestyle website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">2. Intellectual Property</h2>
                <p>The Site and its original content, features, and functionality are owned by Banaya Lifestyle and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">3. User Accounts</h2>
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">4. Limitation of Liability</h2>
                <p>In no event shall Banaya Lifestyle, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">5. Governing Law</h2>
                <p>These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
