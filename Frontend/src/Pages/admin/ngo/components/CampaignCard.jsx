
const ProgressBar = ({ value = 0 }) => (
  <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-orange-400 to-rose-500"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

const rupee = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n || 0)

const CampaignCard = ({ campaign, onOpen }) => {
  const pct = (100 * (campaign.raised || 0)) / (campaign.goal || 1)
  const cover = campaign.images?.[0]

  return (
    <div className="group rounded-2xl overflow-hidden bg-white ring-1 ring-black/5 shadow-sm hover:shadow-lg transition-shadow">
      {cover && (
        <div className="h-44 w-full overflow-hidden">
          <img src={cover} alt={campaign.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{campaign.title}</h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">{campaign.tagline || campaign.description}</p>

        <div className="mt-4 space-y-2">
          <ProgressBar value={pct} />
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span className="font-medium text-gray-900">{rupee(campaign.raised)} raised</span>
            <span className="text-gray-500">of {rupee(campaign.goal)}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-xs text-gray-500">By {campaign.name}</div>
          <button
            onClick={onOpen}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-orange-500 to-rose-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  )
}

export default CampaignCard

