import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import {Grid, Rating} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";
import {useAppSelector} from "../../hooks/redux";
import {APP_ENV} from "../../env";

import {useEffect, useState} from "react";

// STYLES
const styles = {
    details: {
        padding: "1rem",
        borderTop: "1px solid #e1e1e1"
    },
    value: {
        padding: "1rem 2rem",
        borderTop: "1px solid #e1e1e1",
        color: "#899499"
    }
};

//APP
export default function RealtorProfilePage() {
    const {user} = useAppSelector(state => state.account);
    const [avatarUrl, setAvatarUrl] = useState<string>();

    useEffect(() => {
        if(user?.avatar)
        {
            setAvatarUrl( APP_ENV.BASE_URL + user?.avatar);
        }

    }, [user]);

    return (
        <Card variant="outlined">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* CARD HEADER START */}
                <Grid item sx={{ p: "1.5rem 0rem", textAlign: "center" }}>
                    {/* PROFILE PHOTO */}
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        badgeContent={
                            <PhotoCameraIcon
                                sx={{
                                    border: "5px solid white",
                                    backgroundColor: "#55af93",
                                    borderRadius: "50%",
                                    padding: ".2rem",
                                    width: 35,
                                    height: 35
                                }}
                            ></PhotoCameraIcon>
                        }
                    >
                        <Avatar
                            sx={{ width: 200, height: 200, mb: 1.5 }}
                             src={ avatarUrl}
                        ></Avatar>
                    </Badge>

                    {/* DESCRIPTION */}
                    <Typography variant="h6">{user?.lastName}</Typography>
                    <Typography color="text.secondary">{user?.firstName}</Typography>
                    <Typography component="legend">Rating</Typography>
                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                </Grid>
                {/* CARD HEADER END */}

                {/* DETAILS */}
                <Grid container>
                    <Grid item xs={6}>
                        <Typography style={styles.details}>Email:</Typography>
                        <Typography style={styles.details}>Phone number:</Typography>

                    </Grid>

                    {/* VALUES */}
                    <Grid item xs={6} sx={{ textAlign: "end" }}>
                        <Typography style={styles.value}>{user?.email}</Typography>
                        <Typography style={styles.value}>{user?.phoneNumber}</Typography>
                    </Grid>

                </Grid>

                {/* BUTTON */}
                <Grid item style={styles.details} sx={{ width: "100%" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ width: "99%", p: 1, my: 2 }}
                    >
                        Edit profile
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}
