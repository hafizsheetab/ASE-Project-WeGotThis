import { useState } from "react";
import ActiveFileUploadButton from "../../shared/components/ActiveFileUploadButton";
import styles from "./OfferCreation.module.css";
import trashBin from "../../../../src/assets/trashBin.png";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [resetTrigger, setResetTrigger] = useState(0); // Add a reset trigger
  const previewImg = "https://cdn.builder.io/api/v1/image/assets/TEMP/b707cecb19022155ef85c595c58bf811f0e8827f21cea70f32d42de1d417c80d";

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
    setResetTrigger(Date.now()); // Force re-render of input
  };

  return (
    <section className={styles.imageUploader}>
      <div className={styles.imageSettings}>
        <ActiveFileUploadButton buttonTxt="Upload Image" onFileUpload={handleImageUpload} resetTrigger={resetTrigger} />
        {image && (
          <img className={styles.trashBinIcon} src={trashBin} alt="Trash Bin" onClick={handleDeleteImage} />
        )}
      </div>

      <div className={styles.uploadArea} style={{ backgroundImage: image ? `url(${image})` : `url(${previewImg})` }}>
        {!image && <p className={styles.uploadText}>No picture existing, take a picture about the task and upload it</p>}
      </div>
    </section>
  );
};

export default ImageUploader;
