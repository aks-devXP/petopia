import React, { useMemo, useState, useEffect } from 'react'
import campaignsSeed from '@/Data/Campaigns.json'
import CampaignDetailsModal from './components/CampaignDetailsModal'
import DonateHero from './components/DonateHero'
import FeaturedCampaigns from './components/FeaturedCampaigns'
import ImpactStrip from './components/ImpactStrip'
import DirectDonate from './components/DirectDonate'

const Donate = () => {
  const [active, setActive] = useState(null)

  useEffect(() => { document.title = 'Donate for Animal Welfare — Petopia' }, [])

  const campaigns = useMemo(() => campaignsSeed, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-50 via-orange-50 to-white">
      <DonateHero />

      <div className="mx-auto max-w-7xl px-4">
        <FeaturedCampaigns
          campaigns={campaigns}
          onOpen={(c) => setActive(c)}
        />
      </div>

      <ImpactStrip />

      <div className="mx-auto max-w-7xl px-4">
        <DirectDonate />
      </div>

      <CampaignDetailsModal open={!!active} campaign={active} onClose={() => setActive(null)} />
    </div>
  )
}

export default Donate
