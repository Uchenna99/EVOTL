
const ListOfMedications = () => {
  return (
    <>
        <div className="meds-display">
            <p>Select Medications</p>

            <div className="med-list-card">
                <div className="med-list-image"></div>

                <div className="med-list-info">
                    <p>name</p>
                    <p>price</p>
                    <div className="quantity">
                        <label htmlFor="qty">Quantity</label>
                        <input id="qty" type="number" />
                    </div>
                </div>

                <div className="med-list-btn">
                    <button id="add-to-cart">Add to checkout</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default ListOfMedications;