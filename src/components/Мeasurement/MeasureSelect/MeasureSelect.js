import React from 'react'
import './MeasureSelect.css'

const MeasureSelect = props => {

    return (
        <div className="MeasureSelect">
            <form>
                <div id="section1">
                    <select onChange={props.onChangeSelect.bind(null, props.index)}>
                        <option value="ac">Акры</option>
                        <option value="a">Ар</option>
                        <option value="ha">Гектар</option>
                        <option value="cm2">Квадратный сантиметр</option>
                        <option value="ft2">Квадратный фут</option>
                        <option value="in2">Квадратный дюйм</option>
                        <option value="m2">Квадратный метр</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default MeasureSelect