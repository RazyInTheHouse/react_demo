import React from 'react';
import { ReactComponent as SliderIcon } from '../svg/slider.svg';

const QueryPanel = ({ children, onQuery, hideQueryButton }) => {
    return(
        <div className="query-panel">
            <div className="setting">
                <span className="icon">
                    <SliderIcon />
                </span>
            </div>
            <div className="wrap">
                <div className="content row">
                    <span className="item-default mobile-hide">
                        <SliderIcon />
                    </span>
                    {children}
                    {
                        hideQueryButton ? null :
                        <button className="btn btn-important item-default query-button" onClick={onQuery}>查詢</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default QueryPanel