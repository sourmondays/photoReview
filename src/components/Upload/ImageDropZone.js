import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../../hooks/useUploadImage";

const ImageDropZone = ({ albumId }) => {
  const [uploadFile, setUploadFile] = useState(null);
  const [message, setMessage] = useState(null);
  const { error, isSuccess } = useUploadImage(uploadFile, albumId);

  useEffect(() => {
    if (error) {
      setMessage({
        error: true,
        text: error,
      });
    } else if (isSuccess) {
      setMessage({
        success: true,
        text: "Successfull upload.",
      });
      setUploadFile(null);
    } else {
      setMessage(null);
    }
  }, [error, isSuccess]);

  const onFilesDropped = useCallback((acceptedFiles) => {
    console.log("Oh my, some files!");
    if (acceptedFiles.lenght === 0) {
      return;
    }

    acceptedFiles.forEach((file) => {
      setUploadFile(file);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/png, image/jpeg, image/jpg",
    onDrop: onFilesDropped,
  });

  return (
    <>
      <div
        {...getRootProps()}
        id="dropzone"
        className={`${isDragAccept ? `drag-accept` : ``} ${
          isDragReject ? `drag-reject` : ``
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          isDragAccept ? (
            <p>Drop your file here!</p>
          ) : (
            <p>Can't accept file format.</p>
          )
        ) : (
          <p>Upload your file here!</p>
        )}
        {acceptedFiles && (
          <div className="accepted-files">
            <ul className="list">
              {acceptedFiles.map((file) => (
                <li className="text-file" key={file.name}>
                  <small>
                    {file.name} ({Math.round(file.size / 1024)} kb)
                  </small>
                </li>
              ))}
            </ul>
          </div>
        )}

        {message && (
          <p variant={message.error ? "warning" : "success"}>{message.text}</p>
        )}
      </div>
    </>
  );
};

export default ImageDropZone;
