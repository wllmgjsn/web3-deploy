#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/3126a65e03d77200aea7bd19e506d1919ab1b221e0055e211f58d29afbd7146c/contract';
import startContract from '../../snapshots/3126a65e03d77200aea7bd19e506d1919ab1b221e0055e211f58d29afbd7146c/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract';
import endContract from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Category',
        columns: [
          col('colour', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addColumn({
        schema: 'public',
        table: 'Expense',
        column: col('categoryId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
      }),
      this.addUnique({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_name_key',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Expense',
        index: 'Expense_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Expense',
        foreignKey: {
          name: 'Expense_categoryId_fkey',
          columns: ['categoryId'],
          references: { schema: 'public', table: 'Category', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
