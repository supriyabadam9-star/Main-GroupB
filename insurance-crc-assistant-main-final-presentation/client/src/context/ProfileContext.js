// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";

// const ProfileContext = createContext();
// const BASE_URL = "http://127.0.0.1:8000"; // fixed to match FastAPI

// export const ProfileProvider = ({ children }) => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const loadProfile = async () => {
//     try {
//       const res = await axios.get(`${BASE_URL}/profile/1`); // matches backend
//       setProfile(res.data);
//     } catch (err) {
//       console.error("Profile load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//   }, []);

//   return (
//     <ProfileContext.Provider
//       value={{
//         profile,
//         loading,
//         setProfile,
//         reloadProfile: loadProfile,
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };

// export const useProfile = () => useContext(ProfileContext);


import { createContext, useContext, useEffect, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    // Backend profile API does not exist yet
    // So we safely skip the API call
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        loading,
        setProfile,
        reloadProfile: loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
