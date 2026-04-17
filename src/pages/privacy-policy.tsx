import Layout from "@/components/layout/Layout";

const PrivacyPolicyPage = () => {
  return (
    <Layout title="Privacy Policy">
      <section className="py-24 bg-brand-pearl min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center space-y-4 mb-16">
              <p className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Legal Notice</p>
              <h1 className="text-5xl md:text-6xl font-serif font-black text-brand-charcoal">Privacy Policy</h1>
              <p className="text-brand-stone font-light">Last Updated: April 17, 2026</p>
            </div>

            <div className="prose prose-lg prose-brand max-w-none space-y-8 text-brand-stone font-light leading-relaxed">
              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">1. Introduction</h2>
                <p>Welcome to Banaya Lifestyle. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">2. Data We Collect</h2>
                <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                  <li><strong>Financial Data</strong> includes bank account and payment card details.</li>
                  <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products you have purchased from us.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">3. How We Use Your Data</h2>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                  <li>Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests.</li>
                  <li>Where we need to comply with a legal obligation.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">4. Data Security</h2>
                <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-serif font-bold text-brand-charcoal">5. Contact Us</h2>
                <p>If you have any questions about this privacy policy or our privacy practices, please contact our data privacy manager at: <span className="text-brand-gold font-bold">privacy@banaya.com</span></p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
