import { Grid } from "@mui/material";
import Header from "../../../components/authentification/Header";
import FileUploader from "../../../components/common/FileUploader";
import { AvatarValidator } from "../../../validations/account";
import { useState } from "react";
import IMG from "../../../assets/avatar-profile-icon-vector-illustration_276184-165.jpg";

export default function RealtorRegisterAvatarPage() {
    const [images, setImages] = useState<File[]>([]);
    return (
        <div className="content">
            <Header />

            <Grid item xs={12}>
                <FileUploader
                    images={images}
                    setImages={setImages}
                    maxImagesUpload={1}
                    validator={AvatarValidator}
                    // onChange={(isValid) => (formValid.current.avatar = isValid)}
                    // onDelete={handleChange}
                    defaultImage={IMG}
                ></FileUploader>
            </Grid>
        </div>
    );
}
