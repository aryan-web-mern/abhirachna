import React, { useEffect, useState } from "react";
import styles from "./UploadedFiles.module.css";
import ProfileNavbar from "../ProfileNavbar/ProfileNavbar";
import folderImg from "../../../assets/profile/folder.svg";
import linkImg from "../../../assets/profile/link.svg";
import image from "../../../assets/profile/image.svg";
import user from "../../../assets/profile/user.svg";
import arrow from "../../../assets/profile/arrow.svg";

import { useNavigate, useParams } from "react-router-dom";
import { customFilesData } from "../../../utils/constantData";
import {
  fetchFolderFiles,
  fetchLeadFolders,
  fetchLeadImages,
  fetchLeadLinks,
} from "../../../services/profileService";
import { getErrorMessage } from "../../../utils/errorHandler";
import { getMediaUrl } from "../../../utils/functions";

const UploadedFiles = () => {
  const [selected, setSelected] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const [folders, setFolders] = useState([]);
  const [folderFiles, setFolderFiles] = useState([]);
  const [links, setLinks] = useState([]);
  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filesData, setFilesData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    setFilesData(customFilesData);
  }, []);

  const handleFolderSelect = async () => {
    if (selected === 0) {
      setSelected(null);
      return;
    }
    setSelected(0);
    try {
      setLoading(true);
      const response = await fetchLeadFolders(id);
      if (response.success) {
        setFolders(response?.data);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLinkSelect = async () => {
    if (selected === 1) {
      setSelected(null);

      return;
    }
    setSelected(1);

    try {
      setLoading(true);
      const response = await fetchLeadLinks(id);
      if (response.success) {
        console.log(response?.data);

        setLinks(response?.data);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = async () => {
    if (selected === 2) {
      setSelected(null);
      return;
    }
    setSelected(2);
    try {
      setLoading(true);
      const response = await fetchLeadImages(id);
      if (response.success) {
        console.log(response?.data);

        setImages(response?.data);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleShowFolderFiles = async (folderId) => {
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
      return;
    }

    setSelectedFolder(folderId);

    try {
      setLoading(true);
      const response = await fetchFolderFiles(id, folderId);
      if (response.success) {
        setFolderFiles(response?.data);
      }
    } catch (error) {
      setError(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  function handleShowImage(url) {
    window.open(getMediaUrl(url), "_blank");
  }

  function handleShowDoc(url) {
    window.open(getMediaUrl(url), "_blank");
  }

  return (
    <div className={styles.mainContainer}>
      <ProfileNavbar
        name={"Upload Files"}
        handleClick={() => navigate("/profile/generated-leads/" + id)}
      />

      <div className={styles.secondaryContainer}>
        {/* Drives Folder */}
        <div className={styles.sectionsContainer}>
          <div
            className={`${styles.drivesContainer} ${
              selected === 0 ? styles.selected : ""
            }`}
            onClick={() => handleFolderSelect()}
          >
            <img src={folderImg} alt="folder" />
            <p>Drives</p>
          </div>

          {/* Folders */}
          {selected === 0 &&
            folders?.map((folder) => (
              <React.Fragment key={folder._id}>
                {/* Folder */}
                <div
                  className={`${styles.folder} ${
                    selectedFolder === folder._id ? styles.selected : ""
                  }`}
                  onClick={() => handleShowFolderFiles(folder._id)}
                >
                  <div className={styles.linkLeft}>
                    <img src={folderImg} alt="folder" />
                    <p className={styles.folderText}>{folder.folderName}</p>
                  </div>
                  <div
                    className={`${styles.arrow} ${
                      selectedFolder === folder._id ? styles.selected : ""
                    }`}
                  >
                    <img src={arrow} alt="arrow" />
                  </div>
                </div>

                {/* Folders Files */}
                {selectedFolder === folder._id &&
                  folderFiles?.map((file) => (
                    <div className={styles.links} key={file._id}>
                      <div
                        className={styles.link}
                        onClick={() => {
                          handleShowImage(file.fileName);
                        }}
                      >
                        <div className={styles.linkLeft}>
                          <img src={image} alt="file" />
                          <p className={styles.fileText}>
                            {file.fileOriginalName.length > 40
                              ? file.fileOriginalName.slice(0, 40) + "..."
                              : file.fileOriginalName}
                          </p>
                        </div>
                        <div className={styles.imgDateTime}>
                          <div className={styles.linkDate}>{file?.date}</div>
                          <div className={styles.linkTime}>{file?.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </React.Fragment>
            ))}
        </div>

        {/* Links */}
        <div className={styles.sectionsContainer}>
          <div
            className={`${styles.linksContainer} ${
              selected === 1 ? styles.selected : ""
            }`}
            onClick={() => handleLinkSelect()}
          >
            <img src={linkImg} alt="link" />
            <p>Links</p>
          </div>

          {selected === 1 && (
            <>
              {links?.links?.map((item, i) => (
                <div className={styles.links} key={item._id}>
                  <div className={styles.link}>
                    <div
                      className={styles.linkLeft}
                      onClick={() => window.open(item.link, "_blank")}
                    >
                      <img src={linkImg} alt="link" />
                      <p className={styles.linkText}>{item.link}</p>
                    </div>
                    <div className={styles.linkRight}>
                      <div className={styles.userImgContainer}>
                        <img src={user} alt="user" />
                      </div>
                      <div className={styles.linkDateTime}>
                        <div className={styles.linkDate}>{item.date}</div>
                        <div className={styles.linkTime}>{item.time}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className={styles.sectionsContainer}>
          {/* Images */}
          <div
            className={`${styles.imagesContainer} ${
              selected === 2 ? styles.selected : ""
            }`}
            onClick={() => handleImageSelect()}
          >
            <img src={image} alt="image" />
            <p>Images</p>
          </div>

          {selected === 2 && (
            <>
              {images?.images?.map((file, index) => (
                <div
                  className={styles.links}
                  key={index}
                  onClick={() => handleShowImage(file.fileName)}
                >
                  <div className={styles.link}>
                    <div className={styles.linkLeft}>
                      <img src={image} alt="file" />
                      <p className={styles.imgText}>
                        {file.fileOriginalName.length > 40
                          ? file.fileOriginalName.slice(0, 40) + "..."
                          : file.fileOriginalName}
                      </p>
                    </div>
                    <div className={styles.imgDateTime}>
                      <div className={styles.linkDate}>{file.date}</div>
                      <div className={styles.linkTime}>{file.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;
