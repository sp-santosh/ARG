export class FitnessTableCreation1704781236371 {
  name = "FitnessTableCreation1704781236371";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "fitnesses" (
                "id" SERIAL NOT NULL,
                "token" integer NOT NULL,
                "dnaT" character varying NOT NULL,
                "dnaS" character varying NOT NULL,
                "dnaC" character varying NOT NULL,
                CONSTRAINT "PK_0e4f3a4daa48b050027f30a6a34" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "fitnesses"
        `);
  }
}
