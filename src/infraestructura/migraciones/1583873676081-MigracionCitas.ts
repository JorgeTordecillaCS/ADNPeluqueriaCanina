import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigracionUsuario1583873676081 implements MigrationInterface {
  name = 'MigracionUsuario1583873676081';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `cita` (`id` int NOT NULL AUTO_INCREMENT, `raza` varchar(255) NOT NULL, `hora` varchar(255) NOT NULL, `fecha` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `cita`', undefined);
  }
}
