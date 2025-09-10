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
      <div className="relative rounded-3xl overflow-hidden border border-gray-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 md:p-10">
        <div className="max-w-3xl">
          <h3 className="text-2xl md:text-3xl text-emerald-600 font-extrabold">Get the best animal news in your inbox</h3>
          <p className="mt-2 text-gray-700">Weekly roundups on welfare, research, adoption, and inspiring stories.</p>
          {submitted ? (
            <p className="mt-4 text-emerald-700 font-semibold">Thanks! You're subscribed.</p>
          ) : (
            <form onSubmit={onSubmit} className="mt-5 flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-11 w-full sm:w-80 rounded-xl border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <button
                type="submit"
                className="h-11 px-5 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 active:translate-y-px"
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


