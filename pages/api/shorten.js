let urlDatabase = {};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, custom } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = custom || Date.now().toString(36);

    if (urlDatabase[shortId]) {
      return res.status(409).json({ error: 'Alias already in use!' });
    }

    urlDatabase[shortId] = { originalUrl: url, clicks: 0 };

    const shortenedUrl = `${req.headers.origin}/${shortId}`;
    res.status(200).json({ shortened_url: shortenedUrl, alias: shortId });
  } else {
    res.status(405).end();
  }
}
