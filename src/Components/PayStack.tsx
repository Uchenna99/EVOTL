import { PaystackButton } from "react-paystack"

interface Props {
    email: string;
    amount: number;
    reference: string;
    onSuccess: (response: any)=>void;
    onClose: ()=>void;
}

const PayStack = ({email, amount, reference, onSuccess, onClose}:Props) => {
    const publicKey = "pk_test_a3a8479f12d26ec9c6655383e70ce87e4635cbc9"
    const paystackProps = {
        email,
        amount: amount * 100,
        reference,
        publicKey,
        onSuccess,
        onClose
    }
  return (
    <PaystackButton {...paystackProps} />
  )
}

export default PayStack;