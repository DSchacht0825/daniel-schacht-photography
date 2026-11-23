// Send www traffic to the canonical apex domain (one URL per page for Google).
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === 'www.danielschachtphotography.com') {
    url.hostname = 'danielschachtphotography.com';
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
