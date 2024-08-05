const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/";

getApiBodies().then(console.log);

async function getApiKey() {
    try {
        const response = await fetch(BASE_URL + 'keys', {method: 'POST'});
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.key;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}

async function getApiBodies() {
    try {
        const apiKey = await getApiKey();

        const response = await fetch(BASE_URL + 'bodies', {method: 'GET', headers: {'x-zocom': apiKey}});
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.bodies;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
}