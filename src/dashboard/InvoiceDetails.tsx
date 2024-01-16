import { useState, useEffect, useRef } from "react";
import InvoiceChart from "./InvoiceChart";
import "./styles/InvoiceDetails.css";

function DetailRow({ title, value }: { title: string; value: string }) {
    return (
        <div className="row">
            <div className="cell title">
                {title}
            </div>
            <div className="cell value">
                {value}
            </div>
        </div>
    );
}

function DetailTable({ details }: { details: { title: string; value: string }[] }) {
    return (
        <div className="table">
            {details.map((detail) => {
                return <DetailRow title={detail.title} value={detail.value} />;
            })}
        </div>
    );
}

function InvoiceDetails({selectedInvoice}: {selectedInvoice: {month: number, year: number}}) {

    return (
        <div className="generalDetails">
            {/* <div className="header">
                <div className="IDFactura">
                    <span>
                        ID Factura
                    </span>
                    {selectedInvoice.month}.{selectedInvoice.year}
                </div>
                <div className="status green">
                    <i className="ri-circle-fill"></i>
                    Plătită
                </div>
            </div> */}

            <InvoiceChart selectedInvoice={selectedInvoice} />

            <div className="grid">
                <div className="cell">
                    <span>
                        ID Factura
                    </span>
                    {selectedInvoice.month}.{selectedInvoice.year}
                </div>
                <div className="cell">
                    <span>
                        Status
                    </span>
                    <div className="status">
                        <div className="green">
                            Plătită
                        </div>
                    </div>
                </div>
                <div className="cell">
                    <span>
                        Emitere
                    </span>
                    12.12.2023
                </div>
                <div className="cell">
                    <span>
                        Scadentă
                    </span>
                    12.01.2024
                </div>
                <div className="cell">
                    <span>
                        Nr. Persoane
                    </span>
                    2
                </div>
                <div className="cell">
                    <span>
                        Suprafață Încălzită
                    </span>
                    <div>
                        60 mp
                    </div>
                </div>
                <div className="cell">
                    <span>
                        Penalizări
                    </span>
                    <div>
                        0.02% / zi
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default InvoiceDetails;