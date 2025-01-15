import React from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

import pdfFile from './a.pdf'; // Importing the PDF file

const handleLoad=({numPages})=>{
  console.log(numPages);
}
const MyDocument = () => (
  <Document  file={pdfFile} onLoadSuccess={handleLoad}>
    <Page pageNumber={7}></Page>
  </Document>

);

export default MyDocument;
