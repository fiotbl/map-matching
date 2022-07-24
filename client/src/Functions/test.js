export const getTest = async () => {
    try {
        const res = await fetch('/test', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        return await res.json();
    } catch (err) { }
}