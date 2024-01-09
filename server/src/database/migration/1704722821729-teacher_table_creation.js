export class TeacherTableCreation1704722821729 {
  name = "TeacherTableCreation1704722821729";

  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "teachers" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "shortName" character varying NOT NULL,
                "address" character varying NOT NULL,
                "phoneNumber" character varying NOT NULL,
                "type" character varying NOT NULL,
                "specialization" character varying NOT NULL,
                "code" character varying NOT NULL,
                "tueStartTime" TIME NOT NULL,
                "tueEndTime" TIME NOT NULL,
                "wedStartTime" TIME NOT NULL,
                "wedEndTime" TIME NOT NULL,
                "thurStartTime" TIME NOT NULL,
                "thurEndTime" TIME NOT NULL,
                "friStartTime" TIME NOT NULL,
                "friEndTime" TIME NOT NULL,
                "satStartTime" TIME NOT NULL,
                "satEndTime" TIME NOT NULL,
                "sunStartTime" TIME NOT NULL,
                "sunEndTime" TIME NOT NULL,
                CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "teachers"
        `);
  }
}
