export class FinalDnaTableCreation1704780924590 {
  name = "FinalDnaTableCreation1704780924590";

  async up(queryRunner) {
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
  }

  async down(queryRunner) {
    await queryRunner.query(`
            DROP TABLE "final_dna"
        `);
  }
}
