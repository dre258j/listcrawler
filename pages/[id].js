// pages/[id].js
export async function getServerSideProps({ params, res }) {
  const id = params.id;
  const urlDatabase = global.urlDatabase || {};

  const data = urlDatabase[id];

  if (data) {
    data.clicks += 1;
    res.writeHead(302, { Location: data.originalUrl });
    res.end();
    return { props: {} };
  }

  return {
    notFound: true,
  };
}

export default function RedirectPage() {
  return null;
}
