const baseURL = import.meta.env.VITE_BACKEND_BASEURL;

export async function getAllNGOS(params = {}) {
  try {
    // Build query string from params object
    const queryString = new URLSearchParams(params).toString();
    const url = `${baseURL}/ngo/Nall${queryString ? `?${queryString}` : ''}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      throw new Error(errorData.message || `Request failed with ${resp.status}`);
    }

    const data = await resp.json();
    return data; // structure: { success, message, data: [ngo objects] }
  } catch (error) {
    console.error('getAllNGOS error:', error);
    return {
      success: false,
      message: error.message || 'Something went wrong while fetching NGOs.',
      data: [],
    };
  }
}


export async function getUniqueCategories(fields = []) {
  try {
    if (!fields.length) {
      throw new Error("At least one field is required (e.g., ['state', 'city']).");
    }

    // Build query string
    const queryString = new URLSearchParams({
      fields: fields.join(','),
    }).toString();

    const url = `${baseURL}/ngo/Nunique-categories?${queryString}`;

    const resp = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.message || `Request failed with ${resp.status}`);
    }

    const data = await resp.json();
    return data; // structure: { success, message, data: { state: [...], city: [...] } }
  } catch (error) {
    console.error("getUniqueCategories error:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch unique categories.",
      data: {},
    };
  }
}