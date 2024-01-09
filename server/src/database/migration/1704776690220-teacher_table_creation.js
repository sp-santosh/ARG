
export  class TeacherTableCreation1704776690220 {
    name = 'TeacherTableCreation1704776690220'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "teachers" DROP COLUMN "satStartTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers" DROP COLUMN "satEndTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers"
            ADD "monStartTime" TIME NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers"
            ADD "monEndTime" TIME NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "teachers" DROP COLUMN "monEndTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers" DROP COLUMN "monStartTime"
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers"
            ADD "satEndTime" TIME NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "teachers"
            ADD "satStartTime" TIME NOT NULL
        `);
    }
}
