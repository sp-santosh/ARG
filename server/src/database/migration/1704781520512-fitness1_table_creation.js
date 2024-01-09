export class Fitness1TableCreation1704781520512 {
  name = "Fitness1TableCreation1704781520512";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "fitness1" (
                "id" SERIAL NOT NULL,
                "token" integer NOT NULL,
                "dnaF" character varying NOT NULL,
                "dnaT" character varying NOT NULL,
                "dnaS" character varying NOT NULL,
                "dnaSl" character varying NOT NULL,
                "indicator" integer NOT NULL,
                CONSTRAINT "PK_6af8d1ed9eb65180b7c4e3cab98" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "fitness1"
        `);
  }
}
