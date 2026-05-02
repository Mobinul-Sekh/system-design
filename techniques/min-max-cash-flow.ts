interface Transaction {
  from: string;
  to: string;
  amount: number;
}

function getTopCreditorAndTopDebtor(records: Record<string, number>): {
  topCreditor: string | null;
  topDebtor: string | null;
} {
  let topCreditor: string | null = null,
    topDebtor: string | null = null;
  let maxSpend = 0,
    maxDue = 0;

  for (const [person, balance] of Object.entries(records)) {
    // person with most negetive value will be top creditor.
    if (balance > maxSpend) {
      maxSpend = balance;
      topCreditor = person;
    }
    // person with most positive value will be top debtor.
    if (balance < maxDue) {
      maxDue = balance;
      topDebtor = person;
    }
  }

  return { topCreditor, topDebtor };
}

function simplifyDebts(transactions: Transaction[]): Transaction[] {
  // calculate net balances of all the members
  const netBalances: Record<string, number> = {};

  transactions.forEach((transaction) => {
    const { from, to, amount } = transaction;
    // substracting amount from the creditor as he/she owed money.
    netBalances[from] = (netBalances[from] || 0) - amount;
    // adding amount as they own that much money to the group.
    netBalances[to] = (netBalances[to] || 0) + amount;
  });

  const optimizedTransactions: Transaction[] = [];

  while (true) {
    const { topCreditor, topDebtor } = getTopCreditorAndTopDebtor(netBalances);

    // if every thing is settled then break the loop.
    if (
      !topCreditor ||
      !topDebtor ||
      netBalances[topCreditor] === 0 ||
      netBalances[topDebtor] === 0
    )
      break;

    // settling amount
    const settleAmount = Math.min(
      netBalances[topCreditor],
      Math.abs(netBalances[topDebtor]),
    );

    optimizedTransactions.push({
      from: topDebtor,
      to: topCreditor,
      amount: settleAmount,
    });

    // update the net balance
    netBalances[topCreditor] -= settleAmount;
    netBalances[topDebtor] += settleAmount;

    // remove from memory when settle, good practice.
    if (netBalances[topCreditor] === 0) delete netBalances[topCreditor];
    if (netBalances[topDebtor] === 0) delete netBalances[topDebtor];
  }

  return optimizedTransactions;
}

// Demonstration
const originalTransactions: Transaction[] = [
  { from: "Alice", to: "Bob", amount: 50 },
  { from: "Bob", to: "Charlie", amount: 40 },
  { from: "Charlie", to: "Alice", amount: 20 },
];

console.log("Original Transactions:", originalTransactions.length);

const simplified = simplifyDebts(originalTransactions);

console.log("Optimized Transactions:", simplified.length);
console.log(simplified);
