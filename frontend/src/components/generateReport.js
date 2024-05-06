// In your ../components/generateReport.js file

import jsPDF from 'jspdf';
import 'jspdf-autotable';

// This function expects the 'products' array as input
export const generatePDF = (products) => {
    const doc = new jsPDF();

    doc.text('Product List', 14, 16);  // Title for the PDF

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
        startY: 22,  // Start position for the table after the title
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',  // Style of the table
        showHead: 'everyPage',  // Show headers on every page
        margin: { top: 30 }  // Top margin
    });

    doc.save('product-list.pdf');  // Save the generated PDF
};
