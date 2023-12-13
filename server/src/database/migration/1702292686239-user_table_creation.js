export class UserTableCreation1702292686239 {
  name = "UserTableCreation1702292686239";

  async up(queryRunner) {
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
  }
}
