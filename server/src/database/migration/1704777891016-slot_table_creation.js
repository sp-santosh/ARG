export class SlotTableCreation1704777891016 {
  name = "SlotTableCreation1704777891016";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "slots" (
                "id" SERIAL NOT NULL,
                "startTime" TIME NOT NULL,
                "endTime" TIME NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_8b553bb1941663b63fd38405e42" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "slots"
        `);
  }
}
