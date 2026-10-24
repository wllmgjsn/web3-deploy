import { createSchema } from 'graphql-yoga';
import { ExpensesService } from '../../services/expenses.service';
import { UserService } from '../../services/users.service';

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
  type User {
    id: Int!
    name: String!
    email: String!
    bankAccount: String
  }

  type Category {
    id: Int!
    name: String!
    colour: String!
  }

  type Expense {
    id: Int!
    description: String!
    amount: Float!
    date: String!
    payer: User!
    participants: [User!]!
    category: Category
  }

  input ExpenseFilter {
    amount: Float
    payerId: Int
    categoryId: Int
  }

  type Query {
    expenses(filter: ExpenseFilter): [Expense!]!
    expense(id: Int!): Expense
    users: [User!]!
    categories: [Category!]!
  }
`,
  resolvers: {
    Query: {
      expenses: async (_parent, args) => await ExpensesService.getExpenses(args.filter ?? {}),
      users: async () => await UserService.getUsers(),
      // expense: ...    ← one expense, by id. Which service method, and what is in args?
      // categories: ... ← the same shape as users
    },
  },
});