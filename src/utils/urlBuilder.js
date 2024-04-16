const URL = 'http://api.taboola.com/1.0/json/{publisherId}/recommendations.get?'

export function getUrl ({appType, apiKey,sourceId, sourceType, publisherId, count}) {
    const urlParams = new URLSearchParams({
        'app.type': appType,
        'app.apikey' : apiKey,
        'source.id' : sourceId,
        'source.type': sourceType,
        count,

    });
    return URL.replace('{publisherId}', publisherId) +urlParams;
}