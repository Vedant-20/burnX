import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/axiosInstance";

const useGetUserProfile = (username) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/users/profile/${username}`);

        if (response?.data.isFrozen) {
          setUser(null);
          return;
        }

        setUser(response?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username]);

  return { loading, user };
};

export default useGetUserProfile;
