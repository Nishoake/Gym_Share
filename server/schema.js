const { merge } = require('lodash')

const { User, userResolvers } = require('./schema/user')
const { Equipment, equipmentResolvers } = require('./schema/equipment')
const { Transaction, transactionResolvers } = require('./schema/transaction')

const typeDefs = [User, Equipment, Transaction]
const resolvers = merge(userResolvers, equipmentResolvers, transactionResolvers)

exports.typeDefs = typeDefs
exports.resolvers = resolvers