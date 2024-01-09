export class CollegeTableCreation1704779975932 {
  name = "CollegeTableCreation1704779975932";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "colleges" (
                "id" SERIAL NOT NULL,
                "faculty" character varying NOT NULL,
                "semester" integer NOT NULL,
                "teacher" character varying NOT NULL,
                "shortName" character varying NOT NULL,
                "subject" character varying NOT NULL,
                "type" character varying NOT NULL,
                "classesPerWeek" integer NOT NULL,
                "code" character varying NOT NULL,
                "teacherCode" character varying NOT NULL,
                "subjectCode" character varying NOT NULL,
                "sunStartTime" TIME NOT NULL,
                "sunEndTime" TIME NOT NULL,
                "monStartTime" TIME NOT NULL,
                "monEndTime" TIME NOT NULL,
                "tueStartTime" TIME NOT NULL,
                "tueEndTime" TIME NOT NULL,
                "wedStartTime" TIME NOT NULL,
                "wedEndTime" TIME NOT NULL,
                "thurStartTime" TIME NOT NULL,
                "thurEndTime" TIME NOT NULL,
                "friStartTime" TIME NOT NULL,
                "friEndTime" TIME NOT NULL,
                CONSTRAINT "PK_61a64e7dc0b7c9d5e433284037c" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "colleges"
        `);
  }
}
