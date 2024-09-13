import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export const UserCard = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <>
    <section className=" flex items-center border-lightBlue border-solid border-[0.1rem] p-3  justify-between w-[50%] mx-auto mb-8 rounded-xl bg-smokeWhite">
      <img className="w-20 h-20 rounded-lg border-lightBlue border-solid border-[0.1rem]" src={currentUser.decoded.avatar} alt="User Avatar" />
      <p className="font-ubuntu font-bold text-lg">{currentUser.decoded.userName}</p>
    </section>
    </>
  )
}
