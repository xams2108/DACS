import './CardItem.scss'
function CartItem(props){
    const {height, children} = props;
    return (
        <>
            <div className="Card-item " style={{ height: height }}>
                
                    {children}
            </div>

        </>
    )
}
export default CartItem