const apiUrl = "https://api.theretrosaga.com/api";

// Utility function to handle fetch requests and errors
const fetchWithErrors = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const getAuthHeaders = async (getAccessTokenSilently) => {
    try {
        const token = await getAccessTokenSilently({
            authorizationParams: {
                audience: "https://hello-world.example.com",
                // Uncomment if scope is needed
                scope: "offline_access",
            }
        });
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");

        return myHeaders;
    } catch (error) {
        console.error("Error fetching access token:", error);
        throw error; // Rethrow to handle it in the calling function
    }
};

export const getUserSessions = async (getAccessTokenSilently) => {
    const headers = await getAuthHeaders(getAccessTokenSilently);
    return fetchWithErrors(apiUrl + "/usersession/get", { method: 'GET', headers });
};

export const saveSession = async (getAccessTokenSilently, game) => {
    const headers = await getAuthHeaders(getAccessTokenSilently);
    await fetchWithErrors(apiUrl + "/usersession/create", {
        method: 'POST',
        headers,
        body: JSON.stringify({ game })
    });
};

export const getUserSaves = async (getAccessTokenSilently, game) => {
    const headers = await getAuthHeaders(getAccessTokenSilently);
    return fetchWithErrors(apiUrl + "/usersave/getAll/" + game.ID, { method: 'GET', headers });
};

export const loadSavedGame = async (getAccessTokenSilently, saveID) => {
    const headers = await getAuthHeaders(getAccessTokenSilently);
    return fetchWithErrors(apiUrl + "/usersave/get/" + saveID, { method: 'GET', headers });
};

export const saveGame = async (getAccessTokenSilently, game, state) => {
    const headers = await getAuthHeaders(getAccessTokenSilently);
    if (headers.get('Content-Type')) {
        headers.delete('Content-Type'); // FormData handles its own Content-Type header
    }
    const formData = new FormData();
    formData.append('game', game.ID);
    formData.append('file', state, game.name + ".state");

    return fetchWithErrors(apiUrl + "/usersave/create", {
        method: 'POST',
        headers,
        body: formData
    });
};