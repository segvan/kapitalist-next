-- CreateTable
CREATE TABLE "Stable" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isDefault" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "JobsHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AssetPrices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "price" DECIMAL NOT NULL,
    "timestamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PriceNotifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "timestamp" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Trades" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL,
    "qty" DECIMAL NOT NULL,
    "quoteQty" DECIMAL NOT NULL,
    "price" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "TradesAggr" (
    "symbol" TEXT NOT NULL PRIMARY KEY,
    "qty" DECIMAL NOT NULL,
    "quoteQty" DECIMAL NOT NULL,
    "avgPrice" DECIMAL NOT NULL,
    "timestamp" DATETIME NOT NULL
);
