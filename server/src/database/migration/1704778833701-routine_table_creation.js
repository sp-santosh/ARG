export class RoutineTableCreation1704778833701 {
  name = "RoutineTableCreation1704778833701";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "routines" (
                "id" SERIAL NOT NULL,
                CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "routines"
        `);
  }
}
