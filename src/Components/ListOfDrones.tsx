

interface Props{
  next: ()=>void;
}

const ListOfDrones = ({next}: Props) => {
  return (
    <>
        <div className="drone-list-wrap">
          <div className="drone-list-card"></div>
        </div>
    </>
  )
}

export default ListOfDrones;