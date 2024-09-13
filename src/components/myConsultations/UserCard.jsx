import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export const UserCard = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <>
    <section>
      <p>{}</p>
    </section>
    </>
  )
}
