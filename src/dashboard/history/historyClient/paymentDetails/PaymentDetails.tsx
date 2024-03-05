import InvoiceDetails from "@/data/invoiceDetails.json";
import "./PaymentDetails.scss";

function DetailRow({ row, className }: { row: any[], className?: string }) {
    if (!className) {
        className = "row";
    } else {
        className += " row";
    }

    return (
        <div className={className}>
            {row.map((element, index) => {
                var cName = "cell";
                if (index === 0) {
                    cName += " first";
                } else if (index === 1) {
                    cName += " second";
                } else if (index === row.length - 1) {
                    cName += " last";
                }
                
                return (
                    <div className={cName} key={index}>
                        {element}
                    </div>
                );
            })}
        </div>
    );
}

function DetailTable({ header, data }: { header: any[], data: any[][] }) {
    return (
        <div className="table">
            <DetailRow row={header} className="header even" />
            {data.map((row, index) => {
                return <DetailRow key={index} row={row} className={
                    ( index % 2 !== 0 ? "even" : "" )
                } />;
            })}
        </div>
    );
}

// function PaymentDetails({selectedInvoice}: {selectedInvoice: {month: number, year: number}}) {
function PaymentDetails() {
    return (
        <div className="paymentDetails">
            <div className="columns">
                <DetailTable header={InvoiceDetails.columns} data={InvoiceDetails.data} />
            </div>
        </div>
    );
}

export default PaymentDetails;
