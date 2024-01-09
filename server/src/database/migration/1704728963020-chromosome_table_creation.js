export class ChromosomeTableCreation1704728963020 {
  name = "ChromosomeTableCreation1704728963020";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "chromosomes" (
                "id" SERIAL NOT NULL,
                "fitness" integer NOT NULL,
                "chromo" character varying NOT NULL,
                "fitnessHard" integer NOT NULL,
                "fitnessSoft" integer NOT NULL,
                CONSTRAINT "PK_d7364b04c229d93828b819cdc90" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "chromosomes"
        `);
  }
}
