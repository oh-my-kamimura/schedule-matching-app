import { useRecoilState } from "recoil";
import { userDataAtom } from "../Recoil/Atom/userDataAtom";

export const useHandleUserData = () => {
  const [userData, setUserData] = useRecoilState(userDataAtom);

  console.log("userData", userData);
  const handleUserData = (field: string, value: string) => {
    setUserData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return { userData, handleUserData };
};