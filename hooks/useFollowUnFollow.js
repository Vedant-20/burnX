import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { ToastMessage } from "../components/Toast";
import axiosInstance from "../axiosInstance/axiosInstance";
import Context from "../context/Context";

const useFollowUnFollow = (user) => {
  const currentUser = useSelector((state) => state.user.user);
  // const { GetFeedPosts } = useContext(Context);
  const [following, setFollowing] = useState(
    user?.followers?.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      ToastMessage.showErrorMessage("Please Login To Follow");
      return;
    }

    if (updating) return;

    setUpdating(true);

    try {
      const res = await axiosInstance.post(`/users/follow/${user?._id}`);

      //   console.log(res, "folow unfollow hook check");

      if (following) {
        ToastMessage.showSuccessMessage(`Unfollowed ${user?.name}`);
      } else {
        ToastMessage.showSuccessMessage(`Followed ${user?.name}`);
        user.followers.push(currentUser?._id);
      }
      setFollowing(!following);
      // GetFeedPosts();
    } catch (error) {
      console.log(error);
      ToastMessage.showErrorMessage(error.message);
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnFollow;
