#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/032f0441b8915cefed82b6ada4ffbb1204ff5016174939d69741e7d1a51fb17f/contract';
import endContract from '../../snapshots/032f0441b8915cefed82b6ada4ffbb1204ff5016174939d69741e7d1a51fb17f/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract';
import startContract from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropTable({ schema: 'public', table: 'ExpenseUser' }),
      this.dropTable({ schema: 'public', table: 'Post' }),
      this.dropTable({ schema: 'public', table: 'Transfer' }),
      this.createTable({
        schema: 'public',
        table: 'Participation',
        columns: [
          col('expenseId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['expenseId', 'userId'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Participation',
        index: 'Participation_expenseId_idx_69d413fa',
        columns: ['expenseId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Participation',
        index: 'Participation_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Participation',
        foreignKey: {
          name: 'Participation_expenseId_fkey',
          columns: ['expenseId'],
          references: { schema: 'public', table: 'Expense', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Participation',
        foreignKey: {
          name: 'Participation_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
