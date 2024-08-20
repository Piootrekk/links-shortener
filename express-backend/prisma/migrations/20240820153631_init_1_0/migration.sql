-- CreateTable
CREATE TABLE "hidden_details" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "city" TEXT,
    "device" TEXT,
    "country" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "urls_id" UUID,

    CONSTRAINT "hidden_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urls" (
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "original_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "user_id" UUID,
    "title" TEXT,
    "qr_code" TEXT,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");

-- AddForeignKey
ALTER TABLE "hidden_details" ADD CONSTRAINT "hidden_details_urls_id_fkey" FOREIGN KEY ("urls_id") REFERENCES "urls"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
