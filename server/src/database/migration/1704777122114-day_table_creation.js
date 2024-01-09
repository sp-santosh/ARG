
export class DayTableCreation1704777122114 {
    name = 'DayTableCreation1704777122114'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "days" (
                "id" SERIAL NOT NULL,
                "day" character varying NOT NULL,
                "code" character varying NOT NULL,
                CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "days"
        `);
    }
}
