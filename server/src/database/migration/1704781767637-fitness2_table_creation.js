export class Fitness2TableCreation1704781767637 {
  name = "Fitness2TableCreation1704781767637";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "fitness2" (
                "id" SERIAL NOT NULL,
                "token" integer NOT NULL,
                "dnaF" character varying NOT NULL,
                "dnaT" character varying NOT NULL,
                "dnaS" character varying NOT NULL,
                "dnaSl" character varying NOT NULL,
                "indicator" integer NOT NULL,
                CONSTRAINT "PK_2f4f43c871c79876878e684c30d" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "fitness2"
        `);
  }
}
