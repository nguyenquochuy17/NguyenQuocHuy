  interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
  }
 
  const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();
  
      const getPriority = (blockchain: string): number => {
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (balancePriority > -99) {
               if (balance.amount >= 0) {
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
    }, [balances]);
    
 
    return (
      <div {...rest}>
        {sortedBalances.map((balance: WalletBalance, index: number) => { 
            const usdValue = prices[balance.currency] * balance.amount; 
            return (
            <WalletRow 
                className={classes.row}
                key={index}     
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.amount.toFixed()}
            />
            )
        })}
      </div>
    )
  }