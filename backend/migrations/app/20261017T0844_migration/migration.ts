#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract';
import endContract from '../../snapshots/d54df8a71add9b12c0e93ed71b3ccfeaf4ed6ad7a4fedad5e38988d4b6f2d68d/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
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
      this.createTable({
        schema: 'public',
        table: 'Expense',
        columns: [
          col('amount', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('categoryId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('description', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('payerId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'ExpenseUser',
        columns: [
          col('expenseId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('userId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['expenseId', 'userId'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Post',
        columns: [
          col('authorId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('content', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Transfer',
        columns: [
          col('amount', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('date', 'timestamptz', {
            notNull: true,
            default: fn('now()'),
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sourceId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('targetId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('bankAccount', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Category',
        constraint: 'Category_name_key',
        columns: ['name'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'User',
        constraint: 'User_email_key',
        columns: ['email'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Expense',
        index: 'Expense_categoryId_idx_15c304f2',
        columns: ['categoryId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Expense',
        index: 'Expense_payerId_idx_3d3ae95d',
        columns: ['payerId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ExpenseUser',
        index: 'ExpenseUser_expenseId_idx_69d413fa',
        columns: ['expenseId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'ExpenseUser',
        index: 'ExpenseUser_userId_idx_a489d58a',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Post',
        index: 'Post_authorId_idx_e47547ed',
        columns: ['authorId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Transfer',
        index: 'Transfer_sourceId_idx_d92a2571',
        columns: ['sourceId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Transfer',
        index: 'Transfer_targetId_idx_9852d518',
        columns: ['targetId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Expense',
        foreignKey: {
          name: 'Expense_payerId_fkey',
          columns: ['payerId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
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
      this.addForeignKey({
        schema: 'public',
        table: 'ExpenseUser',
        foreignKey: {
          name: 'ExpenseUser_expenseId_fkey',
          columns: ['expenseId'],
          references: { schema: 'public', table: 'Expense', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'ExpenseUser',
        foreignKey: {
          name: 'ExpenseUser_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Post',
        foreignKey: {
          name: 'Post_authorId_fkey',
          columns: ['authorId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Transfer',
        foreignKey: {
          name: 'Transfer_sourceId_fkey',
          columns: ['sourceId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Transfer',
        foreignKey: {
          name: 'Transfer_targetId_fkey',
          columns: ['targetId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
