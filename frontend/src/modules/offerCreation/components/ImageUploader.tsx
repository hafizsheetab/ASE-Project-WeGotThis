import { useRef, useState } from "react";
import ActiveFileUploadButton from "./ActiveFileUploadButton";
import styles from "./ImageUploader.module.css";
import trashBin from "./trashBin.png";

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const fileUploadRef = useRef<{ triggerUpload: () => void } | null>(null);
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

  return (
    <section className={styles.imageUploader}>
      <div className={styles.imageSettings}>
        <ActiveFileUploadButton ref={fileUploadRef} buttonTxt="Upload Image" onFileUpload={handleImageUpload} />
        {image && <img 
          className={styles.trashBinIcon} 
          src={trashBin} 
          alt="Trash Bin"
          onClick={() => setImage(null)} />}
      </div>

      <div
        className={styles.uploadArea}
        style={{ backgroundImage: image ? `url(${image})` : `url(${previewImg})` }}
        onClick={() => fileUploadRef.current?.triggerUpload()} 
      >
        {!image && <p className={styles.uploadText}>No picture existing, take a picture about the task and upload it</p>}
      </div>
    </section>
  );
};

export default ImageUploader;
