import React from 'react'
import { Link } from 'react-router-dom'
import Back from '../back'

export default function Head({t,title , children}) {
    return (
        <div className="d-flex align-items-center justify-content-between mr-1">
            <div className="d-flex align-items-baseline flex-wrap mr-5 ml-5">
                <div>
                    <h2 className="card-label font-weight-bold mr-3 ml-3">{title}</h2>
                </div>
                <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                    <li className="breadcrumb-item text-muted flex-center">
                        <div className={"dot"} />
                        {children}
                        <Link to="/" className="text-hover-primary text-muted">
                            {t('Home')}
                        </Link>
                    </li>
                </ul>
            </div>
            <Back />
        </div>
    )
}
