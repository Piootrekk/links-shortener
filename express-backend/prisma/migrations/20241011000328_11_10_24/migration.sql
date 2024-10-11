-- AlterTable
ALTER TABLE "hidden_details" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "cpu" TEXT,
ADD COLUMN     "device_type" TEXT,
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "os" TEXT,
ADD COLUMN     "user_agent" TEXT;

-- AlterTable
ALTER TABLE "urls" ADD COLUMN     "password" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3);
