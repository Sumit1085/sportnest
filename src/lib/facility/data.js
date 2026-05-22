export const fetchFacility = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const res = await fetch(`${apiUrl}/facility`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data || [];
}