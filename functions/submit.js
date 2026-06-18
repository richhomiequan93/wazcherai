export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { name, company, email, plan, message } = body;

    if (!email) {
      return Response.json({ ok: false, error: 'Email is required' }, { status: 400 });
    }

    await env.DB.prepare(
      'INSERT INTO contacts (name, company, email, plan, message) VALUES (?, ?, ?, ?, ?)'
    ).bind(
      name    || '',
      company || '',
      email,
      plan    || '',
      message || ''
    ).run();

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
