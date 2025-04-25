import './CardItem.scss'
function CartItem(props){
    const {title, height} = props;
    return (
        <>
            <div className="Card-item " style={{ height: height }}>
                <div className="Card-item__title">
                    {title && <h4>{title}</h4>}
                </div>
            </div>

        </>
    )
}
export default CartItem