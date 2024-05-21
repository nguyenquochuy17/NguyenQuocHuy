  // interface WalletBalance should have property blockchain: string, because we access that property below
  interface WalletBalance {
    currency: string;
    amount: number; 
  }
  //No need to have this interface, only property formatted is added and the logic of it is simple
  interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
  }
  //Extends BoxProps but no property is added, recommend to use BoxProps, no need to create new interface Props
  interface Props extends BoxProps {
  
  }
  const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

      const getPriority = (blockchain: any): number => {    // add type for blockchain
        switch (blockchain) {
          case 'Osmosis':
            return 100
          case 'Ethereum':
            return 50
          case 'Arbitrum':
            return 30
          case 'Zilliqa':  // Zilliqa and Neo return the same value is 20, so should combine two case
            return 20
          case 'Neo':
            return 20
          default:
            return -99
        }
      }
  
    const sortedBalances = useMemo(() => {
      return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (lhsPriority > -99) {  // lhsPriority should change to balancePriority
               if (balance.amount <= 0) {  // I believe the amount should be >= 0
                 return true;
               }
            }
            return false
          }).sort((lhs: WalletBalance, rhs: WalletBalance) => {   //can write it more simply: sort(lhs,rhs => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
              return -1;
            } else if (rightPriority > leftPriority) {
              return 1;
            }
      });
    }, [balances, prices]);   // should remove prices, since it is not depend to this logic
  

    // I believe we would not need to map the sortedBalances to only add "formatted" property, because its logic is so simple and we only use it to pass down to WalletRow component.
    // Therefore, in WalletRow we can just directionally use field balance.amount instead
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
      return {
        ...balance,
        formatted: balance.amount.toFixed()
      }
    })
  

    //Could put it down the return. No need to create rows variable
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => { 
      const usdValue = prices[balance.currency] * balance.amount; 
      return (
        <WalletRow 
          className={classes.row}
          key={index}      // It is better to not use index as key, since we dont have unique id so could temporarily use index
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}  // Change to balance.amount.toFixed() since we remove formattedBalances
        />
      )
    })
  
    return (
      <div {...rest}>
        {rows}
      </div>
    )
  }