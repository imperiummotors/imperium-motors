export const config = { runtime: 'edge' };

const INVENTORY_API_URL = 'https://api.imperiummotors.co.uk/cars';

export default async function handler() {
  try {
    const response = await fetch(INVENTORY_API_URL);
    if (!response.ok) {
      throw new Error(`External inventory API returned ${response.status} ${response.statusText}`);
    }

    const inventory = await response.json();
    return new Response(JSON.stringify(inventory), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    console.error('Inventory API error:', error);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
      },
    });
  }
}
