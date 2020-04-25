import React from 'react';
import {Card} from 'primereact/card';
import './css/style.css'

export default function CharCard(props) {

    const header = (
        <img alt="Card" src={require(`../../utils/images/${props.character.house}/${props.character.character_name}/1.jpg`)}/>
    );
    const footer = (
        <span>
            <a className="btn btn-primary" href={`/${props.character.house}/characters/${props.character.id_character}`}>Detalle</a>
        </span>
    );
    return (
        <Card 
            title={props.character.character_name} 
            subTitle={props.character.name} 
            style={{maxWidth: '280px', minWidth: '250px'}} 
            className="ui-card-shadow m5" 
            footer={footer} 
            header={header}
            >
            <div>
                <p>{props.character.biography}</p>
            </div>
        </Card>
    )
}