import { createProxyMiddleware } from "http-proxy-middleware";

export const createProxy = (target: string) =>
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            "^/api/auth": "",
        },
        on: {
            proxyReq: (proxyReq, req: any) => {
                if (req.body) {
                    const bodyData = JSON.stringify(req.body);

                    proxyReq.setHeader("Content-Type", "application/json");
                    proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

                    proxyReq.write(bodyData);
                }
            },
        },
    });