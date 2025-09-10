import React, { useEffect, useMemo, useState } from 'react'
import { FaShieldAlt, FaLock, FaHeart } from 'react-icons/fa'

const rupee = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

const clamp = (n, min, max) => Math.max(min, Math.min(max, n))

const DirectDonate = () => {
  const MIN = 0
  const MAX = 20000
  const STEP = 500

  const presets = useMemo(() => [500, 1000, 2500, 5000, 10000], [])
  const [amount, setAmount] = useState(1000)
  const [anonymous, setAnonymous] = useState(true)

  useEffect(() => { setAmount((a) => clamp(Math.round(a / STEP) * STEP, MIN, MAX)) }, [])

  const setAmountSafe = (v) => {
    const num = Number(String(v).replace(/[^0-9]/g, ''))
    if (Number.isFinite(num)) setAmount(clamp(num, MIN, MAX))
  }

  const handleDonate = (e) => {
    e.preventDefault()
    const url = `https://example.org/petopia-donate?amount=${encodeURIComponent(amount)}&anonymous=${anonymous ? '1' : '0'}`
    window.open(url, '_blank')
  }

  return (
    <section className="py-12">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-pink-500 p-1 shadow-xl ring-1 ring-black/10">
            <div className="rounded-[calc(1.5rem-4px)] bg-white/95 p-6 backdrop-blur">
              <h3 className="text-2xl font-extrabold tracking-tight text-gray-900">Donate to Petopia Fund</h3>
              <p className="mt-2 text-gray-700">Contribute directly to Petopia’s emergency fund. We allocate your donation to urgent, high-impact animal welfare causes.</p>
              <form onSubmit={handleDonate} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Donation amount</label>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={amount}
                        onChange={(e) => setAmountSafe(e.target.value)}
                        className="w-40 rounded-lg border border-gray-300 bg-gray-800 pl-7 pr-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />
                    </div>
                    {/* <div className="text-sm text-gray-600">{rupee(amount)}</div> */}
                  </div>
                  <input
                    type="range"
                    min={MIN}
                    max={MAX}
                    step={STEP}
                    value={amount}
                    onChange={(e) => setAmountSafe(e.target.value)}
                    className="mt-3 w-full accent-orange-500"
                  />
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setAmountSafe(p)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 ${amount === p ? 'bg-orange-500 text-white ring-orange-500' : 'bg-white text-gray-800 ring-gray-300 hover:bg-gray-50'}`}
                      >
                        ₹{p}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400" />
                  Donate anonymously
                </label>

                <div className="flex items-center gap-10">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 px-6 py-3 text-white font-semibold shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
                  >
                    <FaHeart/> Donate now
                  </button>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <div className='flex items-center gap-2'>
                      <FaLock/> Secure payment
                    </div>
                    <div className='flex items-center gap-2'>
                     <FaShieldAlt/> Verified NGO allocation
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-black/5">
              <h4 className="font-semibold text-gray-900">How we use your donation</h4>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                <li>Urgent treatments and life-saving surgeries for rescued animals.</li>
                <li>Emergency feeding drives during extreme weather.</li>
                <li>Temporary shelter and rehabilitation support.</li>
                <li>Transparent allocation with periodic impact updates.</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-rose-100 p-5 ring-1 ring-black/5">
              <h4 className="font-semibold text-gray-900">Tax benefit ready</h4>
              <p className="mt-1 text-sm text-gray-700">Donations via registered partners qualify for tax deductions as per applicable laws. Receipts are emailed automatically.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DirectDonate

