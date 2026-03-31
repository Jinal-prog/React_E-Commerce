import React, { useMemo, useState } from "react";
import { Footer, Navbar } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/action";

const SHIPPING_CHARGE = 30;
const DUMMY_UPI_ID = "greennursery@upi";

const formatAmount = (value) => `Rs. ${Math.round(value)}`;

const createOrderId = () => `ORD${Date.now().toString().slice(-8)}`;

const createTransactionId = () => {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `TXN${Date.now().toString().slice(-6)}${random}`;
};

const normalizeAscii = (value) => String(value).replace(/[^\x20-\x7E]/g, "");

const escapePdfText = (value) =>
  normalizeAscii(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

const buildPdfDocument = (lines) => {
  const safeLines = lines.map((line) => escapePdfText(line));
  const contentCommands = ["BT", "/F1 12 Tf", "40 800 Td"];

  safeLines.forEach((line, index) => {
    if (index > 0) {
      contentCommands.push("0 -16 Td");
    }
    contentCommands.push(`(${line}) Tj`);
  });

  contentCommands.push("ET");
  const contentStream = contentCommands.join("\n");

  const objects = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>\nendobj\n",
    `4 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((objectValue) => {
    offsets.push(pdf.length);
    pdf += objectValue;
  });

  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let index = 1; index <= objects.length; index += 1) {
    pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  return pdf;
};

const downloadInvoicePdf = (order) => {
  const invoiceDate = new Date(order.orderedAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const lines = [
    "Green Nursery Invoice",
    "----------------------------------------------",
    `Order ID: ${order.orderId}`,
    `Transaction ID: ${order.transactionId}`,
    `Date: ${invoiceDate}`,
    `Payment: UPI (Dummy)`,
    `UPI ID: ${order.upiId}`,
    `UPI Name: ${order.upiName}`,
    "----------------------------------------------",
    `Customer: ${order.billing.firstName} ${order.billing.lastName}`,
    `Email: ${order.billing.email}`,
    `Address: ${order.billing.address} ${order.billing.address2}`.trim(),
    `${order.billing.city}, ${order.billing.state} ${order.billing.zip}, ${order.billing.country}`,
    "----------------------------------------------",
    "Items:",
    ...order.items.map(
      (item, index) =>
        `${index + 1}. ${item.title} | Qty: ${item.qty} | Price: Rs. ${Math.round(
          item.price
        )} | Total: Rs. ${Math.round(item.price * item.qty)}`
    ),
    "----------------------------------------------",
    `Subtotal: Rs. ${Math.round(order.subtotal)}`,
    `Shipping: Rs. ${Math.round(order.shippingCharge)}`,
    `Grand Total: Rs. ${Math.round(order.totalAmount)}`,
    "----------------------------------------------",
    "This is a system-generated dummy invoice.",
  ];

  const pdf = buildPdfDocument(lines);
  const blob = new Blob([pdf], { type: "application/pdf" });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = `invoice-${order.orderId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
};

const validateBillingDetails = (details) => {
  const errors = {};
  const requiredLabels = {
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    address: "Address",
    country: "Country",
    state: "State",
    city: "City",
    zip: "Zip code",
  };

  Object.keys(requiredLabels).forEach((fieldName) => {
    if (!details[fieldName].trim()) {
      errors[fieldName] = `${requiredLabels[fieldName]} is required`;
    }
  });

  if (details.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (details.zip && !/^\d{5,6}$/.test(details.zip.trim())) {
    errors.zip = "Zip code should be 5 or 6 digits";
  }

  return errors;
};

const validateUpiName = (upiName) => {
  const value = upiName.trim();

  if (!value) {
    return "UPI name is required";
  }

  if (value.length < 3) {
    return "UPI name should be at least 3 characters";
  }

  if (!/^[a-zA-Z ]+$/.test(value)) {
    return "UPI name should contain only letters and spaces";
  }

  return "";
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    address2: "",
    country: "India",
    state: "",
    city: "",
    zip: "",
  });
  const [upiName, setUpiName] = useState("");
  const [isUpiVerified, setIsUpiVerified] = useState(false);
  const [isVerifyingUpi, setIsVerifyingUpi] = useState(false);
  const [upiVerificationMessage, setUpiVerificationMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [invoiceMessage, setInvoiceMessage] = useState("");

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce(
      (accumulator, item) => accumulator + item.price * item.qty,
      0
    );
    const totalItems = cartItems.reduce(
      (accumulator, item) => accumulator + item.qty,
      0
    );
    const totalAmount = subtotal + SHIPPING_CHARGE;
    return { subtotal, totalItems, totalAmount };
  }, [cartItems]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setBillingDetails((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleUpiNameChange = (event) => {
    const { value } = event.target;
    setUpiName(value);
    setIsUpiVerified(false);
    setUpiVerificationMessage("");

    if (errors.upiName) {
      setErrors((previous) => ({ ...previous, upiName: "" }));
    }
  };

  const handleVerifyUpiName = () => {
    const upiNameError = validateUpiName(upiName);

    if (upiNameError) {
      setErrors((previous) => ({ ...previous, upiName: upiNameError }));
      setIsUpiVerified(false);
      return;
    }

    setIsVerifyingUpi(true);
    setUpiVerificationMessage("");

    window.setTimeout(() => {
      setIsVerifyingUpi(false);
      setIsUpiVerified(true);
      setErrors((previous) => ({ ...previous, upiName: "" }));
      setUpiVerificationMessage("UPI name verified successfully (dummy).");
    }, 1000);
  };

  const handleDummyPayment = (event) => {
    event.preventDefault();

    const validationErrors = validateBillingDetails(billingDetails);
    const upiNameError = validateUpiName(upiName);

    if (upiNameError) {
      validationErrors.upiName = upiNameError;
    }

    if (!isUpiVerified) {
      validationErrors.upiName = "Please verify UPI name before payment";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderData = {
      orderId: createOrderId(),
      transactionId: createTransactionId(),
      orderedAt: new Date().toISOString(),
      billing: { ...billingDetails },
      upiName: upiName.trim(),
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        qty: item.qty,
        price: item.price,
      })),
      subtotal: totals.subtotal,
      shippingCharge: SHIPPING_CHARGE,
      totalAmount: totals.totalAmount,
      totalItems: totals.totalItems,
      upiId: DUMMY_UPI_ID,
    };

    setIsProcessing(true);
    setInvoiceMessage("");

    window.setTimeout(() => {
      downloadInvoicePdf(orderData);
      dispatch(clearCart());
      setCompletedOrder(orderData);
      setInvoiceMessage(
        "Invoice PDF downloaded. Dummy payment marked successful."
      );
      setIsProcessing(false);
    }, 1200);
  };

  const downloadInvoiceAgain = () => {
    if (!completedOrder) {
      return;
    }
    downloadInvoicePdf(completedOrder);
    setInvoiceMessage("Invoice PDF downloaded again.");
  };

  const renderEmptyCart = () => (
    <div className="container">
      <div className="row">
        <div
          className="col-md-12 py-5 text-center"
          style={{ backgroundColor: "var(--bg-light)", borderRadius: "15px" }}
        >
          <i
            className="fa fa-shopping-cart fa-5x mb-4"
            style={{ color: "var(--accent-green)" }}
          ></i>
          <h4 className="p-3 display-5" style={{ color: "var(--primary-green)" }}>
            No Items in Cart
          </h4>
          <p className="lead text-muted mb-4">
            Your cart is empty. Add plants to proceed to checkout.
          </p>
          <Link to="/product" className="btn btn-nature">
            <i className="fa fa-leaf me-2"></i> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const renderPaymentSuccess = () => (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card card-custom">
            <div
              className="card-header py-3 text-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)",
                color: "white",
              }}
            >
              <h4 className="mb-0">
                <i className="fa fa-check-circle me-2"></i>Dummy Payment Successful
              </h4>
            </div>
            <div className="card-body p-4">
              <p className="mb-3 text-muted">
                Payment status is shown after invoice PDF download.
              </p>
              <ul className="list-group mb-4">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Order ID</span>
                  <strong>{completedOrder.orderId}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Transaction ID</span>
                  <strong>{completedOrder.transactionId}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>UPI Name</span>
                  <strong>{completedOrder.upiName}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Paid</span>
                  <strong>{formatAmount(completedOrder.totalAmount)}</strong>
                </li>
              </ul>

              {invoiceMessage && (
                <div className="alert alert-success py-2" role="alert">
                  {invoiceMessage}
                </div>
              )}

              <div className="d-flex flex-wrap gap-2">
                <button className="btn btn-nature" onClick={downloadInvoiceAgain}>
                  <i className="fa fa-download me-2"></i>Download Invoice PDF Again
                </button>
                <Link className="btn btn-outline-nature" to="/product">
                  <i className="fa fa-leaf me-2"></i>Continue Shopping
                </Link>
                <Link className="btn btn-outline-nature" to="/cart">
                  <i className="fa fa-shopping-cart me-2"></i>View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCheckoutForm = () => (
    <div className="container py-5">
      <div className="row my-4">
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card mb-4 card-custom">
            <div
              className="card-header py-3"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)",
                color: "white",
              }}
            >
              <h5 className="mb-0">
                <i className="fa fa-receipt me-2"></i>Order Summary
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Products ({totals.totalItems})
                  <span>{formatAmount(totals.subtotal)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>{formatAmount(SHIPPING_CHARGE)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total amount</strong>
                  </div>
                  <span>
                    <strong>{formatAmount(totals.totalAmount)}</strong>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-7 col-lg-8">
          <div className="card mb-4 card-custom">
            <div
              className="card-header py-3"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-green) 0%, var(--secondary-green) 100%)",
                color: "white",
              }}
            >
              <h4 className="mb-0">
                <i className="fa fa-address-card me-2"></i>Billing and UPI Payment
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleDummyPayment} noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      id="firstName"
                      name="firstName"
                      value={billingDetails.firstName}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                    <div className="invalid-feedback">{errors.firstName}</div>
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      id="lastName"
                      name="lastName"
                      value={billingDetails.lastName}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                    <div className="invalid-feedback">{errors.lastName}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={billingDetails.email}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      id="address"
                      name="address"
                      placeholder="1234 Main St"
                      value={billingDetails.address}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                    <div className="invalid-feedback">{errors.address}</div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address2" className="form-label">
                      Address 2 <span className="text-muted">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address2"
                      name="address2"
                      placeholder="Apartment or suite"
                      value={billingDetails.address2}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <select
                      className={`form-select ${errors.country ? "is-invalid" : ""}`}
                      id="country"
                      name="country"
                      value={billingDetails.country}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    >
                      <option value="">Choose...</option>
                      <option value="India">India</option>
                    </select>
                    <div className="invalid-feedback">{errors.country}</div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      className={`form-select ${errors.state ? "is-invalid" : ""}`}
                      id="state"
                      name="state"
                      value={billingDetails.state}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    >
                      <option value="">Choose...</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                    </select>
                    <div className="invalid-feedback">{errors.state}</div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <select
                      className={`form-select ${errors.city ? "is-invalid" : ""}`}
                      id="city"
                      name="city"
                      value={billingDetails.city}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    >
                      <option value="">Choose...</option>
                      <option value="Valsad">Valsad</option>
                      <option value="Surat">Surat</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                    </select>
                    <div className="invalid-feedback">{errors.city}</div>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                      id="zip"
                      name="zip"
                      value={billingDetails.zip}
                      onChange={handleFieldChange}
                      disabled={isProcessing}
                    />
                    <div className="invalid-feedback">{errors.zip}</div>
                  </div>
                </div>

                <hr className="my-4" />

                <h5 className="mb-3">Payment Method: UPI (Dummy)</h5>
                <div
                  className="p-3 rounded-3 mb-3"
                  style={{
                    backgroundColor: "var(--bg-light)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <p className="mb-3">
                    <strong>UPI ID:</strong> {DUMMY_UPI_ID}
                  </p>
                  <div className="row g-2 align-items-end">
                    <div className="col-sm-8">
                      <label htmlFor="upiName" className="form-label">
                        Enter UPI Name
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.upiName ? "is-invalid" : ""}`}
                        id="upiName"
                        name="upiName"
                        value={upiName}
                        onChange={handleUpiNameChange}
                        disabled={isProcessing || isVerifyingUpi}
                        placeholder="Example: Rahul Sharma"
                      />
                      <div className="invalid-feedback">{errors.upiName}</div>
                    </div>
                    <div className="col-sm-4">
                      <button
                        className="btn btn-outline-nature w-100"
                        type="button"
                        onClick={handleVerifyUpiName}
                        disabled={isProcessing || isVerifyingUpi}
                        style={{
                          color: "var(--secondary-green)",
                          borderColor: "var(--secondary-green)",
                        }}
                      >
                        {isVerifyingUpi ? "Verifying..." : "Verify UPI Name"}
                      </button>
                    </div>
                  </div>

                  {isUpiVerified && !errors.upiName && (
                    <div className="alert alert-success py-2 mt-3 mb-0" role="alert">
                      {upiVerificationMessage}
                    </div>
                  )}

                  {!isUpiVerified && !errors.upiName && upiVerificationMessage && (
                    <div className="alert alert-warning py-2 mt-3 mb-0" role="alert">
                      {upiVerificationMessage}
                    </div>
                  )}
                </div>

                <button
                  className="w-100 btn btn-nature"
                  type="submit"
                  disabled={isProcessing || !isUpiVerified}
                >
                  {isProcessing ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing dummy payment...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-check-circle me-2"></i>
                      Pay and Download Invoice PDF
                    </>
                  )}
                </button>
                {!isUpiVerified && (
                  <small className="text-muted d-block mt-2">
                    Verify UPI name to enable payment.
                  </small>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center page-header" style={{ color: "var(--primary-green)" }}>
          <i className="fa fa-credit-card me-3"></i>Checkout
        </h1>
        <p className="text-center text-muted">Complete your order details</p>
        <hr style={{ borderColor: "var(--light-green)", borderWidth: "2px" }} />
        {completedOrder
          ? renderPaymentSuccess()
          : cartItems.length
          ? renderCheckoutForm()
          : renderEmptyCart()}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
