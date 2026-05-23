# TikTok Shop OAuth Callback

This is a minimal Vercel callback service for TikTok Shop Open API authorization.

## Redirect URL

After deploying to Vercel, use this URL in TikTok Shop Partner Center:

```text
https://YOUR-VERCEL-DOMAIN.vercel.app/api/tiktok/callback
```

## What It Does

When TikTok redirects back after seller authorization, this endpoint reads the temporary authorization code from the query string and displays it.

Expected callback shape:

```text
/api/tiktok/callback?code=xxxx&state=xxxx
```

Some TikTok docs or flows may call this value `auth_code`, so the endpoint accepts both `code` and `auth_code`.

## Next Step

After this callback works, add token exchange logic:

1. Receive `code` or `auth_code`.
2. Call TikTok Shop token API using your `app_key` and `app_secret`.
3. Store the returned access token and refresh token.
4. Use those tokens to pull shop data and write it into Feishu.

