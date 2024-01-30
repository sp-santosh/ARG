
export class SubjectTableCreation1706622413938 {
    name = 'SubjectTableCreation1706622413938'

    async up(queryRunner) {
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
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "subjects"
        `);
    }
}
