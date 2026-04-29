import { getAllBlogs } from '@/lib/content';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blogs = getAllBlogs();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) return <div className="text-white">Blog not found</div>;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <article style={{ padding: '160px clamp(20px, 4vw, 56px) 100px', maxWidth: 800, margin: '0 auto' }}>
        <span className="eyebrow" style={{ marginBottom: 24 }}>{blog.tag} · {blog.date}</span>
        <h1 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: 32, lineHeight: 1.05 }}>{blog.title}</h1>
        <div className="prose text-white" style={{ fontSize: 18, lineHeight: 1.7 }}>
           <MDXRemote source={blog.content} />
        </div>
      </article>
      <Footer />
    </main>
  );
}
