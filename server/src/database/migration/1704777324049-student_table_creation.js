export class StudentTableCreation1704777324049 {
  name = "StudentTableCreation1704777324049";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "students" (
                "id" SERIAL NOT NULL,
                "faculty" character varying NOT NULL,
                "semester" integer NOT NULL,
                "noOfStudents" integer NOT NULL,
                CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "students"
        `);
  }
}
