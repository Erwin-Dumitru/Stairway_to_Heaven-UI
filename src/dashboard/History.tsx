import "./styles/History.css";
import MonthSelector from "./MonthSelector";
import Invoices from "../data/invoiceHistory.json";
import InvoiceDetails from "./InvoiceDetails";
import PaymentDetails from "./PaymentDetails";
import { useState } from "react";


function History({currentAddress}: {currentAddress: string}) {
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
        <div className="history">
            <div className="monthSelector">
                <div className="subsectionTitle">
                    <h2>Factura</h2>
                </div>

                {renderMonthSelector()}
            </div>

            <div className="details">
                <InvoiceDetails selectedInvoice={selectedInvoice} />
                <PaymentDetails selectedInvoice={selectedInvoice} />
            </div>
        </div>
    );
};

export default History;
