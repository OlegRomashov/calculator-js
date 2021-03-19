import React from 'react'
import {NavLink} from 'react-router-dom'
import UnitOfMeasure from '../../components/UnitOfMeasure/UnitOfMeasure'
import './Converter.css'
import BackDrop from "../../components/BackDrop/BackDrop";

const Converter = props => {
    const units = [
        {id: 1, to: 'area', label: 'Площадь', icon: <i className="far fa-square"></i>},
        {id: 2, to: 'length', label: 'Длина', icon: <i className='fas fa-ruler'></i>},
        {id: 3,to: 'temperature', label: 'Температура', icon: <i className='fas fa-thermometer-three-quarters'></i>},
        {id: 4,to: 'volume', label: 'Объём', icon: <i className='fas fa-cube'></i>},
        {id: 5,to: 'weight', label: 'Масса', icon: <i className="fas fa-weight"></i>},
        {id: 6,to: 'data', label: 'Данные', icon: <i className='fas fa-database'></i>}
        ]

    return(
        <React.Fragment>
            <div className={'Converter'} >
                <h3>КОНВЕРТАЦИЯ ЕДИНИЦ</h3>
                <div className="grid">
                    {units.map((unit, index) => {
                        return (
                            <NavLink
                                style={{textDecoration: 'none'}}
                                to={'/converter/' + unit.to}
                                key={index}
                            >
                                <UnitOfMeasure
                                    unit={unit}
                                />
                            </NavLink>
                        )
                    })
                    }
                </div>
            </div>
            <NavLink to={'/'}>
                {/*todo: попробовать сделать ссылку-возврат через useHistory*/}
                <BackDrop
                    onCloseBackDrop={props.onCloseBackDrop}
                />
            </NavLink>
        </React.Fragment>
)}

export default Converter