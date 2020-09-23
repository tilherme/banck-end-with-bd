import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export default class AlterProviderFieldToProviderId1600831778574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'provider');
        
        await queryRunner.addColumn('appointments', new TableColumn({
            name: 'provider_id',
            type:'uuid',
            isNullable: true,

        }),
        );
        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            name: 'AppointmentProvider',
            columnNames: ['provider_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete:'SET NULL', //RESTRICT: não deixa users ser deletado ,CASCADE deleta tudo relacionado, SET NULL setar como nulo
            onUpdate:'CASCADE', // SEMPRE
        }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

        await queryRunner.dropColumn('appointments', 'provider_id');

        await queryRunner.addColumn('appointments',new TableColumn({
            name: 'provider',
            type: 'varchar',
        }),
        )

    }

}
