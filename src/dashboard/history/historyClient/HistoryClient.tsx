import MonthSelector from "./monthSelector/MonthSelector";
import Invoices from "@/data/invoiceHistory.json";
import InvoiceDetails from "./invoiceDetails/InvoiceDetails";
import PaymentDetails from "./paymentDetails/PaymentDetails";
import { useState } from "react";
import "./HistoryClient.scss";

function HistoryClient() {
    const invoices: typeof Invoices = Invoices;
    const [selectedInvoice, setSelectedInvoice] = useState({
        month: invoices[0].months[0].month,
        year: invoices[0].year
    });

    function renderMonthSelector() {
        return (
            <div className="subsectionContent dateContent">
                {
                    invoices.map((invoice, index) => {
                        let tMonths: number[] = [];
                        invoice.months.forEach((e) => {
                            tMonths.push(e.month);
                        });
                        
                        return (
                            <MonthSelector 
                                key={index}
                                year={invoice.year.toString()}
                                months={tMonths}
                                selectedInvoice={selectedInvoice}
                                setSelectedInvoice={setSelectedInvoice}
                            />
                        );
                    })
                }
            </div>
        );
    }

    return (
        <div className="history dashboard-page dashboard-container">
            <div className="dashboard-left"> {/* monthSelector */}
                <div className="subsectionTitle">
                    <h2>Factura</h2>
                </div>

                { renderMonthSelector() }
            </div>

            <div className="dashboard-right-row"> {/* details */}
                <InvoiceDetails selectedInvoice={selectedInvoice} />
                {/* <PaymentDetails selectedInvoice={selectedInvoice} /> */}
                <PaymentDetails />
            </div>
        </div>
    );
};

export default HistoryClient;
