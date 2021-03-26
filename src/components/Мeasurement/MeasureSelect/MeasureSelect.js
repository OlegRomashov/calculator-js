import React from 'react'
import './MeasureSelect.css'

const MeasureSelect = () => {
    const sections = {
        'Acre': 'section2',
        'Ar': 'section3',
        'Hectare': 'section4',
        'SquareCentimeter': 'section5',
        'SquareFoot': 'section6',
        'SquareInch': 'section7',
        'SquareMeter': 'section8'
    }

    const selection = function (select) {
        for (let i in sections)
            document.getElementById(sections[i]).style.display = "none";
            document.getElementById(sections[select.target.value]).style.display = "block";
    }

    return (
        <div className="MeasureSelect">
            <form>
                <div id="section1">
                    <select onChange={selection}>
                        <option value="Acre">Акры</option>
                        <option value="Ar">Ар</option>
                        <option value="Hectare">Гектар</option>
                        <option value="SquareCentimeter">Квадратный сантиметр</option>
                        <option value="SquareFoot">Квадратный фут</option>
                        <option value="SquareInch">Квадратный дюйм</option>
                        <option value="SquareMeter">Квадратный метр</option>
                    </select>
                </div>
            </form>
        </div>
    )
}

export default MeasureSelect