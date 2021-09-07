class App extends React.Component {
  render () {
    return (
      <div className="container flex flex-col min-h-screen p-10">
        <h1 className="doc_title text-center underline text-2xl my-5"> {label.title} </h1>
        <div className="header my-5">
          <div className="flex justify-between w-auto">
            <div>
              <Partner
                zip={partner.zip}
                address_1={partner.address_1}
                address_2={partner.address_2}
                name={partner.name}
                title={partner.title}
                />
              <p className="mt-3">
                <span className="title"> {period.year}年{period.month}月度 </span>
              </p>
              <pre className="font-sans">{label.description}</pre>
            </div>
            <div>
              <You
                zip={you.zip}
                address_1={you.address_1}
                address_2={you.address_2}
                name={you.name}
                tel={you.tel}
                mail={you.mail}
                />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 justify-items-center flex-grow mt-10">
          <Statements
            rows={rows}
            totalLabel={label.statements.total}
            dateLabel={label.statements.date}
            date={today}
            />
        </div>
        <div className="footer">
          <BankInfo
            bank={bank}
            />
          <Message
            label='その他'
            body={message}
            />
        </div>
      </div>
    )
  }
}

class Partner extends React.Component {
  static defaultProps = {
    zip: null,
    address_1: null,
    address_2: null,
    name: null,
    title: '御中',
  }
  render () {
    const zip = this.props.zip
    const address_1 = this.props.address_1
    const address_2 = this.props.address_2
    const name = this.props.name
    const title = this.props.title

    const safe = !!name
    return (
      <div className={safe ? '' : 'text-red-500'}>
        {zip &&
        <p> 〒 <span className="to_zip"> {zip} </span> </p>
          }
        {address_1 &&
        <React.Fragment>
          <p> <span className="to_address_1"> {address_1} </span> </p>
          <p> <span className="to_address_2"> {address_2} </span> </p>
        </React.Fragment>
          }
        <p className="text-medium font-bold border-b-2"> <span className="to_name"> {name} </span> {title} </p>
      </div>
    )
  }
}

class You extends React.Component {
  static defaultProps = {
    zip: null,
    address_1: null,
    address_2: null,
    tel: null,
    mail: null,
    name: null,
  }
  render () {
    const zip = this.props.zip
    const address_1 = this.props.address_1
    const address_2 = this.props.address_2
    const tel = this.props.tel
    const mail = this.props.mail
    const name = this.props.name

    const safe = zip && address_1 && tel && name

    return (
      <div className={safe ? '' : 'text-red-500'}>
        <p> 〒 <span className="from_zip"> {zip} </span> </p>
        <p>  {address_1}  </p>
        <p>  {address_2}  </p>
        <p> TEL:  {tel}  </p>
        <p> Email:  {mail}  </p>
        <p className="my-3 text-medium">  {name}  </p>
      </div>
      )
  }

}

class Statements extends React.Component {
  static defaultProps = {
      rows: [],

      totalLabel: null,
      dateLabel: null,
      date: null,

      subTotal: null,
      taxAmount: null,
      withholdingTaxAmount: null,
      total: null
    }

  rowTotal = row => row.quantity * row.price
  subTotal = rows => rows.reduce((sum, v) => sum + v.total, 0)
  taxAmount = (subTotal, taxRate) => Math.floor(subTotal * taxRate / 100)
  withholdingTaxRate = (subTotal) => subTotal < 1000000 ? 10.21 : 20.42
  withholdingTaxAmount = (subTotal, withholdingTaxRate) => Math.floor(subTotal * withholdingTaxRate / 100)
  total = (subTotal, taxAmount, withholdingTaxAmount) => subTotal + taxAmount - withholdingTaxAmount

  render () {
    const totalLabel = this.props.totalLabel
    const dateLabel = this.props.dateLabel
    const date = this.props.date
    const rows = this.props.rows.map(v => {
      v.total = this.rowTotal(v)
      return v
      })
    const taxRate = 10

    const subTotal = this.subTotal(rows)
    const taxAmount = this.taxAmount(subTotal, taxRate)
    const withholdingTaxRate =  this.withholdingTaxRate(subTotal)
    const withholdingTaxAmount = this.withholdingTaxAmount(subTotal, withholdingTaxRate)
    const total = this.total(subTotal, taxAmount, withholdingTaxAmount)

    return (
      <React.Fragment>
        <div className="flex justify-between w-auto w-10/12 mx-auto mb-5 ">
          <p className="text-xl font-bold"> {totalLabel} ￥ <span className="amount"> {total.toLocaleString()} </span> </p>
          <p> {dateLabel} <span className="date"> {date} </span></p>
        </div>

        <Item rows={rows}/>

        <div className="w-10/12 mx-auto mt-3 flex justify-end">
          <Total
            subTotal={subTotal}
            taxRate={taxRate}
            taxAmount={taxAmount}
            withholdingTaxRate={withholdingTaxRate}
            withholdingTaxAmount={withholdingTaxAmount}
            total={total}
            />
        </div>
      </React.Fragment>
    )
  }
}

