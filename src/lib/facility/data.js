export const fetchFacility = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/facility`);
    const data = res.json()
    return data || [];
}