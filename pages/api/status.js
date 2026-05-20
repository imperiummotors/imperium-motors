export const config = { runtime: 'edge' };

export default async function handler() {
  const data = { status: 'Active Showcase' };

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 's-maxage=600, stale-while-revalidate=3600',
    },
  });
}
