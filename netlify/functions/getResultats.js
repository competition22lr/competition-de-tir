// netlify/functions/getResultats.js
export async function handler() {
    try {
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const owner = "competition22lr";
        const repo = "dataFiles";
        const path = "resultats_cummulatif.xml";

        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=main`;

        const response = await fetch(url, {
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3.raw"
            }
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("GitHub API Error:", response.status, text);
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    error: "GitHub fetch failed",
                    status: response.status,
                    details: text
                })
            };
        }

        const xmlData = await response.text();
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/xml" },
            body: xmlData
        };
    } catch (error) {
        console.error("Error fetching data from GitHub:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
    }
}
