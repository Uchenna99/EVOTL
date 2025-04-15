import photo from "../assets/Images/drone_logo.png"


const ProfilePage = () => {
  return (
    <>
        <div className="profile-info-div">
          <div className="profile-img-section">
            <div className="profile-img-div" style={{backgroundImage:`url(${photo})`}}></div>
          </div>
          <div className="profile-info-section">
            <p>Name: </p>
            <input type="text" value={"Uchenna"} />
          </div>
          <div className="profile-info-section">
            <p>Surname: </p>
            <input type="text" value={"Agbu"} />
          </div>
          <div className="profile-info-section">
            <p>Email: </p>
            <input type="text" value={"ucheagbu@yahoo.com"} />
          </div>
          <div className="profile-info-section">
            <p>Phone number: </p>
            <input type="text" value={"07035229994"} />
          </div>
          <div className="profile-info-section">
            <p>Region: </p>
            <input type="text" value={"Rumuigo"} />
          </div>
        </div>
    </>
  )
}

export default ProfilePage;