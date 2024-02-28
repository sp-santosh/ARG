
export class User1709121444199 {
    name = 'User1709121444199'

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
        await queryRunner.query(`
            CREATE TABLE "chromosomes" (
                "id" SERIAL NOT NULL,
                "fitness" integer,
                "chromo" character varying,
                "fitnessHard" integer,
                "fitnessSoft" integer,
                CONSTRAINT "PK_d7364b04c229d93828b819cdc90" PRIMARY KEY ("id")
            )
        `);
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
        await queryRunner.query(`
            CREATE TABLE "days" (
                "id" SERIAL NOT NULL,
                "day" character varying NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "faculties" (
                "id" SERIAL NOT NULL,
                "className" character varying NOT NULL,
                "code" character varying NOT NULL,
                "semester" character varying NOT NULL,
                CONSTRAINT "PK_fd83e4a09c7182ccf7bdb3770b9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "final_dna" (
                "id" SERIAL NOT NULL,
                "slot" character varying NOT NULL,
                "teacher" character varying NOT NULL,
                "subject" character varying NOT NULL,
                "faculty" character varying NOT NULL,
                "token" integer NOT NULL,
                CONSTRAINT "PK_27c3755ba9454b54a981a26dcea" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "fitnesses" (
                "id" SERIAL NOT NULL,
                "token" integer,
                "dnaT" character varying,
                "dnaS" character varying,
                "dnaC" character varying,
                CONSTRAINT "PK_0e4f3a4daa48b050027f30a6a34" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "fitness1" (
                "id" SERIAL NOT NULL,
                "token" integer,
                "dnaF" character varying,
                "dnaT" character varying,
                "dnaS" character varying,
                "dnaSl" character varying,
                "indicator" integer,
                CONSTRAINT "PK_6af8d1ed9eb65180b7c4e3cab98" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "fitness2" (
                "id" SERIAL NOT NULL,
                "token" integer,
                "dnaF" character varying,
                "dnaT" character varying,
                "dnaS" character varying,
                "dnaSl" character varying,
                "indicator" integer,
                CONSTRAINT "PK_2f4f43c871c79876878e684c30d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "routines" (
                "id" SERIAL NOT NULL,
                CONSTRAINT "PK_6847e8f0f74e65a6f10409dee9f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "slots" (
                "id" SERIAL NOT NULL,
                "startTime" TIME NOT NULL,
                "endTime" TIME NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_8b553bb1941663b63fd38405e42" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "students" (
                "id" SERIAL NOT NULL,
                "faculty" character varying NOT NULL,
                "semester" integer NOT NULL,
                "noOfStudents" integer NOT NULL,
                CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "subjects" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "faculty" character varying NOT NULL,
                "semester" integer NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id")
            )
        `);
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
                CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" character varying NOT NULL,
                "password" character varying NOT NULL,
                "email" character varying NOT NULL,
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TABLE "teachers"
        `);
        await queryRunner.query(`
            DROP TABLE "subjects"
        `);
        await queryRunner.query(`
            DROP TABLE "students"
        `);
        await queryRunner.query(`
            DROP TABLE "slots"
        `);
        await queryRunner.query(`
            DROP TABLE "routines"
        `);
        await queryRunner.query(`
            DROP TABLE "fitness2"
        `);
        await queryRunner.query(`
            DROP TABLE "fitness1"
        `);
        await queryRunner.query(`
            DROP TABLE "fitnesses"
        `);
        await queryRunner.query(`
            DROP TABLE "final_dna"
        `);
        await queryRunner.query(`
            DROP TABLE "faculties"
        `);
        await queryRunner.query(`
            DROP TABLE "days"
        `);
        await queryRunner.query(`
            DROP TABLE "colleges"
        `);
        await queryRunner.query(`
            DROP TABLE "chromosomes"
        `);
        await queryRunner.query(`
            DROP TABLE "actual_data"
        `);
    }
}
