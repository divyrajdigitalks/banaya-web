import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Art of Sustainable Walnut: Why It's the Gold Standard",
    excerpt: "Discover the journey of our walnut wood from responsibly managed forests to your living room centerpiece.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=800",
    date: "April 10, 2026",
    author: "Elena Rossi",
    category: "Craftsmanship"
  },
  {
    id: 2,
    title: "Minimalist Interiors: How to Curate a Calm Sanctuary",
    excerpt: "Less is more. Learn the principles of minimalist design and how to choose furniture that breathes life into your space.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
    date: "March 28, 2026",
    author: "Marco Vani",
    category: "Design Trends"
  },
  {
    id: 3,
    title: "5 Tips for Maintaining Your Solid Wood Furniture",
    excerpt: "Keep your investment looking brand new for generations with our expert guide to wood care and maintenance.",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&q=80&w=800",
    date: "March 15, 2026",
    author: "Arjun Mehta",
    category: "Care Guide"
  }
];

const BlogPage = () => {
  return (
    <Layout title="The Journal - Banaya Lifestyle">
      {/* Header */}
      <section className="bg-brand-pearl py-32">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-brand-gold font-bold mb-6">The Journal</p>
          <h1 className="text-6xl md:text-8xl font-serif font-black text-brand-charcoal mb-8">Stories in Wood</h1>
          <p className="text-brand-stone max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Exploring the intersection of timeless craftsmanship, modern design, and sustainable luxury living.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Link href="/blog/1" className="group relative block aspect-[21/9] overflow-hidden rounded-3xl mb-12 shadow-2xl">
            <Image 
              src={BLOG_POSTS[0].image} 
              alt={BLOG_POSTS[0].title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 md:p-16 text-brand-pearl max-w-4xl">
              <div className="flex items-center gap-6 mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
                <span>{BLOG_POSTS[0].category}</span>
                <span className="h-1 w-1 bg-brand-gold rounded-full" />
                <span>{BLOG_POSTS[0].date}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 group-hover:text-brand-gold transition-colors">{BLOG_POSTS[0].title}</h2>
              <p className="text-brand-pearl/60 text-lg font-light max-w-2xl hidden md:block">{BLOG_POSTS[0].excerpt}</p>
            </div>
          </Link>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-24">
            {BLOG_POSTS.slice(1).map((post) => (
              <article key={post.id} className="group space-y-8">
                <Link href={`/blog/${post.id}`} className="block relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-brand-pearl/90 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-brand-charcoal rounded-full">
                    {post.category}
                  </div>
                </Link>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-brand-charcoal group-hover:text-brand-gold transition-colors leading-tight">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="text-brand-stone font-light leading-relaxed">{post.excerpt}</p>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-brand-charcoal group-hover:text-brand-gold transition-colors pt-4"
                  >
                    Read Story <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="mt-32 p-16 md:p-24 bg-brand-champagne/30 rounded-[3rem] text-center border border-brand-gold/10">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-charcoal mb-6">Join Our Inner Circle</h2>
            <p className="text-brand-stone max-w-xl mx-auto text-lg font-light mb-12">
              Subscribe to get exclusive access to new collection launches, design inspiration, and sustainable living tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white border border-brand-charcoal/5 px-8 py-5 rounded-full outline-none focus:border-brand-gold transition-all font-light"
              />
              <button className="px-12 py-5 bg-brand-charcoal text-brand-pearl font-black uppercase tracking-widest text-xs rounded-full hover:bg-brand-gold hover:text-brand-charcoal transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;
