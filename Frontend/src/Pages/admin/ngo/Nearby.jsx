import { getAllNGOS, getUniqueCategories } from '@/API/NgoAPI'
import Pagination from '@/components/General/Pagination'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import React, { useMemo, useState } from 'react'
import NGODetailsModal from './components/NGODetailsModal'
import NGOTile from './components/NGOTile'

// --- tiny debounce hook
function useDebouncedValue(value, delay = 350) {
  const [v, setV] = React.useState(value)
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return v
}

const Nearby = () => {
  const [filter, setFilter] = useState({ state: '', q: '' })
  const [selected, setSelected] = useState(null)

  // pagination state
  const [page, setPage] = useState(1)
  const limit = 12

  const debouncedQ = useDebouncedValue(filter.q, 350)

  // Distinct states
  const { data: statesResp, isLoading: statesLoading, isError: statesError } = useQuery({
    queryKey: ['ngo-unique', 'state'],
    queryFn: () => getUniqueCategories(['state']),
    staleTime: 5 * 60 * 1000,
  })

  const states = useMemo(() => {
    if (statesResp?.success && statesResp.data?.state?.length) {
      return [...statesResp.data.state].sort()
    }
    return []
  }, [statesResp])

  // NGOs fetch
  const {
    data: ngosResp,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['ngos', { page, limit, state: filter.state, q: debouncedQ }],
    queryFn: () =>
      getAllNGOS({
        page,
        limit,
        ...(filter.state ? { state: filter.state } : {}),
        ...(debouncedQ ? { q: debouncedQ } : {}),
      }),
    keepPreviousData: true,
  })

  const ngos = ngosResp?.data ?? []

  // Optional client-side extra filter (on top of server)
  const filtered = useMemo(() => {
    const q = debouncedQ.trim().toLowerCase()
    if (!q) return ngos
    return ngos.filter((n) => {
      const text = `${n.name ?? ''} ${n.city ?? ''} ${n.owner ?? ''}`.toLowerCase()
      return text.includes(q)
    })
  }, [ngos, debouncedQ])

  // ---- Pagination integration ----
  // Prefer server-provided totals if present; else heuristic fallback
  const total =
    ngosResp?.total ??
    ngosResp?.count ??
    ngosResp?.meta?.total ??
    undefined

  const totalPagesFromServer =
    ngosResp?.pagination?.totalPages ??
    ngosResp?.totalPages ??
    (total ? Math.max(1, Math.ceil(total / limit)) : undefined)

  // Fallback: if server doesn't provide totals, show at most one "next" page
  // when we have a full page of results (classic UX heuristic)
  const heuristicTotalPages = Math.max(1, page + (ngos.length === limit ? 1 : 0))

  const totalPages = totalPagesFromServer ?? heuristicTotalPages

  const handlePageChange = (p) => setPage(p)

  return (
    <div className="min-h-screen bg-blue-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            Find an NGO Nearby
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore trusted animal welfare NGOs near you. Filter by state or search by name or city.
          </p>
        </motion.div>

        <div className="mt-8 rounded-xl bg-white/95 backdrop-blur shadow-sm ring-1 ring-gray-200 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select
                value={filter.state}
                onChange={(e) => {
                  setFilter((f) => ({ ...f, state: e.target.value }))
                  setPage(1)
                }}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                disabled={statesLoading}
              >
                <option value="">All states</option>
                {states.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {statesError && (
                <p className="mt-1 text-xs text-red-500">Failed to load states.</p>
              )}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                value={filter.q}
                onChange={(e) => {
                  setFilter((f) => ({ ...f, q: e.target.value }))
                  setPage(1)
                }}
                placeholder="Search by name, city, or owner"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
              />
              {isFetching && (
                <p className="mt-1 text-xs text-gray-500">Searching…</p>
              )}
            </div>
          </div>
        </div>

        {/* Loading / Error states */}
        {isLoading && (
          <div className="mt-8 text-center text-gray-600">Loading NGOs…</div>
        )}
        {isError && (
          <div className="mt-8 text-center text-red-500">
            {error?.message || 'Failed to load NGOs.'}{' '}
            <button
              onClick={() => refetch()}
              className="text-blue-600 underline underline-offset-2"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((ngo) => (
              <motion.div
                key={ngo._id || ngo.id}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                <NGOTile ngo={ngo} onClick={setSelected} />
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-300 py-12">
                No NGOs match your filters.
              </div>
            )}
          </motion.div>
        )}
      </div>

      <NGODetailsModal open={!!selected} ngo={selected} onClose={() => setSelected(null)} />

      {/* >>> Proper Pagination integration <<< */}
      <Pagination
        start={1}
        end={totalPages}
        currentPage={page}
        PageChangeHandler={handlePageChange}
        showPrevNext={true}
        maxVisiblePages={5}
      />
    </div>
  )
}

export default Nearby
