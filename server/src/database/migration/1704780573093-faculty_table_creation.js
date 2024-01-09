export class FacultyTableCreation1704780573093 {
  name = "FacultyTableCreation1704780573093";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "faculties" (
                "id" SERIAL NOT NULL,
                "className" character varying NOT NULL,
                "code" character varying NOT NULL,
                "semester" character varying NOT NULL,
                CONSTRAINT "PK_fd83e4a09c7182ccf7bdb3770b9" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "faculties"
        `);
  }
}
