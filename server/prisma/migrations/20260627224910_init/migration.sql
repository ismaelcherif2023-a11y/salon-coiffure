-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coiffure" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "imageUrl" TEXT,

    CONSTRAINT "Coiffure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "coiffureId" INTEGER NOT NULL,
    "dateHeure" TIMESTAMP(3) NOT NULL,
    "statut" TEXT NOT NULL DEFAULT 'en_attente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paiement" (
    "id" SERIAL NOT NULL,
    "stripeId" TEXT NOT NULL,
    "montant" DOUBLE PRECISION NOT NULL,
    "statut" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paiement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RendezVous" ADD CONSTRAINT "RendezVous_coiffureId_fkey" FOREIGN KEY ("coiffureId") REFERENCES "Coiffure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
