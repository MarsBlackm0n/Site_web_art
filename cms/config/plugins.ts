export default ({ env }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("R2_PUBLIC_BASE_URL"),
        s3Options: {
          endpoint: env("R2_ENDPOINT"),
          region: env("R2_REGION", "auto"),
          forcePathStyle: true,
          credentials: {
            accessKeyId: env("R2_ACCESS_KEY_ID"),
            secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
          },
        },
        params: {
          Bucket: env("R2_BUCKET"),
        },
      },
    },
  },
});
