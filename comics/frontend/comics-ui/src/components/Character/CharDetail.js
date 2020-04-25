import React from 'react';

export default function CharDetail(props) {
    
    return (
        <div className="p-grid">
            <div className="p-col">
              
                <div className="box">1</div>
            </div>
            <div className="p-col">
                <div className="col-md-8 mx-auto ">
                    <div className="p-col">
                        <h2 className="charName" style={{textAlign: 'center'}}>Nombre superheroe</h2>
                        <hr class="style-three"/>
                        <h4 className="charName">Nombre personal</h4>
                        <hr class="style-two"/>
                        <h4 className="charName">Marvel</h4>
                        <p>Biografia</p>
                    </div>
                    
                </div>
            </div>
        </div>

    )
}