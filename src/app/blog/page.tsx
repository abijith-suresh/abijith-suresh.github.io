export default async function BlogPage() {
  // const blogPosts = await getBlogPosts() // Uncomment when ready to fetch posts

  return (
    <section className='pt-40 pb-24'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12'>Blog</h1>
        <div className='text-center'>
          <p className='text-muted-foreground font-serif text-xl'>
            My blog is currently under construction. Stay tuned for exciting
            updates!
          </p>
        </div>

        {/* <BlogPosts posts={blogPosts} /> */}
      </div>
    </section>
  )
}
