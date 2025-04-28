import './BoxCoin.scss';
import { Button, Tag  } from 'antd';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import usePriceCoin from '../../../services/websocket/getPriceCoin'; 

function BoxCoin({ title, icon, bgColor}) {
    const priceData = usePriceCoin(title.toLowerCase() + 'usdt'); 
    const [previousPrice, setPreviousPrice] = useState(null);
    const [priceChange, setPriceChange] = useState(0);
    
    useEffect(() => {
        if (priceData && previousPrice !== null) {
            setPriceChange(priceData.P);
            setPreviousPrice(priceData.c); 
            
        } else if (priceData) {
            setPreviousPrice(priceData.c); 
        }
    }, [priceData, previousPrice]);
    return (
        <div className="BoxCoin-item" style={{backgroundColor: bgColor}}>
            <div className='BoxCoin-item__header'>
                <div className="BoxCoin-item__header__icon">
                    <img src={icon} alt="" />
                </div>
                <div className="BoxCoin-item__header__title">
                    <h4> {title}</h4>
                </div>
                
            </div>
            <div className='BoxCoin-item__body'>
                <div className='BoxCoin-item__body__top'>
                    <div className='BoxCoin-item__body__top__price'>
                        <p>{priceData ? parseFloat(priceData.c).toFixed(2) : 'Loading...'}</p> 
                    </div>
                    <div className={'BoxCoin-item__body__top__change' + (priceChange > 0 ? "--up" : "--down")}>
                        <p>{priceChange > 0 ? 
                            <>
                                <CaretUpOutlined />  <Tag color="green">{priceChange}%</Tag> 
                            </>:
                            <>
                                <CaretDownOutlined /> <Tag color="red">{priceChange}%</Tag>
                            </>
                            }</p>
                    </div>
                </div>
                <div className='BoxCoin-item__body__bottom'>
                    <div className='BoxCoin-item__body__bottom__buy'>
                        <Button type="primary" className='button'>
                            Buy Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BoxCoin;