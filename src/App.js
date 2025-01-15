import React from 'react';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";


export default function App() {
  const docs = [
    { uri: require('./e.pdf'), fileType: 'pdf', fileName: '证据链' },
    { uri: require('./a.pdf'), fileType: 'pdf', fileName: '自述书1.1' },
    { uri: require('./b.pdf'), fileType: 'pdf', fileName: '自述书en' },
  ]
  return (
    <div>文件名称：
      <DocViewer
        documents={docs}
        // initialActiveDocument={docs[1]}
        pluginRenderers={DocViewerRenderers}
        style={{ height: 1000 }}
      />
    </div>
  )
}
