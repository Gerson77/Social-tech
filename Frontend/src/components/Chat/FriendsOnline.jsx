import { Box, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import WidgetWrapper from "../WidgetWrapper";
import FlexBetween from "../FlexBetween";
import { useSelector } from "react-redux";
import UserImage from "../UserImage";

const FriendsOnline = ({ id, picturePath, firstName, occupation }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Box
    >
      <WidgetWrapper sx={{
      "&:hover": {
        backgroundColor: palette.primary.light,
        color: palette.primary.light,
        cursor: "pointer",
        borderRadius: '0rem',
        transition: '0.5s'
      },
    }}>
        <FlexBetween>
          <FlexBetween gap="1rem">
            <UserImage image={picturePath} size="55px" />
            <Box>
              <Typography
                color={main}
                variant="h5"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {firstName}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {occupation}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </WidgetWrapper>
      <Divider />
    </Box>
  );
};

export default FriendsOnline;
