import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import UserWidget from "../../scenes/widgets/UserWidget";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";
import AdvertWidget from "../../scenes/widgets/AdvertWidget";
import FriendListWidget from "../../scenes/widgets/FriendListWidget";
import { useParams } from "react-router-dom";
import PostSingle from "../../components/PostSingle";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector((state) => state.user);
  const { postId } = useParams();

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {!postId ? (
            <>
              <MyPostWidget picturePath={picturePath} />
              <PostsWidget userId={id} />
            </>
          ) : (
            <PostSingle />
          )}
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
