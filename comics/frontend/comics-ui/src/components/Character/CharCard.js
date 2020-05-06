import React from 'react';
import {Card} from 'primereact/card';

export default function CharCard(props) {

    const header = (
        <img alt="Card" src={`${props.character.images[0]}`}/>
    );
    const footer = (
        <span>
            <a className="detail" href={`/characters/${props.character.house}/${props.character._id}`}>Detalle</a>
        </span>
    );
    return (
        <Card 
            title={props.character.character_name} 
            subTitle={`${props.character.name} (${props.character.year_of_appearance})`} 
            className="ui-card-shadow m5" 
            footer={footer} 
            header={header}
            >
            <div>
                <p
                style={{
                    width: '75px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                >
                    {props.character.biography}
                </p>
            </div>
        </Card>
    )
}