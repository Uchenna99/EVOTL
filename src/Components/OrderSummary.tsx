


const OrderSummary = () => {
  return (
    <>
        <div className="summary-wrap">
            <h4 id="h4-header">Your order summary</h4>

            <div className="med-list-card" >
                <div className="med-list-image"
                    style={{backgroundImage:`url()`}}
                ></div>

                <div className="med-list-info">
                    <p>{}</p>
                    <p>₦ {}</p>
                    
                </div>

            </div>

            <button id="add-to-cart">
                Confirm order
            </button>
        </div>
    </>
  )
}

export default OrderSummary;