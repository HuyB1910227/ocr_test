import React, { useEffect, useState } from 'react';
import UploadTable from './UploadTable';
import DropFile from './DropFile';

const UploadFile = ({
    isCancelDisabled,
    isOkDisabled,
    setIsCancelDisabled,
    setIsOkDisabled,
}) => {
    const [files, setFiles] = useState([]);
    const [loadingFiles, setLoadingFiles] = useState([]);

    const onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
        const formData = new FormData();
        acceptedFiles.forEach((file, index) => {
            formData.append(`file`, file);
        });
        console.log(`formData:`, formData.getAll('file')[0].name);

        const initialFiles = acceptedFiles.map((file) => ({
            file,
            status: 'Uploading',
        }));
        setFiles(initialFiles);
        setIsCancelDisabled(true);
        setLoadingFiles(new Array(acceptedFiles.length).fill(true));
    };

    useEffect(() => {
        if (files.length > 0) {
            const interval = setInterval(() => {
                setFiles((prevFiles) =>
                    prevFiles.map((fileObj) => {
                        if (fileObj.status === 'Uploading') {
                            //radom status
                            const newStatus =
                                Math.random() > 0.5 ? 'New' : 'Error';
                            return { ...fileObj, status: newStatus };
                        }
                        return fileObj;
                    })
                );

                // have not uploading state
                setLoadingFiles((prevLoading) => {
                    const allDone = prevLoading.every(
                        (isLoading) => !isLoading
                    );
                    if (allDone) {
                        if (isCancelDisabled) {
                            setIsCancelDisabled(false);
                        }

                        if (isOkDisabled) {
                            setIsOkDisabled(false);
                        }
                        clearInterval(interval);
                    }
                    return prevLoading.map(() => false);
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [
        files,
        isCancelDisabled,
        isOkDisabled,
        setIsCancelDisabled,
        setIsOkDisabled,
    ]);

    return (
        <>
            <div className="p-4">
                {files.length === 0 ? (
                    <DropFile onDrop={onDrop} />
                ) : (
                    <UploadTable data={files} />
                )}
            </div>
        </>
    );
};

export default UploadFile;
