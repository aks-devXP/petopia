import React, { useState } from 'react'

const NewsletterCTA = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setSubmitted(true)
  }

  return (
    <section className="mt-12">
      <div className="relative rounded-3xl overflow-hidden border border-brand/20 bg-white p-6 md:p-10 shadow-lg shadow-brand/15">
        <div className="max-w-3xl text-ink-primary">
          <h3 className="text-2xl md:text-3xl text-ink-primary font-extrabold">Get the best animal news in your inbox</h3>
          <p className="mt-2 text-ink-primary/80">Weekly roundups on welfare, research, adoption, and inspiring stories.</p>
          {submitted ? (
            <p className="mt-4 text-brand font-semibold">Thanks! You're subscribed.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 w-full sm:w-80 rounded-xl border border-stone-200 bg-white px-4 focus:outline-none focus:ring-2 focus:ring-brand text-ink-primary placeholder:text-ink-primary/40"
                required
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-brand text-white font-semibold hover:bg-brand-hover active:translate-y-px"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

export default NewsletterCTA
