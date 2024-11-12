import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import myPdf from '/pdf/Bank of America CC.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { pdfjs } from 'react-pdf';
import {
    LeftOutlined,
    RightOutlined,
    UndoOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const PDFViewer = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        // Set initial container width
        if (containerRef.current) {
            setContainerWidth(containerRef.current.offsetWidth);
        }

        // Update width on window resize
        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };

        // window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const nextPage = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    };

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };

    return (
        <div className="pdf-view w-full max-w-full" ref={containerRef}>
            <TransformWrapper defaultScale={1}>
                {({ zoomIn, zoomOut, resetTransform }) => (
                    <>
                        <div className="flex justify-between">
                            <div className="file-action mb-2">
                                <button
                                    className="py-1 px-3 bg-white border border-gray-300 rounded-md text-xs"
                                    onClick={prevPage}
                                    disabled={pageNumber <= 1}
                                >
                                    <LeftOutlined />
                                </button>
                                <span className="mx-2 text-sm text-gray-500">
                                    {pageNumber} of {numPages}{' '}
                                </span>
                                <button
                                    className="py-1 px-3 bg-white border border-gray-300 rounded-md text-xs"
                                    onClick={nextPage}
                                    disabled={pageNumber >= numPages}
                                >
                                    <RightOutlined />
                                </button>
                            </div>
                            <div className="zoom-controls mb-2 flex justify-center space-x-2">
                                <button
                                    className="py-1 px-3 bg-white border border-gray-300 rounded-md text-xs"
                                    onClick={() => zoomIn()}
                                >
                                    <ZoomInOutlined />
                                </button>
                                <button
                                    className="py-1 px-3 bg-white border border-gray-300 rounded-md text-xs"
                                    onClick={() => resetTransform()}
                                >
                                    <UndoOutlined />
                                </button>
                                <button
                                    className="py-1 px-3 bg-white border border-gray-300 rounded-md text-xs"
                                    onClick={() => zoomOut()}
                                >
                                    <ZoomOutOutlined />
                                </button>
                            </div>
                        </div>
                        <TransformComponent>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                }}
                            >
                                <Document
                                    file={myPdf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        width={containerWidth}
                                    />
                                </Document>
                            </div>
                        </TransformComponent>
                    </>
                )}
            </TransformWrapper>
        </div>
    );
};

export default PDFViewer;
