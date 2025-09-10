import { handleError } from "../Util/Alerts";

const baseURL = import.meta.env.VITE_BACKEND_BASEURL;

// small helper to build query strings
function buildQuery(obj = {}) {
  const params = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    params.set(k, String(v));
  });
  return params.toString();
}

/**
 * GET /guide/total-count?categories=Dog,Cat
 */
export async function getPetCount(category = [], signal) {
  try {
    const qs = buildQuery({
      category: Array.isArray(category) && category.length ? category.join(",") : undefined,
    });

    const res = await fetch(`${baseURL}/guide/total-count?${qs}`, {
      method: "GET",
      signal, 
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`getPetCount failed: ${res.status}`);
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message || "Failed to fetch pet count");
    console.log(category);
    return data.count ?? 0;
  } catch (err) {
    console.error("Error fetching pet count:", err);
    handleError(err);
    throw err; 
  }
}

/**
 * GET /guide/pets/:start?count=8&categories=Dog,Cat
 */
export async function getPets(start = 0, category = [], count = 8, signal) {
  try {
    const qs = buildQuery({
      count,
      category: Array.isArray(category) && category.length ? category.join(",") : undefined,
    });

    const res = await fetch(`${baseURL}/guide/pets/${start}?${qs}`, {
      method: "GET",
      signal, 
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`getPets failed: ${res.status}`);
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message || "Failed to fetch pets");

    return data.pets ?? [];
  } catch (err) {
    console.error("Error fetching pets:", err);
    handleError(err);
    throw err;
  }
}

/**
 * GET /guide/all-categories
 */
export async function getUniquePetCategories(signal) {
  try {
    const res = await fetch(`${baseURL}/guide/all-categories`, {
      method: "GET",
      signal, 
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`getUniquePetCategories failed: ${res.status}`);
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message || "Failed to fetch pet categories");
    // console.log(data.categories);
    return data.categories ?? [];
  } catch (err) {
    console.error("Error fetching unique pet categories:", err);
    handleError(err);
    throw err;
  }
}

/**
 * GET /guide/get-pet/:id
 */
export async function getPetByID(id, signal) {
  try {
    const res = await fetch(`${baseURL}/guide/get-pet/${id}`, {
      method: "GET",
      signal,
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error(`getPetByID failed: ${res.status}`);
    const data = await res.json();
    if (!data?.success) throw new Error(data?.message || "Failed to fetch pet by ID");

    return data.pet;
  } catch (err) {
    console.error("Error fetching pet by ID:", err);
    handleError(err);
    throw err;
  }
}
