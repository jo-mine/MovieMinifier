import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { z } from "zod"
import { useS3 } from "~/server/composables/s3"
import { formatDateTime } from "~/utils/common"
export const File = new Hono()
  .get(
    "/uploadUrl",
    zValidator(
      "query",
      z.object({
        filename: z.string().min(1),
        key: z.string().length(26),
      }),
    ),
    async (c) => {
      const { filename, key } = c.req.valid("query")
      const s3 = useS3()
      const url = s3.presign(`${key}/${filename}`, { expiresIn: 600, method: "PUT" })
      return c.json({ url })
    },
  )
  .get("/files", zValidator("query", z.object({ key: z.string().length(26) })), async (c) => {
    const { key } = c.req.valid("query")
    const s3 = useS3(true)
    const prefix = key.endsWith("/") ? key : `${key}/`
    const list = await s3.list({ prefix })
    const files = (list.contents ?? []).map((v) => ({
      key: v.key.slice(0, prefix.length - 1),
      lastModified: formatDateTime(v.lastModified),
      size: v.size,
      filename: v.key.slice(prefix.length),
      __: v,
    }))
    return c.json({ files })
  })
  .get("/downloadUrl", zValidator("query", z.object({ key: z.string().length(26), filename: z.string().min(1) })), async (c) => {
    const { key, filename } = c.req.valid("query")
    const _s3 = useS3(true)
    const exists = await _s3.exists(`${key}/${filename}`)
    if (!exists) {
      return c.notFound()
    }
    const s3 = useS3()
    const url = s3.presign(`${key}/${filename}`, { expiresIn: 60 })
    return c.json({ url })
  })
