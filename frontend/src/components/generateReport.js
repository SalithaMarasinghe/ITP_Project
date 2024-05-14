// In your ../components/generateReport.js file

import jsPDF from 'jspdf';
import 'jspdf-autotable';

// This function expects the 'products' array as input
export const generatePDF = (products) => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.text('Product Report', 14, 20);
  
    // Company Name
    doc.setFontSize(16);
    doc.text('BLACK', 14, 30);
  
    // Date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    doc.setFontSize(12);
    doc.text(`Date: ${formattedDate}`, 14, 40);

    // doc.setFontSize(12);
    // doc.text(`Search Keyword: ${searchTerm}`, 14, 50);
  
    // // Total Number of Products
    // const totalInquiries = filteredInquiries.length;
    // doc.text(`Total Inquiries: ${totalInquiries}`, 14, 60);

    const tableColumn = ["ID", "Name", "Category", "Brand", "Quantity", "Price"];  // Define the table columns
    const tableRows = products.map(product => [
        product._id,  // Ensure '_id' is the field from your product object
        product.name,
        product.category,
        product.brand,
        product.countInStock,
        product.price
    ]);

    doc.autoTable({
        startY: 50,  // Start position for the table after the title
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',  // Style of the table
        showHead: 'everyPage',  // Show headers on every page
        margin: { top: 30 }  // Top margin
    });

    doc.save('product-list.pdf');  // Save the generated PDF
};