class Item extends React.Component {
  static defaultProps = { rows: [] }

  render () {
    const rows = this.props.rows
    const rowClass = 'border text-center w-3/6 p-1'
    return (
      <table className="table-fixed w-10/12 mx-auto">
        <thead className="">
          <tr className="bg-gray-200">
            <td className={rowClass}> 品目 </td>
            <td className={rowClass}> 数量 </td>
            <td className={rowClass}> 単価 </td>
            <td className={rowClass}> 小計 </td>
          </tr>
        </thead>
        <tbody className="rows">
          {rows.map((v, i) =>
            <tr className="" key={i}>
              <td className={rowClass}> <pre className="font-sans">{v.label}</pre> </td>

              <td className={rowClass}> {v.quantity.toLocaleString()} </td>
              <td className={rowClass}> {v.price.toLocaleString()} </td>
              <td className={rowClass}> {v.total.toLocaleString()} </td>
            </tr>
            )}
        </tbody>
      </table>
    )
  }
}

class Total extends React.Component {
  render () {
    const subTotal = this.props.subTotal
    const taxRate = this.props.taxRate
    const taxAmount = this.props.taxAmount
    const withholdingTaxRate = this.props.withholdingTaxRate
    const withholdingTaxAmount = this.props.withholdingTaxAmount
    const total = this.props.total

    return (
      <table className="table-fixed w-1/2">
        <tbody>
          <tr>
            <td className="w-2/3 border bg-gray-200 text-center p-1"> 小計 </td>
            <td className="w-1/3 border text-right p-1"> {subTotal.toLocaleString()} </td>
          </tr>
          <tr>
            <td className="w-2/3 border bg-gray-200 text-center p-1"> 消費税( {taxRate} %) </td>
            <td className="w-1/3 border text-right p-1"> {taxAmount.toLocaleString()} </td>
          </tr>
          {withholdingTaxRate &&
          <tr>
            <td className="w-2/3 border bg-gray-200 text-center p-1"> 源泉徴収( {withholdingTaxRate.toLocaleString()} %) </td>
            <td className="w-1/3 border text-right p-1"> - {withholdingTaxAmount.toLocaleString()} </td>
          </tr>
          }
          <tr>
            <td className="w-2/3 border bg-gray-200 text-center p-1"> 合計 </td>
            <td className="w-1/3 border text-right p-1"> {total.toLocaleString()} </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

class BankInfo extends React.Component {
  static defaultProps = {
    label: 'お振込先',
    bank: {
      name: null,
      code: null,
      branch: {
        name: null,
        code: null,
        },
      account: {
        type: null,
        name: null,
        code: null,
        },
      },
    }
  render () {
    const label = this.props.label
    const bank = {
      name: this.props.bank.name,
      code: this.props.bank.code,
      branch: {
        name: this.props.bank.branch.name,
        code: this.props.bank.branch.code,
        },
      account: {
        type: this.props.bank.account.type,
        name: this.props.bank.account.name,
        code: this.props.bank.account.code,
        },
      }
    const provision = this.props.bank.account.provision
    const safe = bank.name && bank.code && bank.branch.name && bank.branch.code && bank.account.type &&  bank.account.name && bank.account.code
    return (
      <React.Fragment>
          <h5 className="font-bold w-full"> {label} </h5>
          <div className={'border-2 p-3 w-3/5 ' + (safe ? '' : 'text-red-500')}>
            <p>
               {bank.name} ( {bank.code} )
               {bank.branch.name} ( {bank.branch.code} )
            </p>
            <p>
              ( {bank.account.type} ) {bank.account.code}
              <span className="ml-5"> {bank.account.name} </span>
            </p>
          </div>
          {provision &&
          <p className="my-2 pl-5"> {provision} </p>
          }
      </React.Fragment>
    )}
}

class Message extends React.Component {
  static defaultProps = {
    label: 'その他',
    body: '-',
    }
  render () {
    const label = this.props.label
    const body = this.props.body
    return (
      <React.Fragment>
        <h5 className="font-bold w-full mt-5"> {label} </h5>
        <div className="border-2 p-3"> <pre className="font-sans">{body}</pre> </div>
      </React.Fragment>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))