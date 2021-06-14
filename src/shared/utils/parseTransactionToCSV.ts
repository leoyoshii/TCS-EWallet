import json2csv from 'json2csv';
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import { Transaction } from '@modules/Transaction/infra/typeorm/entities/Transaction';
import { formatmoney } from './formatMoney';
import AppErrors from '@shared/infra/errors/AppErrors';

export const parseTransactionToCSV = async (data: Transaction[]) => {
  const json2csvParser = new json2csv.Parser<Transaction>({
    fields: [
      {
        label: 'Nome do enviado',
        value: (row, field) => {
          return row.sender.name;
        },
      },
      {
        label: 'Email do enviado',
        value: (row, field) => {
          return row.sender.email;
        },
      },
      {
        label: 'Nome do recebido',
        value: (row, field) => {
          return row.receiver.name;
        },
      },
      {
        label: 'Email do Recebido',
        value: (row, field) => {
          return row.receiver.email;
        },
      },
      {
        label: 'Descrição',
        value: (row, field) => {
          return row.description;
        },
      },
      {
        label: 'Categoria',
        value: (row, field) => {
          return row.category ? row.category.name : field.default;
        },
        default: undefined,
      },
      {
        label: 'Valor',
        value: (row, field) => {
          return formatmoney(row.value);
        },
      },
      {
        label: 'Data da Transação',
        value: (row, field) => {
          return format(row.createdAt, 'HH:mm dd-MM-yyyy');
        },
      },
    ],
  });

  const tmpFolder = path.resolve(__dirname, '..', '..', '..', 'tmp');

  try {
    const csv = json2csvParser.parse(data);

    const csvpath = path.resolve(tmpFolder, Date.now() + '.csv');

    await fs.promises.writeFile(csvpath, csv);

    return csvpath;
  } catch (error) {
    throw new AppErrors('An error occurred creating csv file', 400);
  }
};
