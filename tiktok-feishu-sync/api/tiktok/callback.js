function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

module.exports = function handler(request, response) {
  const { code, auth_code: authCode, state, error, error_description: errorDescription } = request.query;
  const authorizationCode = code || authCode;

  response.setHeader("Content-Type", "text/html; charset=utf-8");

  if (error) {
    response.status(400).send(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TikTok 授权失败</title>
    <style>
      body { font-family: Arial, "Microsoft YaHei", sans-serif; margin: 40px; line-height: 1.6; color: #161823; }
      code { background: #f2f3f5; padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>TikTok 授权失败</h1>
    <p>error: <code>${escapeHtml(error)}</code></p>
    <p>description: <code>${escapeHtml(errorDescription)}</code></p>
  </body>
</html>`);
    return;
  }

  if (!authorizationCode) {
    response.status(400).send(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>缺少 TikTok 授权 Code</title>
    <style>
      body { font-family: Arial, "Microsoft YaHei", sans-serif; margin: 40px; line-height: 1.6; color: #161823; }
      code { background: #f2f3f5; padding: 2px 6px; border-radius: 4px; }
    </style>
  </head>
  <body>
    <h1>没有收到授权 Code</h1>
    <p>请确认 TikTok App 里的重定向 URL 填的是：</p>
    <p><code>https://你的-vercel-域名.vercel.app/api/tiktok/callback</code></p>
  </body>
</html>`);
    return;
  }

  response.status(200).send(`<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TikTok 授权成功</title>
    <style>
      body { font-family: Arial, "Microsoft YaHei", sans-serif; margin: 40px; line-height: 1.6; color: #161823; }
      code { display: inline-block; background: #f2f3f5; padding: 8px 10px; border-radius: 4px; word-break: break-all; }
      .box { max-width: 760px; }
    </style>
  </head>
  <body>
    <main class="box">
      <h1>TikTok 授权成功</h1>
      <p>已经收到临时授权 code。下一步可以用它换取 access token。</p>
      <p><strong>code:</strong></p>
      <p><code>${escapeHtml(authorizationCode)}</code></p>
      <p><strong>state:</strong></p>
      <p><code>${escapeHtml(state || "未提供")}</code></p>
    </main>
  </body>
</html>`);
};
