import {useState, useEffect} from "react";
import {Box, Typography, Stack, IconButton} from "@mui/material";
import ActiveFileUploadButton from "../../shared/components/ActiveFileUploadButton";
import DeleteIcon from "@mui/icons-material/Delete";

type ImageUploaderProps = { initialImage?: string; setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>};

const previewImg = "https://cdn.builder.io/api/v1/image/assets/TEMP/b707cecb19022155ef85c595c58bf811f0e8827f21cea70f32d42de1d417c80d";

const ImageUploader: React.FC<ImageUploaderProps> = ({initialImage, setFile}) => {
    const [image, setImage] = useState<string | null>(initialImage || null);
    const [resetTrigger, setResetTrigger] = useState(0);

    useEffect(() => {
        setImage(initialImage || null);
    }, [initialImage]);

    const handleImageUpload = (file: File | null) => {
        if (file) {
            setFile(file)
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImage(null);
        setResetTrigger(Date.now());
    };

    return (
        <Stack spacing={2}>
            <Box
                sx={{
                    height: 240,
                    width: "100%",
                    backgroundImage: `url(${image || previewImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: 2,
                    border: "1px solid #e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                }}
            >
                {!image && (
                    <Typography variant="body2" sx={{color: "#6b7280", textAlign: "center"}}>
                        No picture existing, take a picture about the task and upload it
                    </Typography>
                )}
            </Box>

            <Stack direction="row" spacing={2} alignItems="center">
                <ActiveFileUploadButton
                    buttonTxt="Upload Image"
                    onFileUpload={handleImageUpload}
                    resetTrigger={resetTrigger}
                />
                {image && (
                    <IconButton onClick={handleDeleteImage} color="error" aria-label="delete image">
                        <DeleteIcon/>
                    </IconButton>
                )}
            </Stack>
        </Stack>
    );
};

export default ImageUploader;