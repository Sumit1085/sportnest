export const fetchFacility = async () => {
    const res = await fetch(`${process.env.BETTER_AUTH_URL}/facility`);
    const data = res.json()
    return data || [];
}