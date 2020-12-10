import React from 'react'

import { Container, Header, ImgLogo } from './styles'
import Logo from '../../assets/logo.png'

function Maps({showSide, setShowSide}) {
    return (
        <Container>
            <Header>
                <ImgLogo src={Logo} />
                <i className="fas fa-plus" onClick={() => setShowSide(!showSide)}></i>
            </Header>
        </Container>
    )
}

export default Maps