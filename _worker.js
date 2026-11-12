export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Route proxy Yahoo Finance
    if (url.pathname === '/yahoo-proxy') {
      const ticker = url.searchParams.get('ticker');
      if (!ticker) return new Response('missing ticker', { status: 400 });
      
      const resp = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );
      const data = await resp.json();
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Tout le reste : servir les fichiers statiques normalement
    return env.ASSETS.fetch(request);
  }
};
