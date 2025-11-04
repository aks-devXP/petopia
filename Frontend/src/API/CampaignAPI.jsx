const baseURL = import.meta.env.VITE_BACKEND_BASEURL;

export async function getAllCampaigns(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = `${baseURL}/ngo/Cmall${query ? `?${query}` : ''}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.message || `Request failed with status ${resp.status}`);
    }

    const res = await resp.json();

    if (!res.success) {
      throw new Error(res.message || 'Failed to fetch Campaigns');
    }

    return res;
  } catch (error) {
    console.error('getAllCampaigns error:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong while fetching Campaigns.',
      data: [],
    };
  }
}
