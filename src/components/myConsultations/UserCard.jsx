import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export const UserCard = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <>
    <section className=" flex flex-col gap-3 items-center p-3 justify-between w-[50%] mx-auto mb-8">
      <img className="shadow-xl w-20 h-20 rounded-full border-lightBlue border-solid border-[0.1rem]" src={currentUser.decoded.avatar} alt="User Avatar" />
      <p className="[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] font-ubuntu font-bold text-lg">{currentUser.decoded.userName}</p>
    </section>
    </>
  )
}
