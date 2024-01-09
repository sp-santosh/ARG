export class ActualDataTableCreation1704725403711 {
  name = "ActualDataTableCreation1704725403711";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "actual_data" (
                "id" SERIAL NOT NULL,
                "startTime" TIME NOT NULL,
                "endTime" TIME NOT NULL,
                "teacherName" character varying NOT NULL,
                "subjectName" character varying NOT NULL,
                "faculty" character varying NOT NULL,
                "token" integer NOT NULL,
                "day" character varying NOT NULL,
                CONSTRAINT "PK_40a825a7b0a14126fb5e279c47c" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "actual_data"
        `);
  }
}
